import axios from "axios";

import { sleep } from "shared/utils";
import * as constants from "./constants";
import * as utils from "./utils";
import { DEBUG_API_FETCH_DELAY } from "shared/debug";

import { generateAllMocks } from "mocks";
import { classToPlain } from "serializers/Serializer";

let mockedAccommodations = [];
let mockedGuests = [];
let mockedHosts = [];

if (constants.useMocks) {
    const allMocks = generateAllMocks();
    mockedAccommodations = allMocks.mockedAccommodations.map((item) =>
        classToPlain(item)
    );
    mockedGuests = allMocks.mockedGuests.map((item) => classToPlain(item));
    mockedHosts = allMocks.mockedHosts.map((item) => classToPlain(item));
}

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
        ? Promise.resolve({ data: mockedAccommodations })
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
        ? Promise.resolve({ data: mockedGuests })
        : axios.get(url);

    return promise.then(onSuccess).catch(onFailure).finally(onFinish);
};

export const fetchHosts = async (before, onSuccess, onFailure, onFinish) => {
    console.log("[HOSTS] Fetch in progress");
    before && before();

    await sleep(DEBUG_API_FETCH_DELAY);

    const url = utils.getPath(constants.Paths.HOSTS);

    const promise = constants.useMocks
        ? Promise.resolve({ data: mockedHosts })
        : axios.get(url);

    return promise.then(onSuccess).catch(onFailure).finally(onFinish);
};
