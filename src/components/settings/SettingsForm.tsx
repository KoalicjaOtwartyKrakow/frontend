import React from "react";
import { Form, Formik } from "formik";
import { Button } from "reactstrap";
import { appConfig } from "constants/AppConfig";
import SettingsFieldMockedResponses from "components/settings/form/SettingsFieldMockedResponses";
import SettingsFieldTimeout from "components/settings/form/SettingsFieldTimeout";

const SettingsForm = ({ initialValues, onCancel, onSubmit }: any) => {
    const formikProps = {
        onSubmit,
        initialValues,
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
                        {appConfig.useMocks && <SettingsFieldMockedResponses />}
                        <SettingsFieldTimeout />
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
