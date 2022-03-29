import { isEqual, merge, pick } from "lodash";

import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";

import { getFormattedDate } from "shared/datetime";

import Guest from "models/Guest";
import { ApiErrors } from "services/Api/types";

class GuestFormFields {
    static ACCOMMODATION_UNIT = "accommodationUnit";
    static CHILDREN = "children";
    static CLAIMED_AT = "claimedAt";
    static CLAIMED_BY = "claimedBy";
    static CLAIMED_BY_USER_ID = "claimedById";
    static DESIRED_DESTINATION = "desiredDestination";
    static DOCUMENT_NUMBER = "documentNumber";
    static DURATION_OF_STAY = "durationOfStay";
    static EMAIL = "email";
    static FINANCIAL_STATUS = "financialStatus";
    static FOOD_ALLERGIES = "foodAllergies";
    static FULL_NAME = "fullName";
    static GLUTEN_FREE_DIET = "glutenFreeDiet";
    static ID = "id";
    static IS_AGENT = "isAgent";
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

    /**
     * Transform object from model to form values.
     * @param {Guest} guest
     * @return {Object}
     */
    modelToForm(guest: any) {
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

    /**
     *
     * @param formValues
     */
    formToModel(formValues: any) {
        const guest = new Guest();
        /**
         * @type {Guest}
         */
        const model = merge(guest, formValues);
        model.accommodationUnitId = model.accommodationUnit?.id;
        return model;
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

        return isEqual(prev, next);
    }
}

const guestFormFields = new GuestFormFields();

export { guestFormFields, GuestFormFields };
