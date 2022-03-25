// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
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

export const baseURL = process.env.REACT_APP_KOKON_API_URL;
export const timeout = Number(process.env.REACT_APP_KOKON_API_TIMEOUT);

export class ApiPaths {
    static ACCOMMODATION = "/accommodation";
    static ACCOMMODATION_BY_ID = ApiPaths.ACCOMMODATION + "/:accommodationId";
    static ACCOMMODATION_BY_ID_ADD_GUEST = ApiPaths.ACCOMMODATION_BY_ID + "/guest/:guestId";
    static GUEST = "/guest";
    static GUEST_BY_ID = ApiPaths.GUEST + "/:guestId";
    static HOST = "/host";
    static HOST_BY_ID = ApiPaths.HOST + "/:hostId";
    static USER = "/user";
    static USER_BY_ID = ApiPaths.USER + "/:userId";
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
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        this[API_ERRORS] = apiErrors;
    }
}
