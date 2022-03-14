import pick from "lodash-es/pick";
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import Host from "models/Host";

class HostFormFields {
    static FULL_NAME = "fullName";
    static EMAIL = "email";
    static PHONE_NUMBER = "phoneNumber";
    static CALL_AFTER = "callAfter";
    static CALL_BEFORE = "callBefore";
    static COMMENTS = "comments";
    static LANGUAGES_SPOKEN = "languagesSpoken";
    static STATUS = "status";
    static ID = "id";
    // TODO: to be aligned with API later
    static LGBT_FRIENDLY = "lgbtFriendly";
    static ACCEPTS_FROM_ANY_COUNTRY = "acceptsFromAnyCountry";
    static ACCEPTS_GUEST_WITH_DISABILITIES = "acceptsGuestWithDisabilities";

    static getInitialValues(host) {
        const fieldNames = Object.values(HostFormFields);
        const initialValues = pick(host, fieldNames);

        return initialValues;
    }

    getInitialStatus() {
        return FormikApiErrors.getInitialStatus();
    }

    getStatusFromApi(apiErrors, status) {
        return FormikApiErrors.getStatusFromApi(apiErrors, status);
    }

    toModel(values) {
        const host = new Host();
        return Object.assign(host, values);
    }
}

const hostFormFields = new HostFormFields();

export { hostFormFields, HostFormFields };
