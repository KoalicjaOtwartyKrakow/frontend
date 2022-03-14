// import Effect from 'components/atoms/form/Effect';
import { hostFormFields as formFields } from "components/host/HostFormFields";
import React from "react";
import { Form, Formik } from "formik";
import { formikFormApplyYupTransforms as yupTransform } from "formik-yup";
import { useTranslation } from "react-i18next";

import { hostFormPropTypes } from "proptypes/HostFormPropTypes";
import {
    hostFormCreateSchema,
    hostFormUpdateSchema,
} from "components/host/HostFormSchemas";
import HostFormButtons from "components/host/form/sections/HostFormButtons";
import { Col, Row } from "reactstrap";
import HostFormContact from "components/host/form/sections/HostFormContact";
import HostFormAdditionalInformation from "components/host/form/sections/HostFormAdditionalInformation";

const HostForm = (props) => {
    const { initialValues, onRemove, hostInProgress } = props;

    const initialStatus = formFields.getInitialStatus();

    const key = initialValues.uuid;

    const isCreateMode = !initialValues.id;
    const isUpdateMode = !!initialValues.id;

    const validateOnMount = isCreateMode;

    const validationSchema = isUpdateMode
        ? hostFormUpdateSchema
        : hostFormCreateSchema;

    // const onChange = (currentState) => {
    //   const { name } = currentState.values;
    //   props.onHostNameChange(name);
    // };

    const onSubmitError = (response, values, resetForm) => {
        const status = formFields.getStatusFromApi(response);
        resetForm({ values, status });
    };

    /**
     *
     * @param values
     * @param formikBag
     * @returns {Promise<*>}
     */
    const onSubmit = async (values, formikBag) => {
        console.log("[Host] HostForm onSubmit()");

        const [formattedValues, hasErrors] = await yupTransform(
            values,
            formikBag,
            validationSchema
        );

        if (hasErrors) {
            return;
        }
        const { resetForm } = formikBag;

        const onSubmitApiErrors = (response) =>
            onSubmitError(response, values, resetForm);

        return props.onSubmit(formattedValues, onSubmitApiErrors);
    };

    const formikProps = {
        key,
        initialValues,
        initialStatus,
        validateOnMount,
        onSubmit,
        validationSchema,
    };

    const submitDisabled = (isValid, isSubmitting) => !isValid || isSubmitting;

    const { t } = useTranslation(["host"]);

    const submitLabel = isCreateMode
        ? t("host:form.button.create")
        : t("host:form.button.update");

    console.warn({ hostInProgress });

    return (
        <Formik {...formikProps}>
            {({ isSubmitting, isValid }) => (
                <Form noValidate>
                    <Row>
                        <Col xs={12} lg={6}>
                            <HostFormContact />
                        </Col>
                        <Col xs={12} lg={6}>
                            <HostFormAdditionalInformation />
                        </Col>
                    </Row>
                    <HostFormButtons
                        isSubmitting={isSubmitting}
                        submitDisabled={submitDisabled(isValid, isSubmitting)}
                        submitLabel={submitLabel}
                        onRemove={onRemove}
                        inProgress={hostInProgress}
                    />
                </Form>
            )}
        </Formik>
    );
};

HostForm.propTypes = hostFormPropTypes;

export default HostForm;
