import { isEqual, merge, pick, omit } from "lodash-es";
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import { getFormattedDate } from "shared/datetime";
import Guest from "models/Guest";
import { DurationOfStaySubfields } from "components/guest/DurationOfStaySubfields";
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
    static DIMENSIONLESS_DURATION_OF_STAY = "dimensionlessDurationOfStay";
    static DIMENSIONLESS_DURATION_OF_STAY_VALUE = "dimensionlessDurationOfStay";
    static DURATION_OF_STAY_UNIT = "timeUnit";
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
        formValues.priorityDate = getFormattedDate(formValues.priorityDate);


        const createFormValues = {
            ...this.createDurationOfStaySubfields(guest.durationOfStay),
        };
        return { ...formValues, ...createFormValues };
    }

    private createDurationOfStaySubfields(durationOfStay: string) {
        const subfields = DurationOfStaySubfields.fromJoinedField(durationOfStay);
        return {
            [GuestFormFields.DURATION_OF_STAY_UNIT]: subfields.unit,
            [GuestFormFields.DIMENSIONLESS_DURATION_OF_STAY]: subfields.dimensionlessValue,
        };
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
        const model = merge(
            guest,
            omit(formValues, [GuestFormFields.DIMENSIONLESS_DURATION_OF_STAY, GuestFormFields.DURATION_OF_STAY_UNIT])
        );
        model.accommodationUnitId = model.accommodationUnit?.id;
        model.durationOfStay = new DurationOfStaySubfields(
            formValues[GuestFormFields.DIMENSIONLESS_DURATION_OF_STAY],
            formValues[GuestFormFields.DURATION_OF_STAY_UNIT]
        ).toJoinedField();
        return model;
    }

    getInitialStatus() {
        return FormikApiErrors.getInitialStatus();
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
