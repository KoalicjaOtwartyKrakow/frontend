import PropTypes from "prop-types";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";

const accommodationFormInitialValuesPropTypes = PropTypes.shape({
    [AccommodationFormFields.ADDRESS_STATE_NAME]: PropTypes.string,
    [AccommodationFormFields.ADDRESS_CITY]: PropTypes.string,
    [AccommodationFormFields.ADDRESS_FLAT_NUMBER]: PropTypes.string,
    [AccommodationFormFields.ADDRESS_STREET_NUMBER]: PropTypes.string,
    [AccommodationFormFields.ADDRESS_STREET_NAME]: PropTypes.string,
    [AccommodationFormFields.ADDRESS_ZIP]: PropTypes.string,
    // [AccommodationFormFields.CREATED_AT]: PropTypes.number,
    [AccommodationFormFields.DESCRIPTION]: PropTypes.string,
    [AccommodationFormFields.ID]: PropTypes.number,
    [AccommodationFormFields.IS_VERIFIED]: PropTypes.bool,
    [AccommodationFormFields.LANDLORD_EMAIL]: PropTypes.string,
    [AccommodationFormFields.LANDLORD_NAME]: PropTypes.string,
    [AccommodationFormFields.LANDLORD_PHONE]: PropTypes.string,
    [AccommodationFormFields.VACANCIES_TOTAL]: PropTypes.number,
    [AccommodationFormFields.VACANCIES_TAKEN]: PropTypes.number,
    [AccommodationFormFields.UUID]: PropTypes.string,
    [AccommodationFormFields.VOLUNTEER_NAME]: PropTypes.string,
});

const accommodationFormLandlordPropTypes = {};

const accommodationInProgressPropType = PropTypes.string.isRequired;

const accommodationFormPropTypesBase = {
    initialValues: accommodationFormInitialValuesPropTypes,
    onSubmit: PropTypes.func.isRequired,
    onRemove: PropTypes.func,
    accommodationInProgress: accommodationInProgressPropType,
};

const accommodationFormPropTypes = {
    ...accommodationFormPropTypesBase,
    onLandlordNameChange: PropTypes.func,
};

const accommodationFormCardPropTypes = {
    ...accommodationFormPropTypesBase,
    formLabel: PropTypes.string.isRequired,
};

export {
    accommodationFormCardPropTypes,
    accommodationFormLandlordPropTypes,
    accommodationFormPropTypes,
    accommodationInProgressPropType,
};
