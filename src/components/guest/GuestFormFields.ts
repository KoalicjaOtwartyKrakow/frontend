// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { isEqual, merge, pick } from "lodash-es";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormikAp... Remove this comment to see the full error message
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'shared/datetime' or its corres... Remove this comment to see the full error message
import { getFormattedDate } from "shared/datetime";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Guest' or its correspon... Remove this comment to see the full error message
import Guest from "models/Guest";

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

        return isEqual(prev, next);
    }
}

const guestFormFields = new GuestFormFields();

export { guestFormFields, GuestFormFields };
