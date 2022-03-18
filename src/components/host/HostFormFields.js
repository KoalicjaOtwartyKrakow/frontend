import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import Host from "models/Host";
import { getFormattedDate } from "shared/datetime";
import { isEqual, merge, pick } from "lodash-es";

class HostFormFields {
    static CALL_AFTER = "callAfter";
    static CALL_BEFORE = "callBefore";
    static COMMENTS = "comments";
    static EMAIL = "email";
    static FULL_NAME = "fullName";
    static ID = "id";
    static GUID = "guid";
    static LANGUAGES_SPOKEN = "languagesSpoken";
    static PHONE_NUMBER = "phoneNumber";
    static STATUS = "status";

    /**
     * Transform object from model to form values.
     * @param {Host} host
     * @return {Object}
     */
    modelToForm(host) {
        if (!(host instanceof Host)) {
            return undefined;
        }

        const fieldNames = Object.values(HostFormFields);
        const formValues = pick(host, fieldNames);

        if (host.guid) {
            return formValues;
        }

        const createFormValues = {};

        return { ...formValues, ...createFormValues };
    }

    formToModel(formValues) {
        const host = new Host();
        return merge(host, formValues);
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

const hostFormFields = new HostFormFields();

export { hostFormFields, HostFormFields };
