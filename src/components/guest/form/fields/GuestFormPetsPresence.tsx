import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/GuestFormFiel... Remove this comment to see the full error message
import { GuestFormFields } from "components/guest/GuestFormFields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormChec... Remove this comment to see the full error message
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

GuestFormPetsPresence.propTypes = {};

export default GuestFormPetsPresence;
