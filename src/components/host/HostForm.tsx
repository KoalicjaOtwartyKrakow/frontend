import { hostFormFields as formFields } from "components/host/HostFormFields";
import React from "react";
import { Form, Formik } from "formik";
import { formikFormApplyYupTransforms as yupTransform } from "formik-yup";
import { useTranslation } from "react-i18next";
import { hostFormCreateSchema, hostFormUpdateSchema } from "components/host/HostFormSchemas";
import { Col, Row } from "reactstrap";
import HostFormContact from "components/host/form/sections/HostFormContact";
import HostFormAdditionalInformation from "components/host/form/sections/HostFormAdditionalInformation";
import NonFieldErrors from "components/atoms/form/NonFieldErrors";
import EntityFormButtons from "components/molecules/form/EntityFormButtons";

const HostForm = (props: any) => {
    const { initialValues, onRemove, hostInProgress } = props;

    const initialStatus = formFields.getInitialStatus();

    const key = initialValues.uuid;

    const isCreateMode = !initialValues.id;
    const isUpdateMode = !!initialValues.id;

    const validateOnMount = isCreateMode;

    const validationSchema = isUpdateMode ? hostFormUpdateSchema : hostFormCreateSchema;

    const onSubmitError = (response: any, values: any, resetForm: any) => {
        const status = formFields.getStatusFromApi(response);
        resetForm({ values, status });
    };

    const onSubmit = async (values: any, formikBag: any) => {
        console.info("[Host] HostForm onSubmit()");

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

    const { t } = useTranslation(["host"]);

    const submitLabel = isCreateMode ? t("host:form.button.create") : t("host:form.button.update");

    return (
        <Formik {...formikProps}>
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
                <EntityFormButtons submitLabel={submitLabel} onRemove={onRemove} crudInProgressState={hostInProgress} />
            </Form>
        </Formik>
    );
};

export default HostForm;
