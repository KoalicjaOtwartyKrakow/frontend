import axios from "axios";

import mockApartments from "models/mocks/apartments";
import { sleep } from "shared/utils";
import * as constants from "./constants";
import * as utils from "./utils";

export const fetchApartments = (before, onSuccess, onFailure, onFinish) => {
    console.log("[APARTMENTS] Fetch in progress");
    before && before();

    const url = utils.getPath(constants.Paths.APARTMENTS);

    const promise = constants.useMocks
        ? Promise.resolve({ data: mockApartments })
        : axios.get(url);

    return promise.then(onSuccess).catch(onFailure).finally(onFinish);
};

export async function fetchApartmentsDelayed(
    before,
    onSuccess,
    onFailure,
    onFinish
) {
    console.log("[APARTMENTS] Fetch (delayed) fired");
    before && before();

    await sleep(constants.APARTMENTS_FETCH_DELAY);

    return fetchApartments(null, onSuccess, onFailure, onFinish);
}

export const updateApartments = (data, onSuccess, onFailure) => {};
