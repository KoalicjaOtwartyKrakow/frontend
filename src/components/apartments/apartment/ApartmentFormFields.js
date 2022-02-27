import pick from 'lodash-es/pick';
import moment from 'moment-es6';
import { DATE_FORMAT } from 'constants/Config';
import { FormikApiErrors } from 'components/atoms/form/FormikApiErrors';
import Apartment from 'models/Apartment';

class ApartmentFormFields {
  static ADDRESS_COUNTY_NAME = 'addressCountyName';
  static ADDRESS_CITY = 'addressCity';
  static ADDRESS_FLAT_NUMBER = 'addressFlatNumber';
  static ADDRESS_STREET_NUMBER = 'addressStreetNumber' ;
  static ADDRESS_STREET_NAME = 'addressStreetName' ;
  static ADDRESS_ZIP = 'addressZip';
  // static CREATED_AT = 'createdAt';
  static DESCRIPTION = 'description';
  static ID = 'id';
  static IS_VERIFIED = 'isVerified';
  static LANDLORD_EMAIL = 'landlordEmail' ;
  static LANDLORD_NAME = 'landlordName' ;
  static LANDLORD_PHONE = 'landlordPhone' ;
  static PEOPLE_COUNT_MAX = 'peopleCountMax';
  static PEOPLE_COUNT_ALLOCATED = 'peopleCountAllocated';
  static UUID = 'uuid';
  static VOLUNTEER_NAME = 'volunteerName' ;

  /**
   *
   * @param {Apartment} apartment
   * @return {*}
   */
  static getInitialValues(apartment) {

    const fieldNames = Object.values(ApartmentFormFields);
    const initialValues = pick(apartment, fieldNames);

    return apartment.id ? initialValues : Object.assign(initialValues, {
      [ApartmentFormFields.PEOPLE_COUNT_MAX]: 0,
      [ApartmentFormFields.PEOPLE_COUNT_ALLOCATED]: 0,
      [ApartmentFormFields.IS_VERIFIED]: false,
    });
  }

  getInitialStatus() {
    return FormikApiErrors.getInitialStatus();
  }

  getDateAsYMD(value) {
    return moment.isMoment(value) ? value.format(DATE_FORMAT) : '';
  }

  /**
   *
   * @param {object} apiErrors
   * @param {ApiErrorStatus} status
   * @return {ApiErrors}
   */
  getStatusFromApi(apiErrors, status) {
    return FormikApiErrors.getStatusFromApi(apiErrors, status);
  }


  areValuesEqual(prevValues, nextValues) {
    const prev = prevValues || {};
    const next = nextValues || {};

    const simpleTypeFields = [
      [ ApartmentFormFields.ADDRESS_COUNTY_NAME ],
      [ ApartmentFormFields.ADDRESS_CITY ],
      [ ApartmentFormFields.ADDRESS_FLAT_NUMBER ],
      [ ApartmentFormFields.ADDRESS_STREET_NUMBER ],
      [ ApartmentFormFields.ADDRESS_STREET_NAME ],
      [ ApartmentFormFields.ADDRESS_ZIP ],
      [ ApartmentFormFields.DESCRIPTION ],
      [ ApartmentFormFields.ID ],
      [ ApartmentFormFields.IS_VERIFIED ],
      [ ApartmentFormFields.LANDLORD_EMAIL ],
      [ ApartmentFormFields.LANDLORD_NAME ],
      [ ApartmentFormFields.LANDLORD_PHONE ],
      [ ApartmentFormFields.PEOPLE_COUNT_MAX ],
      [ ApartmentFormFields.PEOPLE_COUNT_ALLOCATED ],
      [ ApartmentFormFields.UUID ],
      [ ApartmentFormFields.VOLUNTEER_NAME ],
    ];

    const simpleTypeDiff = (key) => prev[key] !== next[key];

    if (simpleTypeFields.some(simpleTypeDiff)) {
      return false;
    }

    const dateTimeFields = [
      // [ ApartmentFormFields.CREATED_AT ],
    ];

    const dateDiff = (key) => {
      const firstDateTime = prev[key];
      const secondDateTime = next[key];
      const asYmd = apartmentFormFields.getDateAsYMD;
      return asYmd(firstDateTime) !== asYmd(secondDateTime);
    };

    return !dateTimeFields.some(dateDiff);

  }

  /**
   *
   * @param {Object} values
   * @returns {Apartment}
   */
  toModel(values) {
    const apartment = new Apartment();
    return Object.assign(apartment, values);
  }
}

const apartmentFormFields = new ApartmentFormFields();

export {
  apartmentFormFields,
  ApartmentFormFields
};