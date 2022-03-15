import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import { GuestFormFields } from "components/guest/GuestFormFields";
import FormInput from "components/atoms/form/FormInput";

const GuestFormPeopleTotalCount = (props) => {
    const fieldId = GuestFormFields.PEOPLE_TOTAL_COUNT;

    // **********************************************
    // Code for handling automatic total people count
    // **********************************************
    // const {
    //     values: { peopleFemaleCount, peopleMaleCount, children },
    //     touched,
    //     setFieldValue,
    // } = useFormikContext();
    // const [field] = useField({
    //     ...props,
    //     name: GuestFormFields.PEOPLE_TOTAL_COUNT,
    // });
    // useEffect(() => {
    //     setFieldValue(
    //         field.name,
    //         (peopleFemaleCount || 0) +
    //             (peopleMaleCount || 0) +
    //             (children.length || 0)
    //     );
    // }, [
    //     peopleFemaleCount,
    //     peopleMaleCount,
    //     children,
    //     setFieldValue,
    //     field.name,
    // ]);

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
            />
        </FormGroup>
    );
};

GuestFormPeopleTotalCount.propTypes = {};

export default GuestFormPeopleTotalCount;
