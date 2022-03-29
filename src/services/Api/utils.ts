import HttpStatus from "http-status-codes";
import { get } from "lodash";
import { compile } from "path-to-regexp";
import camelcaseKeys from "camelcase-keys";

import { plainToClass } from "serializers/Serializer";
import axios, { AxiosError } from "axios";
import type { ApiErrors, ApiErrorStatus } from "services/Api/types";
import { ApiErrorCodesClient, ApiErrorCodesMisc, ApiErrorTypes } from "services/Api/types";

const getApiErrorStatus = (error: AxiosError): ApiErrorStatus => {
    const response = error.response;
    const request = error.request;

    const status: ApiErrorStatus = {
        code: ApiErrorCodesMisc.UNKNOWN,
        type: ApiErrorTypes.UNKNOWN,
    };

    if (response) {
        status.type = ApiErrorTypes.SERVER;
        status.code = get(response, "status", HttpStatus.IM_A_TEAPOT);
        return status;
    }

    if (request) {
        status.type = ApiErrorTypes.CLIENT;

        // Workaround: Axios has some strange way to represent client timeout,
        // returning ECONNABORTED instead
        const connectionAborted = error.code === ApiErrorCodesClient.ECONNABORTED;
        const messageHasTimeout = error.message.indexOf("timeout") !== -1;

        // Workaround: Connection was made, but no meaningful response was received
        const errorStatusJson: any = error?.toJSON();
        const errorStatus = errorStatusJson.status;
        const messageHasNetworkError = errorStatus === null;

        if (connectionAborted && messageHasTimeout) {
            status.code = ApiErrorCodesClient.ETIMEDOUT;
        } else if (messageHasNetworkError) {
            status.code = ApiErrorCodesClient.ECONNREFUSED;
        } else {
            status.code = errorStatus;
        }
        return status;
    }

    return status;
};

export const getErrorsFromApi = (error?: AxiosError | null | unknown): ApiErrors => {
    if (!error || !axios.isAxiosError(error)) {
        return undefined;
    }
    const { response } = error;
    const errors = camelcaseKeys(get(response, "data", {}));
    const status = getApiErrorStatus(error);
    return {
        errors,
        status,
    };
};

export const getPath = (url: any, options?: any) => {
    const toPath = compile(url, { encode: encodeURIComponent });
    return toPath(options);
};

export const transformObjectResponse = (modelClass: any) => (data: any) => {
    try {
        const parsed = JSON.parse(data);
        return parsed && plainToClass(modelClass, parsed);
    } catch (error) {
        console.error("[transformResponse] Retrieved malformed JSON response:", { data, modelClass });
        return undefined;
    }
};

export const emptyArray = [];

export const transformArrayResponse = (modelClass: any) => (data: any) => {
    try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed.map((item) => plainToClass(modelClass, item)) : emptyArray;
    } catch (error) {
        console.error("[transformArrayResponse] Retrieved malformed JSON response:", { data, modelClass });
        return emptyArray;
    }
};
