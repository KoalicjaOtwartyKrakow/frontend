// import Effect from 'components/atoms/form/Effect';
import { apartmentFormFields as formFields } from 'components/apartments/apartment/ApartmentFormFields';
import React from 'react';
import { Form, Formik } from 'formik';
import { formikFormApplyYupTransforms as yupTransform } from 'formik-yup';
import { apartmentFormPropTypes } from 'proptypes/ApartmentFormPropTypes';
import {
  apartmentFormCreateSchema,
  apartmentFormUpdateSchema
} from 'components/apartments/apartment/ApartmentFormSchemas';
import ApartmentFormAddress from 'components/apartments/apartment/form/sections/ApartmentFormAddress';
import ApartmentFormLandlord from 'components/apartments/apartment/form/sections/ApartmentFormLandlord';
import ApartmentFormAdditional from 'components/apartments/apartment/form/sections/ApartmentFormAdditional';
import ApartmentFormButtons from 'components/apartments/apartment/form/sections/ApartmentFormButtons';

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
    <Formik { ...formikProps }>
      { ({ isValid, isSubmitting }) => (
        <Form noValidate>
          {/*<Effect onChange={ onChange } />*/}
          <ApartmentFormAddress />
          <ApartmentFormLandlord />
          <ApartmentFormAdditional />
          <ApartmentFormButtons
            isSubmitting={ isSubmitting }
            submitDisabled={ submitDisabled(isValid, isSubmitting) }
            submitLabel={ isCreateMode ? 'Dodaj nowy lokal' : 'Zapisz zmiany' }
            onRemove={ onRemove }
            inProgress={ apartmentInProgress }
          />
        </Form>
      ) }
    </Formik>
  );

};

ApartmentForm.propTypes = apartmentFormPropTypes;

export default ApartmentForm;
