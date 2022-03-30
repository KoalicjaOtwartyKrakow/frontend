import { FormikContextType, getIn } from "formik";
import HttpStatus from "http-status-codes";
import { ApiErrors, ApiErrorStatus, ApiErrorTypes } from "services/Api/types";
import { ApiValidationStatus } from "models/ApiValidationStatus";
import { plainToClass } from "serializers/Serializer";

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
        // FIXME: this could be simplified if initialStatus is set correctly
        const backendErrors = status?.errors?.validationErrors?.[name] || [];
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
        const formikStatus: ApiValidationStatus = {
            errors: {},
        };
        return formikStatus;
    };

    static getStatusFromApi = function (apiErrors?: ApiErrors, transformClassName?: any): any {
        const formikCleanStatus = FormikApiErrors.getInitialStatus();

        if (apiErrors === undefined || apiErrors.status === undefined) {
            return formikCleanStatus;
        }

        const { status, errors } = apiErrors;

        if (status.type === ApiErrorTypes.SERVER && status.code === HttpStatus.UNPROCESSABLE_ENTITY) {
            debugger;
            if (!transformClassName) {
                console.warn("[FormikApiErrors.getStatusFromApi]: please provide field errors transformation class");
            }
            const formikStatus: ApiValidationStatus = {
                errors: {
                    validationErrors: transformClassName
                        ? (plainToClass(
                              transformClassName,
                              errors?.validationErrors || {}
                          ) as typeof transformClassName)
                        : errors.validationErrors,
                },
            };
            return formikStatus;
        }

        return formikCleanStatus;
    };
}

export { FormikApiErrors };
