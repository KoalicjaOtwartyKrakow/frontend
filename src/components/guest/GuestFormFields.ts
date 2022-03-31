import { isEqual, merge, pick, omit } from "lodash-es";
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import { getFormattedDate } from "shared/datetime";
import Guest from "models/Guest";
import { ApiErrors } from "services/Api/types";
import DurationSerializer from "serializers/DurationSerializer";
import moment from "moment";
import GuestFieldErrors from "models/GuestFieldErrors";
import { GuestFormField } from "components/guest/GuestFormTypes";

class GuestFormFields {
    static ACCOMMODATION_UNIT = "accommodationUnit";
    static CHILDREN = "children";
    static CLAIMED_AT = "claimedAt";
    static CLAIMED_BY = "claimedBy";
    static CLAIMED_BY_USER_ID = "claimedById";
    static DESIRED_DESTINATION = "desiredDestination";
    static DOCUMENT_NUMBER = "documentNumber";
    static DURATION_OF_STAY_VALUE = "durationOfStayValue";
    static DURATION_OF_STAY_UNIT = "durationOfStayUnit";
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
    static PRIORITY_DATE = GuestFormField.PRIORITY_DATE;
    static PRIORITY_STATUS = "priorityStatus";
    static SPECIAL_NEEDS = "specialNeeds";
    static STAFF_COMMENTS = "staffComments";
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

        const formValues = { ...pick(guest, fieldNames), ...this.createDurationOfStaySubfields(guest.durationOfStay) };

        formValues.priorityDate = getFormattedDate(formValues.priorityDate);

        const createFormValues = {};

        return { ...formValues, ...createFormValues };
    }

    private createDurationOfStaySubfields(duration: moment.Duration) {
        const durationSerializer = new DurationSerializer();
        const durationOfStay = durationSerializer.getValueAndUnitFromDuration(duration, ["months", "weeks", "days"]);
        return {
            [GuestFormFields.DURATION_OF_STAY_UNIT]: durationOfStay.unit,
            [GuestFormFields.DURATION_OF_STAY_VALUE]: durationOfStay.value,
        };
    }

    formToModel(formValues: any) {
        const guest = new Guest();
        const model: Guest = merge(
            guest,
            omit(formValues, [GuestFormFields.DURATION_OF_STAY_VALUE, GuestFormFields.DURATION_OF_STAY_UNIT])
        );
        model.accommodationUnitId = model.accommodationUnit?.id;
        model.durationOfStay = moment.duration(
            formValues[GuestFormFields.DURATION_OF_STAY_VALUE],
            formValues[GuestFormFields.DURATION_OF_STAY_UNIT]
        );
        return model;
    }

    getInitialStatus() {
        return FormikApiErrors.getInitialStatus();
    }

    getStatusFromApi(apiErrors: ApiErrors) {
        return FormikApiErrors.getStatusFromApi(apiErrors, GuestFieldErrors);
    }

    areValuesEqual(prevValues: any, nextValues: any) {
        const prev = prevValues || {};
        const next = nextValues || {};

        return isEqual(prev, next);
    }
}

const guestFormFields = new GuestFormFields();

export { guestFormFields, GuestFormFields };
