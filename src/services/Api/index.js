import axios from "axios";

import mockAccommodations from "models/mocks/accommodations";
import { sleep } from "shared/utils";
import * as constants from "./constants";
import * as utils from "./utils";

export const fetchAccommodations = (before, onSuccess, onFailure, onFinish) => {
    console.log("[ACCOMMODATIONS] Fetch in progress");
    before && before();

    const url = utils.getPath(constants.Paths.ACCOMMODATIONS);

    const promise = constants.useMocks
        ? Promise.resolve({ data: mockAccommodations })
        : axios.get(url);

    return promise.then(onSuccess).catch(onFailure).finally(onFinish);
};

export async function fetchAccommodationsDelayed(
    before,
    onSuccess,
    onFailure,
    onFinish
) {
    console.log("[ACCOMMODATIONS] Fetch (delayed) fired");
    before && before();

    await sleep(constants.ACCOMMODATIONS_FETCH_DELAY);

    return fetchAccommodations(null, onSuccess, onFailure, onFinish);
}

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
