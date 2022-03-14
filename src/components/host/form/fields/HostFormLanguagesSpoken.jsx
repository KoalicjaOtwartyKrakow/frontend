import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import FormCheckbox from "components/atoms/form/FormCheckbox";
import { languages } from "models/constants/Languages";
import { HostFormFields } from "components/host/HostFormFields";

const languagesSpokenCheckbox = ({ name, label }) => {
    return (
        <Field
            id={name}
            key={name}
            name={HostFormFields.LANGUAGES_SPOKEN}
            value={name}
            type="checkbox"
            label={label}
            component={FormCheckbox}
            inline
        />
    );
};

const HostFormLanguagesSpoken = () => {
    const { t } = useTranslation(["host"]);

    const languagesSpokenCheckboxes = languages.map((language) => ({
        name: language,
        label: language,
    }));

    return (
        <FormGroup tag="fieldset">
            <legend className="form-label">
                {t("host:form.label.languagesSpoken")}
            </legend>
            {languagesSpokenCheckboxes.map(languagesSpokenCheckbox)}
        </FormGroup>
    );
};

HostFormLanguagesSpoken.propTypes = {};

export default HostFormLanguagesSpoken;