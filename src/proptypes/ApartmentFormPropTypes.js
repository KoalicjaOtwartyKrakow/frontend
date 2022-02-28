import PropTypes from 'prop-types';
import { ApartmentFormFields } from 'components/apartment/ApartmentFormFields';

const apartmentFormInitialValuesPropTypes = PropTypes.shape({
  [ApartmentFormFields.ADDRESS_COUNTY_NAME]: PropTypes.string,
  [ApartmentFormFields.ADDRESS_CITY]: PropTypes.string,
  [ApartmentFormFields.ADDRESS_FLAT_NUMBER]: PropTypes.string,
  [ApartmentFormFields.ADDRESS_STREET_NUMBER]: PropTypes.string,
  [ApartmentFormFields.ADDRESS_STREET_NAME]: PropTypes.string,
  [ApartmentFormFields.ADDRESS_ZIP]: PropTypes.string,
  // [ApartmentFormFields.CREATED_AT]: PropTypes.number,
  [ApartmentFormFields.DESCRIPTION]: PropTypes.string,
  [ApartmentFormFields.ID]: PropTypes.number,
  [ApartmentFormFields.IS_VERIFIED]: PropTypes.bool,
  [ApartmentFormFields.LANDLORD_EMAIL]: PropTypes.string,
  [ApartmentFormFields.LANDLORD_NAME]: PropTypes.string,
  [ApartmentFormFields.LANDLORD_PHONE]: PropTypes.string,
  [ApartmentFormFields.VACANCIES_TOTAL]: PropTypes.number,
  [ApartmentFormFields.VACANCIES_TAKEN]: PropTypes.number,
  [ApartmentFormFields.UUID]: PropTypes.string,
  [ApartmentFormFields.VOLUNTEER_NAME]: PropTypes.string,
  
});

const apartmentFormLandlordPropTypes = {
};

const apartmentInProgressPropType = PropTypes.string.isRequired;

const apartmentFormPropTypesBase = {
  initialValues: apartmentFormInitialValuesPropTypes,
  onSubmit: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  apartmentInProgress: apartmentInProgressPropType,
};

const apartmentFormPropTypes = {
  ...apartmentFormPropTypesBase,
  onLandlordNameChange: PropTypes.func,
};

const apartmentFormCardPropTypes = {
  ...apartmentFormPropTypesBase,
  formLabel: PropTypes.string.isRequired,
};

export {
  apartmentFormCardPropTypes,
  apartmentFormLandlordPropTypes,
  apartmentFormPropTypes,
  apartmentInProgressPropType,
};