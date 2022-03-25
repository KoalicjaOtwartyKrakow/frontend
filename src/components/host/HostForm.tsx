// import Effect from 'components/atoms/form/Effect';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/host/HostFormFields... Remove this comment to see the full error message
import { hostFormFields as formFields } from "components/host/HostFormFields";
import React from "react";
import { Form, Formik } from "formik";
import { formikFormApplyYupTransforms as yupTransform } from "formik-yup";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'proptypes/HostFormPropTypes' o... Remove this comment to see the full error message
import { hostFormPropTypes } from "proptypes/HostFormPropTypes";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/host/HostFormSchema... Remove this comment to see the full error message
import { hostFormCreateSchema, hostFormUpdateSchema } from "components/host/HostFormSchemas";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/host/form/sections/... Remove this comment to see the full error message
import HostFormButtons from "components/host/form/sections/HostFormButtons";
import { Col, Row } from "reactstrap";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/host/form/sections/... Remove this comment to see the full error message
import HostFormContact from "components/host/form/sections/HostFormContact";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/host/form/sections/... Remove this comment to see the full error message
import HostFormAdditionalInformation from "components/host/form/sections/HostFormAdditionalInformation";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/NonField... Remove this comment to see the full error message
import NonFieldErrors from "components/atoms/form/NonFieldErrors";

const HostForm = (props: any) => {
    const { initialValues, onRemove, hostInProgress } = props;

    const initialStatus = formFields.getInitialStatus();

    const key = initialValues.uuid;

    const isCreateMode = !initialValues.id;
    const isUpdateMode = !!initialValues.id;

    const validateOnMount = isCreateMode;

    const validationSchema = isUpdateMode ? hostFormUpdateSchema : hostFormCreateSchema;

    // const onChange = (currentState) => {
    //   const { name } = currentState.values;
    //   props.onHostNameChange(name);
    // };

    const onSubmitError = (response: any, values: any, resetForm: any) => {
        const status = formFields.getStatusFromApi(response);
        resetForm({ values, status });
    };

    /**
     *
     * @param values
     * @param formikBag
     * @returns {Promise<*>}
     */
    const onSubmit = async (values: any, formikBag: any) => {
        console.log("[Host] HostForm onSubmit()");

        const [formattedValues, hasErrors] = await yupTransform(values, formikBag, validationSchema);

        if (hasErrors) {
            return;
        }
        const { resetForm } = formikBag;

        const onSubmitApiErrors = (response: any) => onSubmitError(response, values, resetForm);

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

    const submitDisabled = (isValid: any, isSubmitting: any) => !isValid || isSubmitting;

    const { t } = useTranslation(["host"]);

    const submitLabel = isCreateMode ? t("host:form.button.create") : t("host:form.button.update");

    return (
        <Formik {...formikProps}>
            {({ isSubmitting, isValid }) => (
                <Form noValidate>
                    <NonFieldErrors label={t("host:form.message.updateFailure")} />
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
