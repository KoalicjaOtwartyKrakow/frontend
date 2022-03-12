import pick from "lodash-es/pick";
import moment from "moment-es6";
import { appConfig } from "constants/AppConfig";
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import Accommodation from "models/Accommodation";
import { getFormattedDate } from "shared/datetime";
import {
    defaultPolishVoivodeshipId,
    getPolishVoivodeshipById,
} from "models/constants/Address";

const objectAssignMapped = (object, source, map) => {
    for (const [objectKey, sourceKey] of Object.entries(map)) {
        object[objectKey] = source[sourceKey];
    }
    return object;
};

class AccommodationFormFields {
    static ADDRESS_VOIVODESHIP = "addressVoivodeship";
    static ADDRESS_CITY = "addressCity";
    static ADDRESS_LINE = "addressLine";
    static ADDRESS_VOIVODESHIP = "addressVoivodeship";
    static ADDRESS_ZIP = "addressZip";
    static COMMENTS = "comments";
    static DESCRIPTION = "description";
    static DISABLED_PEOPLE_FRIENDLY = "disabledPeopleFriendly";
    static EASY_AMBULANCE_ACCESS = "easyAmbulanceAccess";
    static HOST_EMAIL = "hostEmail";
    static HOST_NAME = "hostName";
    static HOST_PHONE = "hostPhone";
    static HOST_STATUS = "hostStatus";
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
     * Transform object from model to form object.
     * @param {Accommodation} accommodation
     * @return {*}
     */
    static getInitialValues(accommodation) {

        if (!accommodation.id) {
            console.log(
                "computing initial values, can't do it! no id, so returning empty object"
            );
            return {};
        }

        const FormObject = objectAssignMapped(
            {},
            accommodation,
            AccommodationFormFields.modelToFormMap
        );

        return FormObject;

        const fieldNames = Object.values(AccommodationFormFields);
        const initialValues = pick(accommodation, fieldNames);

        initialValues[AccommodationFormFields.ADDRESS_VOIVODESHIP] =
            getPolishVoivodeshipById(
                initialValues[AccommodationFormFields.ADDRESS_VOIVODESHIP]
            ) || defaultPolishVoivodeshipId;

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
            [AccommodationFormFields.COMMENTS],
            [AccommodationFormFields.VACANCIES_TOTAL],
            [AccommodationFormFields.VACANCIES_TAKEN],
            [AccommodationFormFields.PETS_ALLOWED],
            [AccommodationFormFields.PETS_PRESENT],
            [AccommodationFormFields.DISABLED_PEOPLE_FRIENDLY],
            [AccommodationFormFields.LGBT_FRIENDLY],
            [AccommodationFormFields.PARKING_PLACE],
            [AccommodationFormFields.EASY_AMBULANCE_ACCESS],
            // [AccommodationFormFields.DESCRIPTION],
            // [AccommodationFormFields.IS_VERIFIED],
            // [AccommodationFormFields.HOST_EMAIL],
            // [AccommodationFormFields.HOST_NAME],
            // [AccommodationFormFields.HOST_PHONE],
            //[AccommodationFormFields.VOLUNTEER_NAME],
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
        return AccommodationFormFields.formToModel(values);
    }

    static formToModel(formValues) {
        // Invert map
        const formToModelMap = Object.fromEntries(
            Object.entries(AccommodationFormFields.modelToFormMap).map(
                ([k, v]) => [v, k]
            )
        );

        const model = objectAssignMapped(
            new Accommodation(),
            formValues,
            formToModelMap
        );
        return model;
    }
}

const accommodationFormFields = new AccommodationFormFields();

export { accommodationFormFields, AccommodationFormFields };
