// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormikAp... Remove this comment to see the full error message
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Host' or its correspond... Remove this comment to see the full error message
import Host from "models/Host";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'shared/datetime' or its corres... Remove this comment to see the full error message
import { getFormattedDate } from "shared/datetime";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { isEqual, merge, pick } from "lodash-es";

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

const hostFormFields = new HostFormFields();

export { hostFormFields, HostFormFields };
