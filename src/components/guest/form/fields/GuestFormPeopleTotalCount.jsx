import React, { useEffect } from "react";
import { FormGroup, Label } from "reactstrap";
import { Field, useField, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";

import { GuestFormFields } from "components/guest/GuestFormFields";
import FormInput from "components/atoms/form/FormInput";

const GuestFormPeopleTotalCount = (props) => {
    const {
        values: { peopleFemaleCount, peopleMaleCount, children },
        touched,
        setFieldValue,
    } = useFormikContext();
    const [field] = useField({
        ...props,
        name: GuestFormFields.PEOPLE_TOTAL_COUNT,
    });
    const fieldId = field.name;

    useEffect(() => {
        setFieldValue(
            field.name,
            (peopleFemaleCount || 0) +
                (peopleMaleCount || 0) +
                (children.length || 0)
        );
    }, [
        peopleFemaleCount,
        peopleMaleCount,
        children,
        setFieldValue,
        field.name,
    ]);

    const { t } = useTranslation(["guest"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("guest:form.label.peopleTotalCount")}
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder={0}
                type="number"
                disabled
            />
        </FormGroup>
    );
};

GuestFormPeopleTotalCount.propTypes = {};

export default GuestFormPeopleTotalCount;
