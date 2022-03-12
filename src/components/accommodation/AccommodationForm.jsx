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
import AccommodationFormHost from "components/accommodation/form/sections/AccommodationFormHost";
import AccommodationFormAdditional from "components/accommodation/form/sections/AccommodationFormAdditional";
import AccommodationFormButtons from "components/accommodation/form/sections/AccommodationFormButtons";
import { Col, Row } from "reactstrap";
import AccommodationFormVacancies from "components/accommodation/form/sections/AccommodationFormVacancies";
import AccommodationFormDetailedInformation from "components/accommodation/form/sections/AccommodationFormDetailedInformation";

const AccommodationForm = (props) => {
    const { initialValues, onRemove, accommodationInProgress } = props;

    const initialStatus = formFields.getInitialStatus();

    const key = initialValues.uuid;

    const isCreateMode = !initialValues.id;
    const isUpdateMode = !!initialValues.id;

    const validateOnMount = isCreateMode;
    const validationSchema = isUpdateMode
        ? accommodationFormUpdateSchema
        : accommodationFormCreateSchema;

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
        const accommodation = formFields.toModel(formattedValues);
        const { resetForm } = formikBag;
        const onSubmitApiErrors = (apiErrors, httpStatusCode) =>
            onSubmitError(apiErrors, httpStatusCode, values, resetForm);
        return props.onSubmit(accommodation, onSubmitApiErrors);
    };

    if (
        !(
            initialValues.hasOwnProperty("addressVoivodeship") &&
            initialValues.addressVoivodeship !== null &&
            initialValues.addressVoivodeship !== ""
        )
    ) {
        initialValues.addressVoivodeship = "MALOPOLSKIE";
    }

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
            {({ isValid, isSubmitting }) => (
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
