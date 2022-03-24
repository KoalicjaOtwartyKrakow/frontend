import Host from "models/Host";
import { availableLanguages, chance, getMockedHoursAndMinutes, mockAdapter } from "mocks/base";
import { HostStatus } from "models/constants/HostStatus";
import { ApiPaths } from "services/Api/constants";
import { classToPlain, plainToClass } from "serializers/Serializer";
import { match, pathToRegexp } from "path-to-regexp";
import moment from "moment-es6";

const mockHost = () => {
    const host = new Host();
    host.createdAt = moment();
    host.id = chance.guid({ version: 4 });
    host.uuid = chance.guid({ version: 5 });
    host.fullName = chance.name();
    host.email = chance.email();
    host.phoneNumber = chance.phone();
    host.callAfter = getMockedHoursAndMinutes();
    host.callBefore = getMockedHoursAndMinutes();
    host.status = chance.pickone(Object.values(HostStatus));
    host.comments = chance.paragraph();
    host.languagesSpoken = chance.pickset(
        availableLanguages,
        chance.integer({ min: 0, max: availableLanguages.length })
    );
    return host;
};

const mockHostResponses = ({ mockedHosts }) => {
    mockAdapter.onGet(ApiPaths.HOST).reply((config) => {
        const { url } = config;
        const plainHosts = mockedHosts.map((host) => classToPlain(host));

        console.log(`[useGetHost] Mocked response for ${url}: `, plainHosts);
        return [200, JSON.stringify(plainHosts)];
    });

    mockAdapter.onGet(pathToRegexp(ApiPaths.HOST_BY_ID)).reply((config) => {
        const { url } = config;
        const matchedPath = match(ApiPaths.HOST_BY_ID)(url);
        const {
            params: { hostId },
        } = matchedPath;

        const host = mockedHosts.find((mock) => mock.id === hostId);
        const plain = classToPlain(host);

        console.log(`[useGetHost] Mocked response for ${url}: `, host);
        return [200, JSON.stringify(plain)];
    });

    mockAdapter.onPut(pathToRegexp(ApiPaths.HOST_BY_ID)).reply((config) => {
        const { url, data } = config;
        const matchedPath = match(ApiPaths.HOST_BY_ID)(url);
        const {
            params: { hostId },
        } = matchedPath;
        const json = JSON.parse(data);

        const updatedHost = plainToClass(Host, json);
        updatedHost.id = hostId;

        const hostIndex = mockedHosts.findIndex((mock) => mock.id === hostId);
        if (hostIndex === -1) {
            throw RangeError("[useUpdateHost] Tried to PUT host, but host with such ID is not present in mocks");
        }

        mockedHosts[hostIndex] = updatedHost;

        const plain = data;

        console.log(`[useUpdateHost] Mocked response for ${url}: `, updatedHost);
        return [200, JSON.stringify(plain)];
    });

    mockAdapter.onPost(pathToRegexp(ApiPaths.HOST)).reply((config) => {
        const { url, data } = config;
        const json = JSON.parse(data);
        /**
         * @type {Host}
         */
        const createdHost = plainToClass(Host, json);
        createdHost.id = chance.guid({ version: 4 });
        createdHost.createdAt = moment();
        createdHost.updatedAt = moment();

        mockedHosts.unshift(createdHost);

        const plain = classToPlain(createdHost);

        console.log(`[useUpdateHost] Mocked response for ${url}: `, createdHost);

        return [200, JSON.stringify(plain)];
    });
};

export { mockHost, mockHostResponses };
