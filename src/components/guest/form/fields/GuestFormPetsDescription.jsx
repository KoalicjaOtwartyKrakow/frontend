import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { GuestFormFields } from "components/guest/GuestFormFields";
import FormTextArea from "components/atoms/form/FormTextArea";

const GuestFormPetsDescription = (props) => {
    const fieldId = GuestFormFields.PETS_DESCRIPTION;

    const { t } = useTranslation(["guest"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("guest:form.label.petsDescription")}
            </Label>
            <Field
                component={FormTextArea}
                id={fieldId}
                name={fieldId}
                type="textarea"
                rows={2}
            />
        </FormGroup>
    );
};

GuestFormPetsDescription.propTypes = {};

export default GuestFormPetsDescription;
