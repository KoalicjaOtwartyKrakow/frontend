import HttpStatus from "http-status-codes";
import get from "lodash-es/get";
import { compile } from "path-to-regexp";
import camelcaseKeys from "camelcase-keys";

import { ApiClientStatus, ApiErrorStatus, ApiErrorTypes } from "./constants";

const _getStatus = (error) => {
    /**
     * @type {AxiosResponse}
     */
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
        if (connectionAborted && messageHasTimeout) {
            status.code = ApiClientStatus.ETIMEDOUT;
        } else {
            status.code = HttpStatus.IM_A_TEAPOT;
        }
        return status;
    }

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
