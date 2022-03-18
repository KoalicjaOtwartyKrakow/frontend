// import Effect from 'components/atoms/form/Effect';
import { accommodationFormFields as formFields } from "components/accommodation/AccommodationFormFields";
import React from "react";
import { Form, Formik } from "formik";
import { formikFormApplyYupTransforms as yupTransform } from "formik-yup";
import { useTranslation } from "react-i18next";

import { accommodationFormPropTypes } from "proptypes/AccommodationFormPropTypes";
import {
    accommodationFormCreateSchema,
    accommodationFormUpdateSchema,
} from "components/accommodation/AccommodationFormSchemas";
import AccommodationFormAddress from "components/accommodation/form/sections/AccommodationFormAddress";
import AccommodationFormAdditional from "components/accommodation/form/sections/AccommodationFormAdditional";
import AccommodationFormButtons from "components/accommodation/form/sections/AccommodationFormButtons";
import { Col, Row } from "reactstrap";
import AccommodationFormVacancies from "components/accommodation/form/sections/AccommodationFormVacancies";
import AccommodationFormDetailedInformation from "components/accommodation/form/sections/AccommodationFormDetailedInformation";

const AccommodationForm = (props) => {
    const { initialValues, onRemove, accommodationInProgress } = props;

    const initialStatus = formFields.getInitialStatus();

    const key = initialValues.uuid;

    const isCreateMode = !initialValues.guid;
    const isUpdateMode = !!initialValues.guid;

    const validateOnMount = isCreateMode;

    const validationSchema = isUpdateMode
        ? accommodationFormUpdateSchema
        : accommodationFormCreateSchema;

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
        console.log("[Accommodation] AccommodationForm onSubmit()");

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

    const { t } = useTranslation(["accommodation"]);

    const submitLabel = isCreateMode
        ? t("accommodation:form.button.create")
        : t("accommodation:form.button.update");

    return (
        <Formik {...formikProps}>
            {({ isSubmitting, isValid }) => (
                <Form noValidate>
                    {/*<Effect onChange={ onChange } />*/}
                    <Row>
                        <Col xs={12} lg={6}>
                            <AccommodationFormAddress />
                            <AccommodationFormVacancies />
                        </Col>
                        <Col xs={12} lg={6}>
                            <AccommodationFormAdditional />
                        </Col>
                    </Row>
                    <AccommodationFormDetailedInformation />
                    <AccommodationFormButtons
                        isSubmitting={isSubmitting}
                        submitDisabled={submitDisabled(isValid, isSubmitting)}
                        submitLabel={submitLabel}
                        onRemove={onRemove}
                        inProgress={accommodationInProgress}
                    />
                </Form>
            )}
        </Formik>
    );
};

AccommodationForm.propTypes = accommodationFormPropTypes;

export default AccommodationForm;
