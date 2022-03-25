// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormikAp... Remove this comment to see the full error message
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Accommodation' or its c... Remove this comment to see the full error message
import Accommodation from "models/Accommodation";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'shared/datetime' or its corres... Remove this comment to see the full error message
import { getFormattedDate } from "shared/datetime";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/constants/Address' or i... Remove this comment to see the full error message
import { defaultPolishVoivodeshipId, getPolishVoivodeshipById } from "models/constants/Address";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
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
    modelToForm(accommodation: any) {
        if (!(accommodation instanceof Accommodation)) {
            return undefined;
        }

        const fieldNames = Object.values(AccommodationFormFields);
        const formValues = pick(accommodation, fieldNames);

        formValues[AccommodationFormFields.ADDRESS_VOIVODESHIP] =
            getPolishVoivodeshipById(formValues[AccommodationFormFields.ADDRESS_VOIVODESHIP])?.id ||
            defaultPolishVoivodeshipId;

        if (accommodation.id) {
            return formValues;
        }

        const createFormValues = {
            [AccommodationFormFields.VACANCIES_TOTAL]: 1,
            [AccommodationFormFields.VACANCIES_TAKEN]: 0,
        };

        return { ...formValues, ...createFormValues };
    }

    formToModel(formValues: any) {
        /**
         * @type {Accommodation}
         */
        const accommodation = merge(new Accommodation(), formValues);

        // Required for recalculation, as vacanciesTaken setter is called sooner
        // than vacanciesFree get upgraded during merge()
        accommodation.vacanciesTaken = formValues[AccommodationFormFields.VACANCIES_TAKEN];

        return accommodation;
    }

    getInitialStatus() {
        return FormikApiErrors.getInitialStatus();
    }

    getDateAsYMD(value: any) {
        return getFormattedDate(value);
    }

    /**
     *
     * @param {{errors: object, status: ApiErrorStatus }} response
     * @returns {ApiErrors}
     */
    getStatusFromApi(response: any) {
        const { errors, status } = response;
        return FormikApiErrors.getStatusFromApi(errors, status);
    }

    areValuesEqual(prevValues: any, nextValues: any) {
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

        const simpleTypeDiff = (key: any) => prev[key] !== next[key];

        if (simpleTypeFields.some(simpleTypeDiff)) {
            return false;
        }

        const dateTimeFields: any = [
            // [ AccommodationFormFields.CREATED_AT ],
        ];

        const dateDiff = (key: any) => {
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
