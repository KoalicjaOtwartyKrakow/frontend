// import Effect from 'components/atoms/form/Effect';
import { apartmentFormFields as formFields } from 'components/apartment/ApartmentFormFields';
import React from 'react';
import { Form, Formik } from 'formik';
import { formikFormApplyYupTransforms as yupTransform } from 'formik-yup';
import { apartmentFormPropTypes } from 'proptypes/ApartmentFormPropTypes';
import {
    apartmentFormCreateSchema,
    apartmentFormUpdateSchema
} from 'components/apartment/ApartmentFormSchemas';
import ApartmentFormAddress from 'components/apartment/form/sections/ApartmentFormAddress';
import ApartmentFormLandlord from 'components/apartment/form/sections/ApartmentFormLandlord';
import ApartmentFormAdditional from 'components/apartment/form/sections/ApartmentFormAdditional';
import ApartmentFormButtons from 'components/apartment/form/sections/ApartmentFormButtons';
import { Col, Row } from 'reactstrap';
import ApartmentFormVacanciesTaken from 'components/apartment/form/fields/ApartmentFormVacanciesTaken';
import ApartmentFormVacanciesTotal from 'components/apartment/form/fields/ApartmentFormVacanciesTotal';
import ApartmentFormVacancies from 'components/apartment/form/sections/ApartmentFormVacancies';

const ApartmentForm = (props) => {
    const {
        initialValues,
        onRemove,
        apartmentInProgress,
    } = props;

    const initialStatus = formFields.getInitialStatus();

    const key = initialValues.uuid;

    const isCreateMode = !initialValues.id;
    const isUpdateMode = !!initialValues.id;

    const validateOnMount = isCreateMode;
    const validationSchema = isUpdateMode ? apartmentFormUpdateSchema : apartmentFormCreateSchema;

    // const onChange = (currentState) => {
    //   const { name } = currentState.values;
    //   props.onLandlordNameChange(name);
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
        const transformPromise = yupTransform(values, formikBag, validationSchema);
        const [ formattedValues, hasErrors ] = await transformPromise;
        if (hasErrors) {
            return;
        }
        const apartment = formFields.toModel(formattedValues);
        const { resetForm } = formikBag;
        const onSubmitApiErrors = (apiErrors, httpStatusCode) => onSubmitError(apiErrors, httpStatusCode, values, resetForm);
        return props.onSubmit(apartment, onSubmitApiErrors);
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

    return (
        <Formik {...formikProps}>
            {({ isValid, isSubmitting }) => (
                <Form noValidate>
                    {/*<Effect onChange={ onChange } />*/}
                    <Row>
                        <Col xs={12} lg={6}>
                            <ApartmentFormAddress />
                        </Col>
                        <Col xs={12} lg={6}>
                            <ApartmentFormVacancies />
                        </Col>
                    </Row>

                    <ApartmentFormLandlord />
                    <ApartmentFormAdditional />
                    <ApartmentFormButtons
                        isSubmitting={isSubmitting}
                        submitDisabled={submitDisabled(isValid, isSubmitting)}
                        submitLabel={isCreateMode ? 'Dodaj nowy lokal' : 'Zapisz zmiany'}
                        onRemove={onRemove}
                        inProgress={apartmentInProgress}
                    />
                </Form>
            )}
        </Formik>
    );

};

ApartmentForm.propTypes = apartmentFormPropTypes;

export default ApartmentForm;
