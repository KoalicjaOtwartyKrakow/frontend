import React from "react";
import { Field, Form, Formik } from "formik";
import { Button, FormGroup } from "reactstrap";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormChec... Remove this comment to see the full error message
import FormCheckbox from "components/atoms/form/FormCheckbox";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/AppConfig' or its co... Remove this comment to see the full error message
import { appConfig } from "constants/AppConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/settings/constants'... Remove this comment to see the full error message
import { ApplicationSettings } from "components/settings/constants";

const SettingsForm = ({ initialValues, onCancel, onSubmit }: any) => {
    const checkboxLabel = "Enable mocked API responses";

    const formikProps = {
        onSubmit,
        initialValues,
    };

    const SettingsMockedResponses = () => {
        const name = ApplicationSettings.IS_ENABLE_MOCKS;
        return (
            <FormGroup tag="fieldset">
                <legend className="form-label fw-semibold">Development settings:</legend>
                <Field
                    id={name}
                    key={name}
                    name={name}
                    type="checkbox"
                    label={checkboxLabel}
                    component={FormCheckbox}
                />
            </FormGroup>
        );
    };

    return (
        <Formik {...formikProps}>
            {({ isSubmitting, isValid, resetForm }) => {
                const handleCancel = () => {
                    resetForm();
                    onCancel();
                };
                return (
                    <Form className="d-flex flex-column align-items-start">
                        {appConfig.useMocks && <SettingsMockedResponses />}

                        <div className="d-flex justify-content-end align-self-stretch">
                            <Button type="button" color="secondary" outline onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button className="ms-1" type="submit" color="primary" disabled={isSubmitting || !isValid}>
                                Apply modified settings
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default SettingsForm;
