// import Effect from 'components/atoms/form/Effect';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/Accom... Remove this comment to see the full error message
import { accommodationFormFields as formFields } from "components/accommodation/AccommodationFormFields";
import React from "react";
import { Form, Formik } from "formik";
import { formikFormApplyYupTransforms as yupTransform } from "formik-yup";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'proptypes/AccommodationFormPro... Remove this comment to see the full error message
import { accommodationFormPropTypes } from "proptypes/AccommodationFormPropTypes";
import {
    accommodationFormCreateSchema,
    accommodationFormUpdateSchema,
    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/Accom... Remove this comment to see the full error message
} from "components/accommodation/AccommodationFormSchemas";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/form/... Remove this comment to see the full error message
import AccommodationFormAddress from "components/accommodation/form/sections/AccommodationFormAddress";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/form/... Remove this comment to see the full error message
import AccommodationFormAdditional from "components/accommodation/form/sections/AccommodationFormAdditional";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/form/... Remove this comment to see the full error message
import AccommodationFormButtons from "components/accommodation/form/sections/AccommodationFormButtons";
import { Col, Row } from "reactstrap";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/form/... Remove this comment to see the full error message
import AccommodationFormVacancies from "components/accommodation/form/sections/AccommodationFormVacancies";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/form/... Remove this comment to see the full error message
// eslint-disable-next-line max-len
import AccommodationFormDetailedInformation from "components/accommodation/form/sections/AccommodationFormDetailedInformation";

const AccommodationForm = (props: any) => {
    const { initialValues, onRemove, accommodationInProgress } = props;

    const initialStatus = formFields.getInitialStatus();

    const key = initialValues.uuid;

    const isCreateMode = !initialValues.id;
    const isUpdateMode = !!initialValues.id;

    const validateOnMount = isCreateMode;

    const validationSchema = isUpdateMode ? accommodationFormUpdateSchema : accommodationFormCreateSchema;

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
        console.log("[Accommodation] AccommodationForm onSubmit()");

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

    const { t } = useTranslation(["accommodation"]);

    const submitLabel = isCreateMode ? t("accommodation:form.button.create") : t("accommodation:form.button.update");

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
