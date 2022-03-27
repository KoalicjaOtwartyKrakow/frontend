import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import { GuestFormFields } from "components/guest/GuestFormFields";

import FormCheckbox from "components/atoms/form/FormCheckbox";

const dietCheckbox = ({ name, label }: any) => {
    return <Field id={name} key={name} name={name} type="checkbox" label={label} component={FormCheckbox} inline />;
};

const GuestFormDietaryRequirements = () => {
    const { t } = useTranslation(["guest"]);

    const dietsCheckboxes = [
        {
            name: GuestFormFields.MEAT_FREE_DIET,
            label: t("guest:form.label.meatFreeDiet"),
        },
        {
            name: GuestFormFields.GLUTEN_FREE_DIET,
            label: t("guest:form.label.glutenFreeDiet"),
        },
        {
            name: GuestFormFields.LACTOSE_FREE_DIET,
            label: t("guest:form.label.lactoseFreeDiet"),
        },
    ];

    return (
        <FormGroup tag="fieldset">
            <legend className="form-label">{t("guest:form.label.dietaryRequirements")}</legend>
            {dietsCheckboxes.map(dietCheckbox)}
        </FormGroup>
    );
};

export default GuestFormDietaryRequirements;
