import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { GuestFormFields } from "components/guest/GuestFormFields";
import FormTextArea from "components/atoms/form/FormTextArea";
import FormLabel from "components/atoms/form/FormLabel";

const GuestFormFoodAllergies = (props) => {
    const fieldId = GuestFormFields.FOOD_ALLERGIES;

    const { t } = useTranslation(["guest"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId}>
                {t("guest:form.label.foodAllergies")}
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

GuestFormFoodAllergies.propTypes = {};

export default GuestFormFoodAllergies;
