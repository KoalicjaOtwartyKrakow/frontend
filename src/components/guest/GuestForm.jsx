import { guestFormFields as formFields } from "components/guest/GuestFormFields";
import React from "react";
import { Form, Formik } from "formik";
import { formikFormApplyYupTransforms as yupTransform } from "formik-yup";
import { useTranslation } from "react-i18next";

import {
    guestFormCreateSchema,
    guestFormUpdateSchema,
} from "components/guest/GuestFormSchemas";
import GuestFormButtons from "components/guest/form/sections/GuestFormButtons";
import { Col, Row } from "reactstrap";
import GuestFormPersonalData from "components/guest/form/sections/GuestFormPersonalData";
import GuestFormAdditional from "components/guest/form/sections/GuestFormAdditional";
import GuestFormGroupAdults from "components/guest/form/sections/GuestFormGroupAdults";
import GuestFormGroupChildren from "components/guest/form/sections/GuestFormGroupChildren";
import GuestFormDetailedInformation from "components/guest/form/sections/GuestFormDetailedInformation";

const GuestForm = (props) => {
    const { initialValues, onRemove, guestInProgress } = props;

    const initialStatus = formFields.getInitialStatus();

    const key = initialValues.uuid;

    const isCreateMode = !initialValues.id;
    const isUpdateMode = !!initialValues.id;

    const validateOnMount = isCreateMode;

    const validationSchema = isUpdateMode
        ? guestFormUpdateSchema
        : guestFormCreateSchema;

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
        console.log("[Guest] GuestForm onSubmit()");

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

    const { t } = useTranslation(["guest"]);

    const submitLabel = isCreateMode
        ? t("guest:form.button.create")
        : t("guest:form.button.update");

    return (
        <Formik {...formikProps}>
            {({ isSubmitting, isValid }) => (
                <Form noValidate>
                    <Row>
                        <Col xs={12} lg={6}>
                            <GuestFormPersonalData />
                            <GuestFormGroupAdults />
                            <GuestFormGroupChildren />
                        </Col>
                        <Col xs={12} lg={6}>
                            <GuestFormAdditional />
                            <GuestFormDetailedInformation />
                        </Col>
                    </Row>
                    <GuestFormButtons
                        isSubmitting={isSubmitting}
                        submitDisabled={submitDisabled(isValid, isSubmitting)}
                        submitLabel={submitLabel}
                        onRemove={onRemove}
                        inProgress={guestInProgress}
                    />
                </Form>
            )}
        </Formik>
    );
};

// GuestForm.propTypes = guestFormPropTypes;

export default GuestForm;
