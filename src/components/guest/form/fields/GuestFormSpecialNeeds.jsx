import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { GuestFormFields } from "components/guest/GuestFormFields";
import FormTextArea from "components/atoms/form/FormTextArea";
import FormLabel from "components/atoms/form/FormLabel";

const GuestFormSpecialNeeds = (props) => {
    const fieldId = GuestFormFields.SPECIAL_NEEDS;

    const { t } = useTranslation(["guest"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId}>
                {t("guest:form.label.specialNeeds")}
            </FormLabel>
            <Field
                component={FormTextArea}
                id={fieldId}
                name={fieldId}
                type="textarea"
                rows={1}
            />
        </FormGroup>
    );
};

GuestFormSpecialNeeds.propTypes = {};

export default GuestFormSpecialNeeds;
