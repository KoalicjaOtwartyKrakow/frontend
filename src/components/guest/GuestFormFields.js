import { isEqual, merge, pick } from "lodash-es";
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import { getFormattedDate } from "shared/datetime";
import Guest from "models/Guest";
import {
    JsonConverter,
    JsonElementType,
    JsonObject,
    JsonProperty,
    JsonType,
    OnDeserialized,
} from "ta-json";
import GuestChild from "models/guest/GuestChild";
import MomentSerializer from "serializers/MomentSerializer";
import { GuestPriorityStatus } from "models/constants/GuestPriorityStatus";
import { GuestStatus } from "models/constants/GuestStatus";
import { nanoid } from "nanoid";

class A {
    durationOfStay = "";
    email = "";
    financialStatus = "";
    foodAllergies = "";
    fullName = "";
    glutenFreeDiet = false;
    id = undefined;
    lactoseFreeDiet = false;
    meatFreeDiet = false;
    peopleFemaleCount = 1;
    peopleMaleCount = 0;
    peopleTotalCount = 1;
    petsDescription = "";
    petsPresent = false;
    phoneNumber = "";
    priorityDate = undefined;
    priorityStatus = GuestPriorityStatus.IN_CRISIS_POINT;
    specialNeeds = "";
    updatedAt = undefined;
    verificationStatus = GuestStatus.CREATED;
}

class GuestFormFields {
    static CHILDREN = "children";
    static DESIRED_DESTINATION = "desiredDestination";
    static DURATION_OF_STAY = "durationOfStay";
    static EMAIL = "email";
    static FINANCIAL_STATUS = "financialStatus";
    static FOOD_ALLERGIES = "foodAllergies";
    static FULL_NAME = "fullName";
    static GLUTEN_FREE_DIET = "glutenFreeDiet";
    static ID = "id";
    static LACTOSE_FREE_DIET = "lactoseFreeDiet";
    static MEAT_FREE_DIET = "meatFreeDiet";
    static PEOPLE_FEMALE_COUNT = "peopleFemaleCount";
    static PEOPLE_MALE_COUNT = "peopleMaleCount";
    static PEOPLE_TOTAL_COUNT = "peopleTotalCount";
    static PETS_DESCRIPTION = "petsDescription";
    static PETS_PRESENT = "petsPresent";
    static PHONE_NUMBER = "phoneNumber";
    static PRIORITY_DATE = "priorityDate";
    static PRIORITY_STATUS = "priorityStatus";
    static SPECIAL_NEEDS = "specialNeeds";
    static VERIFICATION_STATUS = "verificationStatus";

    // children array object
    static CHILD_AGE = "age";

    /**
     * Transform object from model to form values.
     * @param {Guest} guest
     * @return {Object}
     */
    modelToForm(guest) {
        if (!(guest instanceof Guest)) {
            return undefined;
        }

        const fieldNames = Object.values(GuestFormFields);
        const formValues = pick(guest, fieldNames);

        if (guest.id) {
            return formValues;
        }

        const createFormValues = {};

        return { ...formValues, ...createFormValues };
    }

    formToModel(formValues) {
        const guest = new Guest();
        return merge(guest, formValues);
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

        return isEqual(prev, next);
    }
}

const guestFormFields = new GuestFormFields();

export { guestFormFields, GuestFormFields };
