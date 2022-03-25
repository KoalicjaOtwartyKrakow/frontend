import { getIn } from "formik";
import HttpStatus from "http-status-codes";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'services/Api/constants' or its... Remove this comment to see the full error message
import { API_ERRORS, API_NON_FIELD_ERRORS, ApiErrors, ApiErrorTypes } from "services/Api/constants";

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
    static getError = function (name: any, form: any) {
        const { touched, errors, status } = form;
        // console.log(name, errors);

        const fieldTouched = getIn(touched, name);
        const backendError = getIn(status, [API_ERRORS, name]);
        const frontendError = getIn(errors, name);

        if (frontendError && fieldTouched) {
            return frontendError;
        }

        if (backendError && !fieldTouched) {
            return backendError;
        }

        return undefined;
    };

    static getInitialStatus = function () {
        return new ApiErrors();
    };

    /**
     *
     * @param {object} apiErrors
     * @param {ApiErrorStatus} status
     * @return {ApiErrors}
     */
    static getStatusFromApi = function (apiErrors: any, status: any) {
        if (status.type === ApiErrorTypes.SERVER && status.code === HttpStatus.BAD_REQUEST) {
            return new ApiErrors(apiErrors);
        }

        const customErrorMessage = getErrorMessageFromStatus(status);
        const customErrors = {
            [API_NON_FIELD_ERRORS]: [customErrorMessage],
        };

        return new ApiErrors(customErrors);
    };
}

export { FormikApiErrors };
