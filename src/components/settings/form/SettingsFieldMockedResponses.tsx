import { ApplicationSettings } from "components/settings/constants";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import FormCheckbox from "components/atoms/form/FormCheckbox";
import React from "react";

const SettingsFieldMockedResponses = () => {
    const name = ApplicationSettings.IS_ENABLE_MOCKS;
    const checkboxLabel = "Enable mocked API responses";

    return (
        <FormGroup tag="fieldset">
            <legend className="form-label fw-semibold">Development settings:</legend>
            <Field id={name} key={name} name={name} type="checkbox" label={checkboxLabel} component={FormCheckbox} />
        </FormGroup>
    );
};

export default SettingsFieldMockedResponses;
