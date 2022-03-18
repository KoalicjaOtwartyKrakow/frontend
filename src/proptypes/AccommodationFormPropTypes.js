import PropTypes from "prop-types";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";

const accommodationFormInitialValuesPropTypes = PropTypes.shape({
    [AccommodationFormFields.ADDRESS_CITY]: PropTypes.string,
    [AccommodationFormFields.ADDRESS_LINE]: PropTypes.string,
    [AccommodationFormFields.ADDRESS_VOIVODESHIP]: PropTypes.string,
    [AccommodationFormFields.ADDRESS_ZIP]: PropTypes.string,
    [AccommodationFormFields.DESCRIPTION]: PropTypes.string,
    [AccommodationFormFields.ID]: PropTypes.number,
    [AccommodationFormFields.IS_VERIFIED]: PropTypes.bool,
    [AccommodationFormFields.OWNER_COMMENTS]: PropTypes.string,
    [AccommodationFormFields.PETS_ALLOWED]: PropTypes.bool,
    [AccommodationFormFields.PETS_PRESENT]: PropTypes.bool,
    [AccommodationFormFields.STAFF_COMMENTS]: PropTypes.string,
    [AccommodationFormFields.UUID]: PropTypes.string,
    [AccommodationFormFields.VACANCIES_TAKEN]: PropTypes.number,
    [AccommodationFormFields.VACANCIES_TOTAL]: PropTypes.number,
    [AccommodationFormFields.VOLUNTEER_NAME]: PropTypes.string,
});

const accommodationFormHostPropTypes = {};

const accommodationInProgressPropType = PropTypes.string.isRequired;

const accommodationFormPropTypesBase = {
    initialValues: accommodationFormInitialValuesPropTypes,
    onSubmit: PropTypes.func.isRequired,
    onRemove: PropTypes.func,
    accommodationInProgress: accommodationInProgressPropType,
};

const accommodationFormPropTypes = {
    ...accommodationFormPropTypesBase,
    onHostNameChange: PropTypes.func,
};

const accommodationFormCardPropTypes = {
    ...accommodationFormPropTypesBase,
    formLabel: PropTypes.string.isRequired,
};

export {
    accommodationFormCardPropTypes,
    accommodationFormHostPropTypes,
    accommodationFormPropTypes,
    accommodationInProgressPropType,
};
