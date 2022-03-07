import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import FormCheckbox from "components/atoms/form/FormCheckbox";

const petCheckbox = ({ name, label }) => {
    return (
        <Field
            id={name}
            key={name}
            name={name}
            type="checkbox"
            label={label}
            component={FormCheckbox}
            inline
        />
    );
};

const AccommodationFormPets = () => {
    const { t } = useTranslation();

    const petsCheckboxes = [
        {
            name: AccommodationFormFields.PETS_PRESENT,
            label: t("accommodation.pets.present"),
            value: true,
        },
        {
            name: AccommodationFormFields.PETS_ALLOWED,
            label: t("accommodation.pets.allowed"),
        },
    ];

    return (
        <FormGroup tag="fieldset">
            <legend className="form-label">
                {t("accommodation.pets.label")}
            </legend>
            {petsCheckboxes.map(petCheckbox)}
        </FormGroup>
    );
};

AccommodationFormPets.propTypes = {};

export default AccommodationFormPets;
