import { ApplicationSettings } from "components/settings/constants";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import React from "react";
import FormLabel from "components/atoms/form/FormLabel";
import FormInput from "components/atoms/form/FormInput";

const SettingsFieldMockedResponses = () => {
    const name = ApplicationSettings.NETWORK_TIMEOUT;

    return (
        <FormGroup>
            <FormLabel required={true}>API network timeout</FormLabel>
            <Field id={name} key={name} name={name} type="number" component={FormInput} />
        </FormGroup>
    );
};

export default SettingsFieldMockedResponses;
