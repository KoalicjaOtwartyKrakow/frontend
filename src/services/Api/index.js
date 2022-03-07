import axios from "axios";

import mockAccommodations from "models/mocks/accommodations";
import { sleep } from "shared/utils";
import * as constants from "./constants";
import * as utils from "./utils";
import { DEBUG_API_FETCH_DELAY } from "shared/debug";

export const fetchAccommodations = async (
    before,
    onSuccess,
    onFailure,
    onFinish
) => {
    console.log("[ACCOMMODATIONS] Fetch in progress");
    before && before();

    await sleep(DEBUG_API_FETCH_DELAY);

    const url = utils.getPath(constants.Paths.ACCOMMODATIONS);

    const promise = constants.useMocks
        ? Promise.resolve({ data: mockAccommodations })
        : axios.get(url);

    return promise.then(onSuccess).catch(onFailure).finally(onFinish);
};

export const updateAccommodation = (
    data,
    before,
    onSuccess,
    onFailure,
    onFinish
) => {
    console.log("[ACCOMMODATIONS] update fired");
    before && before();

    const url = utils.getPath(constants.Paths.ACCOMMODATIONS);

    return axios
        .put(url, data)
        .then(onSuccess)
        .catch(onFailure)
        .finally(onFinish);
};

export const fetchGuests = async (before, onSuccess, onFailure, onFinish) => {
    console.log("[GUESTS] Fetch in progress");
    before && before();

    await sleep(DEBUG_API_FETCH_DELAY);

    const url = utils.getPath(constants.Paths.GUESTS);

    const promise = constants.useMocks
        ? Promise.resolve({ data: [] })
        : axios.get(url);

    return promise.then(onSuccess).catch(onFailure).finally(onFinish);
};
