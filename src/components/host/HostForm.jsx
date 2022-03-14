// import Effect from 'components/atoms/form/Effect';
import { hostFormFields as formFields } from "components/host/HostFormFields";
import React from "react";
import { Form, Formik } from "formik";
import { formikFormApplyYupTransforms as yupTransform } from "formik-yup";
import { useTranslation } from "react-i18next";
import {
    hostFormCreateSchema,
    hostFormUpdateSchema,
} from "components/host/HostFormSchemas";
import HostFormButtons from "components/host/form/sections/HostFormButtons";
import { hostFormHostPropTypes } from "proptypes/HostFormPropTypes";
import HostFormContact from "./form/sections/HostFormContact";
import { Col, Row } from "reactstrap";
import HostFormAdditionalInformation from "./form/sections/HostFormAdditionalInformation";
import HostFormDetailedInformation from "./form/sections/HostFormDetailedInformation";
import HostFormHostInformation from "./form/sections/HostFormHostInformation";

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

    /**
     *
     * @param {ApiErrors} apiErrors
     * @param {ApiErrorStatus} httpStatusCode
     * @param {FormikValues} values
     * @param {function} resetForm
     */
    const onSubmitError = (apiErrors, httpStatusCode, values, resetForm) => {
        const status = formFields.getStatusFromApi(apiErrors, httpStatusCode);
        resetForm({ values, status });
    };

    const onSubmit = async (values, formikBag) => {
        const transformPromise = yupTransform(
            values,
            formikBag,
            validationSchema
        );
        const [formattedValues, hasErrors] = await transformPromise;
        if (hasErrors) {
            return;
        }
        const host = formFields.toModel(formattedValues);
        const { resetForm } = formikBag;
        const onSubmitApiErrors = (apiErrors, httpStatusCode) =>
            onSubmitError(apiErrors, httpStatusCode, values, resetForm);
        return props.onSubmit(host, onSubmitApiErrors);
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

    return (
        <Formik {...formikProps}>
            {({ isValid, isSubmitting }) => (
                <Form noValidate>
                    {/*<Effect onChange={ onChange } />*/}
                    <Row>
                        <Col xs={12} lg={6}>
                            <HostFormHostInformation />
                            <HostFormContact />
                            <HostFormDetailedInformation />
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

HostForm.propTypes = hostFormHostPropTypes;

export default HostForm;
