import { FormikContextType, getIn } from "formik";
import HttpStatus from "http-status-codes";

import { ApiErrors, ApiErrorStatus, ApiErrorTypes } from "services/Api/types";
import { FormikStatus } from "models/FormikStatus";

/**
 *
 * @param {ApiErrorStatus} status
 * @return {string}
 */
const getErrorMessageFromStatus = function (status: any) {
    const httpStatusCode = status.code;
    switch (httpStatusCode) {
        case HttpStatus.IM_A_TEAPOT:
            return "Unable to connect, network is offline";
        default:
            console.warn("TODO: provide handling for other status codes, broken network connection etc.");
            return "Unhandled API error";
    }
};

class FormikApiErrors {
    static getErrors = function (name: string, formikContext: FormikContextType<any>): string[] {
        const { touched, errors } = formikContext;

        const status: ApiErrors = formikContext.status;

        const fieldTouched = getIn(touched, name);
        const backendErrors = status?.errors?.[name] || [];
        // FIXME: TS2322: Type 'string | string[] | FormikErrors<any> | FormikErrors<any>[]' is not assignable to type 'string'. Type 'string[]' is not assignable to type 'string'.
        // Probably <ErrorMessage /> would be a better choice overall
        const frontendError = errors[name] as string;

        if (frontendError && fieldTouched) {
            return [frontendError];
        }

        if (backendErrors && !fieldTouched) {
            return backendErrors;
        }

        return [];
    };

    static getInitialStatus = function () {
        const formikStatus: FormikStatus = {};
        return formikStatus;
    };

    static getStatusFromApi = function (apiErrors?: ApiErrors) {
        if (apiErrors === undefined || apiErrors.status === undefined) {
            const formikStatus: FormikStatus = {};
            return formikStatus;
        }

        const { status, errors } = apiErrors;

        if (status.type === ApiErrorTypes.SERVER && status.code === HttpStatus.BAD_REQUEST) {
            const formikStatus: FormikStatus = {
                fieldErrors: errors,
            };
            return formikStatus;
        }

        // const customErrorMessage = getErrorMessageFromStatus(status);
        // FIXME this is probably screwed up
        const formikStatus: FormikStatus = {
            nonFieldErrors: errors["non_field_errors"],
        };

        return formikStatus;
    };
}

export { FormikApiErrors };
