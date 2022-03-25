import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/Accom... Remove this comment to see the full error message
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormChec... Remove this comment to see the full error message
import FormCheckbox from "components/atoms/form/FormCheckbox";

const petCheckbox = ({ name, label }: any) => {
    return <Field id={name} key={name} name={name} type="checkbox" label={label} component={FormCheckbox} inline />;
};

const AccommodationFormPets = () => {
    const { t } = useTranslation(["accommodation"]);

    const petsCheckboxes = [
        {
            name: AccommodationFormFields.PETS_PRESENT,
            label: t("accommodation:form.label.petsPresent"),
            value: true,
        },
        {
            name: AccommodationFormFields.PETS_ALLOWED,
            label: t("accommodation:form.label.petsAllowed"),
        },
    ];

    return (
        <FormGroup tag="fieldset">
            <legend className="form-label">
                {t("accommodation:form.label.pets")}
                {":"}
            </legend>
            {petsCheckboxes.map(petCheckbox)}
        </FormGroup>
    );
};

AccommodationFormPets.propTypes = {};

export default AccommodationFormPets;
