import camelCase from "lodash-es/camelCase";

export const API_ERRORS = "apiErrors";
export const API_NON_FIELD_ERRORS = camelCase("non_field_errors");

export const ApiErrorTypes = Object.freeze({
    CLIENT: "client",
    SERVER: "server",
    UNKNOWN: "unknown",
});

export const ApiClientStatus = Object.freeze({
    EAI_AGAIN: "EAI_AGAIN",
    ECONNABORTED: "ECONNABORTED",
    ECONNREFUSED: "ECONNREFUSED",
    ECONNRESET: "ECONNRESET",
    EHOSTUNREACH: "EHOSTUNREACH",
    ENOTFOUND: "ENOTFOUND",
    ETIMEDOUT: "ETIMEDOUT",
});

export const ApiGenericStatus = Object.freeze({
    UNKNOWN: "unknown",
});

export const baseUrl = process.env.REACT_APP_KOKON_API_URL;
export const timeout = Number(process.env.REACT_APP_KOKON_API_TIMEOUT);
export const useMocks = process.env.REACT_APP_KOKON_API_USE_MOCKS === "true";

export class ApiPaths {
    static ACCOMMODATION = "/accommodation";
    static ACCOMMODATION_BY_ID = ApiPaths.ACCOMMODATION + "/:accommodationId";
    static ACCOMMODATION_BY_ID_ADD_GUEST = ApiPaths.ACCOMMODATION_BY_ID + "/guest/:guestId";
    static GUEST = "/guest";
    static GUEST_BY_ID = ApiPaths.GUEST + "/:guestId";
    static HOST = "/host";
    static HOST_BY_ID = ApiPaths.HOST + "/:hostId";
}

export class ApiErrorStatus {
    /**
     * @type {symbol|number}
     */
    code = ApiGenericStatus.UNKNOWN;
    type = ApiErrorTypes.UNKNOWN;
}

export class ApiErrors {
    constructor(apiErrors = {}) {
        this[API_ERRORS] = apiErrors;
    }
}
