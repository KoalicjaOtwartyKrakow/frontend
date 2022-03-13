import pick from "lodash-es/pick";
import moment from "moment-es6";
import { appConfig } from "constants/AppConfig";
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import Accommodation from "models/Accommodation";
import { getFormattedDate } from "shared/datetime";

class AccommodationFormFields {
    static ADDRESS_VOIVODESHIP = "addressVoivodeship";
    static ADDRESS_CITY = "addressCity";
    static ADDRESS_LINE = "addressLine";
    static ADDRESS_ZIP = "addressZip";
    // static CREATED_AT = 'createdAt';
    static COMMENTS = "comments";
    static DESCRIPTION = "description";
    static ID = "id";
    static IS_VERIFIED = "isVerified";
    static HOST_EMAIL = "hostEmail";
    static HOST_NAME = "hostName";
    static HOST_PHONE = "hostPhone";
    static PETS_PRESENT = "petsPresent";
    static PETS_ALLOWED = "petsAllowed";
    static STATUS = "status";
    static VACANCIES_TOTAL = "vacanciesTotal";
    static VACANCIES_TAKEN = "vacanciesTaken";
    static UUID = "uuid";
    static VOLUNTEER_NAME = "volunteerName";

    /**
     *
     * @param {Accommodation} accommodation
     * @return {*}
     */
    static getInitialValues(accommodation) {
        const fieldNames = Object.values(AccommodationFormFields);
        const initialValues = pick(accommodation, fieldNames);

        if (
            !(
                initialValues.hasOwnProperty(
                    AccommodationFormFields.ADDRESS_VOIVODESHIP
                ) &&
                initialValues[AccommodationFormFields.ADDRESS_VOIVODESHIP] !==
                    null &&
                initialValues[AccommodationFormFields.ADDRESS_VOIVODESHIP] !==
                    ""
            )
        ) {
            initialValues[AccommodationFormFields.ADDRESS_VOIVODESHIP] =
                "MALOPOLSKIE";
        }

        return accommodation.id
            ? initialValues
            : Object.assign(initialValues, {
                  [AccommodationFormFields.VACANCIES_TOTAL]: 1,
                  [AccommodationFormFields.VACANCIES_TAKEN]: 0,
                  [AccommodationFormFields.IS_VERIFIED]: false,
              });
    }

    getInitialStatus() {
        return FormikApiErrors.getInitialStatus();
    }

    getDateAsYMD(value) {
        return getFormattedDate(value);
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
            [AccommodationFormFields.ADDRESS_VOIVODESHIP],
            [AccommodationFormFields.ADDRESS_CITY],
            [AccommodationFormFields.ADDRESS_LINE],
            [AccommodationFormFields.ADDRESS_ZIP],
            [AccommodationFormFields.DESCRIPTION],
            [AccommodationFormFields.ID],
            [AccommodationFormFields.IS_VERIFIED],
            [AccommodationFormFields.HOST_EMAIL],
            [AccommodationFormFields.HOST_NAME],
            [AccommodationFormFields.HOST_PHONE],
            [AccommodationFormFields.VACANCIES_TOTAL],
            [AccommodationFormFields.VACANCIES_TAKEN],
            [AccommodationFormFields.UUID],
            [AccommodationFormFields.VOLUNTEER_NAME],
        ];

        const simpleTypeDiff = (key) => prev[key] !== next[key];

        if (simpleTypeFields.some(simpleTypeDiff)) {
            return false;
        }

        const dateTimeFields = [
            // [ AccommodationFormFields.CREATED_AT ],
        ];

        const dateDiff = (key) => {
            const firstDateTime = prev[key];
            const secondDateTime = next[key];
            const asYmd = accommodationFormFields.getDateAsYMD;
            return asYmd(firstDateTime) !== asYmd(secondDateTime);
        };

        return !dateTimeFields.some(dateDiff);
    }

    /**
     *
     * @param {Object} values
     * @returns {Accommodation}
     */
    toModel(values) {
        const accommodation = new Accommodation();
        return Object.assign(accommodation, values);
    }
}

const accommodationFormFields = new AccommodationFormFields();

export { accommodationFormFields, AccommodationFormFields };
