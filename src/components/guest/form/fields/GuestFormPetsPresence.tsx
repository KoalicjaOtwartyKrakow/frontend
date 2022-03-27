import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import { GuestFormFields } from "components/guest/GuestFormFields";

import FormCheckbox from "components/atoms/form/FormCheckbox";

const petCheckbox = ({ name, label }: any) => {
    return <Field id={name} key={name} name={name} type="checkbox" label={label} component={FormCheckbox} inline />;
};

const GuestFormPetsPresence = () => {
    const { t } = useTranslation(["guest"]);

    const petsCheckboxes = [
        {
            name: GuestFormFields.PETS_PRESENT,
            label: t("guest:form.label.petsPresent"),
        },
    ];

    return (
        <FormGroup tag="fieldset">
            <legend className="form-label">
                {t("guest:form.label.pets")}
                {":"}
            </legend>
            {petsCheckboxes.map(petCheckbox)}
        </FormGroup>
    );
};

export default GuestFormPetsPresence;
