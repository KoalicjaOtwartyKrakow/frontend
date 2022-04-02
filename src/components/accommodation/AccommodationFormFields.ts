import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import Accommodation from "models/Accommodation";
import { getFormattedDate } from "shared/datetime";
import { defaultPolishVoivodeshipId, getPolishVoivodeshipById } from "models/constants/Address";
import { merge, pick } from "lodash";
import { ApiErrors } from "services/Api/types";
import moment from "moment";
import DurationSerializer from "../../serializers/DurationSerializer";

interface AccommodationFormFieldsInterface {
    addressCity: any;
    addressLine: any;
    addressVoivodeship: any;
    addressZip: any;
    staffComments: any;
    ownerComments: any;
    description: any;
    disabledPeopleFriendly: any;
    easyAmbulanceAccess: any;
    host: any;
    hostId: string;
    id: string;
    isVerified: any;
    lgbtFriendly: any;
    parkingPlaceAvailable: any;
    petsAllowed: any;
    petsPresent: any;
    status: any;
    systemComments: string | undefined;
    uuid: any;
    vacanciesTaken: any;
    vacanciesTotal: any;
    volunteerName: any;
    [index: string]: any;
}

class AccommodationFormFields {
    static ADDRESS_CITY = "addressCity";
    static ADDRESS_LINE = "addressLine";
    static ADDRESS_VOIVODESHIP = "addressVoivodeship";
    static ADDRESS_ZIP = "addressZip";
    static STAFF_COMMENTS = "staffComments";
    static OWNER_COMMENTS = "ownerComments";
    static DESCRIPTION = "description";
    static DISABLED_PEOPLE_FRIENDLY = "disabledPeopleFriendly";
    static DURATION_OF_STAY_VALUE = "durationOfStayValue";
    static DURATION_OF_STAY_UNIT = "durationOfStayUnit";
    static EASY_AMBULANCE_ACCESS = "easyAmbulanceAccess";
    static HOST = "host";
    static HOST_ID = "hostId";
    static ID = "id";
    static IS_VERIFIED = "isVerified";
    static LGBT_FRIENDLY = "lgbtFriendly";
    static PARKING_PLACE = "parkingPlaceAvailable";
    static PETS_ALLOWED = "petsAllowed";
    static PETS_PRESENT = "petsPresent";
    static SYSTEM_COMMENTS = "systemComments";
    static UUID = "uuid";
    static VACANCIES_TAKEN = "vacanciesTaken";
    static VACANCIES_TOTAL = "vacanciesTotal";
    static VERIFICATION_STATUS = "status";
    static VOLUNTEER_NAME = "volunteerName";
    static WORKFLOW_STATUS = "workflowStatus";

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
        const formValues = {
            ...pick(accommodation, fieldNames),
            ...this.createDurationOfStaySubfields(accommodation.forHowLong),
        };

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

    private createDurationOfStaySubfields(duration: moment.Duration) {
        const durationSerializer = new DurationSerializer();
        const durationOfStay = durationSerializer.getValueAndUnitFromDuration(duration, ["months", "weeks", "days"]);
        return {
            [AccommodationFormFields.DURATION_OF_STAY_UNIT]: durationOfStay.unit,
            [AccommodationFormFields.DURATION_OF_STAY_VALUE]: durationOfStay.value,
        };
    }

    formToModel(formValues: any) {
        /**
         * @type {Accommodation}
         */
        const accommodation = merge(new Accommodation(), formValues);
        if (formValues.accommodationUnitId === "") {
            accommodation.accommodationUnitId = null;
        }

        // Required for recalculation, as vacanciesTaken setter is called sooner
        // than vacanciesFree get upgraded during merge()
        accommodation.vacanciesTaken = formValues[AccommodationFormFields.VACANCIES_TAKEN];

        accommodation.forHowLong = moment.duration(
            formValues[AccommodationFormFields.DURATION_OF_STAY_VALUE],
            formValues[AccommodationFormFields.DURATION_OF_STAY_UNIT]
        );

        return accommodation;
    }

    getInitialStatus() {
        return FormikApiErrors.getInitialStatus();
    }

    getDateAsYMD(value: any) {
        return getFormattedDate(value);
    }

    getStatusFromApi(apiErrors: ApiErrors) {
        return FormikApiErrors.getStatusFromApi(apiErrors);
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
export type { AccommodationFormFieldsInterface };
