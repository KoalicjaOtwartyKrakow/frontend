import type { ApiValidationStatus } from "models/ApiValidationStatus";

const ApiErrorTypes = {
    CLIENT: "client",
    SERVER: "server",
    UNKNOWN: "unknown",
} as const;

const ApiErrorCodesClient = {
    EAI_AGAIN: "EAI_AGAIN",
    ECONNABORTED: "ECONNABORTED",
    ECONNREFUSED: "ECONNREFUSED",
    ECONNRESET: "ECONNRESET",
    EHOSTUNREACH: "EHOSTUNREACH",
    ENOTFOUND: "ENOTFOUND",
    ETIMEDOUT: "ETIMEDOUT",
} as const;

const ApiErrorCodesMisc = {
    UNKNOWN: "UNKNOWN",
} as const;

type ApiErrorType = typeof ApiErrorTypes[keyof typeof ApiErrorTypes];
type ApiErrorCodeClient = typeof ApiErrorCodesClient[keyof typeof ApiErrorCodesClient];
type ApiErrorCodeMisc = typeof ApiErrorCodesMisc[keyof typeof ApiErrorCodesMisc];

type ApiErrorCode = ApiErrorCodeClient | ApiErrorCodeMisc | number;

type ApiErrorStatus = {
    code: ApiErrorCode;
    type: ApiErrorType;
};

interface ApiErrorsStatus {
    status?: ApiErrorStatus;
}

type ApiErrors = (ApiValidationStatus & ApiErrorsStatus) | undefined;

export type { ApiErrorType, ApiErrorCodeClient, ApiErrorCode, ApiErrorStatus, ApiErrors };

export { ApiErrorTypes, ApiErrorCodesClient, ApiErrorCodesMisc };
