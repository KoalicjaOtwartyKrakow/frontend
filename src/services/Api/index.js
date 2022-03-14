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

export const fetchAccommodation = async (
    id,
    onSuccess,
    onFailure,
    onFinish
) => {
    console.log("[ACCOMMODATION] Fetch in progress");

    await sleep(DEBUG_API_FETCH_DELAY);

    const url = utils.getPath(constants.Paths.ACCOMMODATION) + "/" + id;

    if (constants.useMocks) {
        return Promise.resolve({
            data: mockedAccommodations.find((mock) => mock.id === id),
        })
            .then(onSuccess)
            .finally(onFinish);
    }
    return axios.get(url).then(onSuccess).catch(onFailure).finally(onFinish);
};

export const fetchAccommodations = async (
    before,
    onSuccess,
    onFailure,
    onFinish
) => {
    before && before();
    console.log("[ACCOMMODATIONS] Fetch in progress");

    await sleep(DEBUG_API_FETCH_DELAY);

    const url = utils.getPath(constants.Paths.ACCOMMODATION);

    const promise = constants.useMocks
        ? Promise.resolve({ data: mockedAccommodations })
        : axios.get(url);

    return promise.then(onSuccess).catch(onFailure).finally(onFinish);
};

export const fetchGuests = async (before, onSuccess, onFailure, onFinish) => {
    console.log("[GUEST] Fetch in progress");
    before && before();

    await sleep(DEBUG_API_FETCH_DELAY);

    const url = utils.getPath(constants.Paths.GUEST);

    const promise = constants.useMocks
        ? Promise.resolve({ data: mockedGuests })
        : axios.get(url);

    return promise.then(onSuccess).catch(onFailure).finally(onFinish);
};

export const fetchHosts = async (before, onSuccess, onFailure, onFinish) => {
    console.log("[HOSTS] Fetch in progress");
    before && before();

    await sleep(DEBUG_API_FETCH_DELAY);

    const url = utils.getPath(constants.Paths.HOST);

    const promise = constants.useMocks
        ? Promise.resolve({ data: mockedHosts })
        : axios.get(url);

    return promise.then(onSuccess).catch(onFailure).finally(onFinish);
};

export const updateHost = (data, before, onSuccess, onFailure, onFinish) => {
    console.log("[HOSTS] update fired");
    before && before();

    const url = utils.getPath(constants.Paths.HOST);

    return axios
        .put(url, data)
        .then(onSuccess)
        .catch(onFailure)
        .finally(onFinish);
};
