import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import { GuestFormFields } from "components/guest/GuestFormFields";

import FormCheckbox from "components/atoms/form/FormCheckbox";

const miscCheckbox = ({ name, label }: any) => {
    return <Field id={name} key={name} name={name} type="checkbox" label={label} component={FormCheckbox} inline />;
};

const GuestFormIsAgent = () => {
    const { t } = useTranslation(["guest"]);

    const miscCheckboxes = [
        {
            name: GuestFormFields.IS_AGENT,
            label: t("guest:form.label.isAgent"),
        },
    ];

    return (
        <FormGroup tag="fieldset" className="mb-0">
            <legend className="form-label">
                {t("guest:form.label.miscInformation")}
                {":"}
            </legend>
            {miscCheckboxes.map(miscCheckbox)}
        </FormGroup>
    );
};

export default GuestFormIsAgent;
