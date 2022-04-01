import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import Host from "models/Host";
import { getFormattedDate } from "shared/datetime";
import { isEqual, merge, pick } from "lodash";
import { ApiErrors } from "services/Api/types";

class HostFormFields {
    static CALL_AFTER = "callAfter";
    static CALL_BEFORE = "callBefore";
    static COMMENTS = "comments";
    static EMAIL = "email";
    static FULL_NAME = "fullName";
    static ID = "id";
    static LANGUAGES_SPOKEN = "languagesSpoken";
    static PHONE_NUMBER = "phoneNumber";
    static STATUS = "status";
    static SYSTEM_COMMENTS = "systemComments";

    /**
     * Transform object from model to form values.
     * @param {Host} host
     * @return {Object}
     */
    modelToForm(host: any) {
        if (!(host instanceof Host)) {
            return undefined;
        }

        const fieldNames = Object.values(HostFormFields);
        const formValues = pick(host, fieldNames);

        if (host.id) {
            return formValues;
        }

        const createFormValues = {};

        return { ...formValues, ...createFormValues };
    }

    formToModel(formValues: any) {
        const host = new Host();
        return merge(host, formValues);
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

const hostFormFields = new HostFormFields();

export { hostFormFields, HostFormFields };
