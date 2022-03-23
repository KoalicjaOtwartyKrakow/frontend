import Cookies from "js-cookie";
import HttpStatus from "http-status-codes";
import get from "lodash-es/get";
import { compile } from "path-to-regexp";
import camelcaseKeys from "camelcase-keys";

import { ApiClientStatus, ApiErrorStatus, ApiErrorTypes } from "./constants";
import { plainToClass } from "serializers/Serializer";

const _getStatus = (error) => {
    const response = error.response;
    const request = error.request;

    const status = new ApiErrorStatus();

    if (response) {
        status.type = ApiErrorTypes.SERVER;
        status.code = get(response, "status", HttpStatus.IM_A_TEAPOT);
        return status;
    }

    if (request) {
        status.type = ApiErrorTypes.CLIENT;

        // Workaround: Axios has some strange way to represent client timeout,
        // returning ECONNABORTED instead
        const connectionAborted = error.code === ApiClientStatus.ECONNABORTED;
        const messageHasTimeout = error.message.indexOf("timeout") !== -1;

        // Workaround: Connection was made, but no meaningful response was received
        const errorStatus = error?.toJSON().status;
        const messageHasNetworkError = errorStatus === null;

        if (connectionAborted && messageHasTimeout) {
            status.code = ApiClientStatus.ETIMEDOUT;
        } else if (messageHasNetworkError) {
            status.code = ApiClientStatus.ECONNREFUSED;
        } else {
            status.code = errorStatus;
        }
        return status;
    }

    // This denotes unhandled Axios network error
    status.code = HttpStatus.IM_A_TEAPOT;
    status.type = ApiErrorTypes.UNKNOWN;

    return status;
};

// ECONNABORTED
/**
 *
 * @param {object} error
 * @return {{errors: object, status: ApiErrorStatus}}
 */
export const getErrorsFromApi = (error) => {
    if (!error) {
        return undefined;
    }
    const { response } = error;
    const errors = camelcaseKeys(get(response, "data", {}));
    const status = _getStatus(error);
    return {
        errors,
        status,
    };
};

export const getPath = (url, options) => {
    const toPath = compile(url, { encode: encodeURIComponent });
    return toPath(options);
};

// TODO(mlazowik): create a hook that wraps `useAxios` and adds the auth header.
export const getAuthenticationHeaders = () => {
    // TODO(mlazowik): handle the case where it's expired
    return {
        // Authorization: `Bearer ${Cookies.get("jwt")}`,
    };
};

export const transformObjectResponse = (modelClass) => (data) => {
    try {
        const parsed = JSON.parse(data);
        return parsed && plainToClass(modelClass, parsed);
    } catch (error) {
        console.error("[transformResponse] Retrieved malformed JSON response:", { data, modelClass });
        return undefined;
    }
};

export const transformArrayResponse = (modelClass) => (data) => {
    try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed.map((item) => plainToClass(modelClass, item)) : [];
    } catch (error) {
        console.error("[transformArrayResponse] Retrieved malformed JSON response:", { data, modelClass });
        return [];
    }
};
