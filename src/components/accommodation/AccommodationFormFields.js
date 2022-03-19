import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import Accommodation from "models/Accommodation";
import { getFormattedDate } from "shared/datetime";
import {
    defaultPolishVoivodeshipId,
    getPolishVoivodeshipById,
} from "models/constants/Address";
import { merge, pick } from "lodash-es";

class AccommodationFormFields {
    static ADDRESS_CITY = "addressCity";
    static ADDRESS_LINE = "addressLine";
    static ADDRESS_VOIVODESHIP = "addressVoivodeship";
    static ADDRESS_ZIP = "addressZip";
    static STAFF_COMMENTS = "staffComments";
    static OWNER_COMMENTS = "ownerComments";
    static DESCRIPTION = "description";
    static DISABLED_PEOPLE_FRIENDLY = "disabledPeopleFriendly";
    static EASY_AMBULANCE_ACCESS = "easyAmbulanceAccess";
    static HOST = "host";
    static HOST_ID = "hostId";
    static ID = "id";
    static ID = "id";
    static IS_VERIFIED = "isVerified";
    static LGBT_FRIENDLY = "lgbtFriendly";
    static PARKING_PLACE = "parkingPlaceAvailable";
    static PETS_ALLOWED = "petsAllowed";
    static PETS_PRESENT = "petsPresent";
    static STATUS = "status";
    static UUID = "uuid";
    static VACANCIES_TAKEN = "vacanciesTaken";
    static VACANCIES_TOTAL = "vacanciesTotal";
    static VOLUNTEER_NAME = "volunteerName";

    /**
     * Transform object from model to form values.
     * @param {Accommodation} accommodation
     * @return {Object}
     */
    modelToForm(accommodation) {
        if (!(accommodation instanceof Accommodation)) {
            return undefined;
        }

        const fieldNames = Object.values(AccommodationFormFields);
        const formValues = pick(accommodation, fieldNames);

        formValues[AccommodationFormFields.ADDRESS_VOIVODESHIP] =
            getPolishVoivodeshipById(
                formValues[AccommodationFormFields.ADDRESS_VOIVODESHIP]
            )?.id || defaultPolishVoivodeshipId;

        if (accommodation.id) {
            return formValues;
        }

        const createFormValues = {
            [AccommodationFormFields.VACANCIES_TOTAL]: 1,
            [AccommodationFormFields.VACANCIES_TAKEN]: 0,
        };

        return { ...formValues, ...createFormValues };
    }

    formToModel(formValues) {
        /**
         * @type {Accommodation}
         */
        const accommodation = merge(new Accommodation(), formValues);

        // Required for recalculation, as vacanciesTaken setter is called sooner
        // than vacanciesFree get upgraded during merge()
        accommodation.vacanciesTaken =
            formValues[AccommodationFormFields.VACANCIES_TAKEN];

        return accommodation;
    }

    getInitialStatus() {
        return FormikApiErrors.getInitialStatus();
    }

    getDateAsYMD(value) {
        return getFormattedDate(value);
    }

    /**
     *
     * @param {{errors: object, status: ApiErrorStatus }} response
     * @returns {ApiErrors}
     */
    getStatusFromApi(response) {
        const { errors, status } = response;
        return FormikApiErrors.getStatusFromApi(errors, status);
    }

    areValuesEqual(prevValues, nextValues) {
        const prev = prevValues || {};
        const next = nextValues || {};

        const simpleTypeFields = [
            [AccommodationFormFields.ADDRESS_CITY],
            [AccommodationFormFields.ADDRESS_LINE],
            [AccommodationFormFields.ADDRESS_VOIVODESHIP],
            [AccommodationFormFields.ADDRESS_ZIP],
            [AccommodationFormFields.DESCRIPTION],
            [AccommodationFormFields.DISABLED_PEOPLE_FRIENDLY],
            [AccommodationFormFields.EASY_AMBULANCE_ACCESS],
            [AccommodationFormFields.LGBT_FRIENDLY],
            [AccommodationFormFields.OWNER_COMMENTS],
            [AccommodationFormFields.PARKING_PLACE],
            [AccommodationFormFields.PETS_ALLOWED],
            [AccommodationFormFields.PETS_PRESENT],
            [AccommodationFormFields.STAFF_COMMENTS],
            [AccommodationFormFields.VACANCIES_TAKEN],
            [AccommodationFormFields.VACANCIES_TOTAL],
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
}

const accommodationFormFields = new AccommodationFormFields();

export { accommodationFormFields, AccommodationFormFields };
