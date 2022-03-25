// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Host' or its correspond... Remove this comment to see the full error message
import Host from "models/Host";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mocks/base' or its correspondi... Remove this comment to see the full error message
import { availableLanguages, chance, getMockedHoursAndMinutes } from "mocks/base";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/constants/HostStatus' o... Remove this comment to see the full error message
import { HostStatus } from "models/constants/HostStatus";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'services/Api/constants' or its... Remove this comment to see the full error message
import { ApiPaths } from "services/Api/constants";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'serializers/Serializer' or its... Remove this comment to see the full error message
import { classToPlain, plainToClass } from "serializers/Serializer";
import { match, pathToRegexp } from "path-to-regexp";
import moment from "moment-es6";

const mockHost = () => {
    const host = new Host();
    // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
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

const mockHostResponses = (mockAdapter: any, { mockedHosts }: any) => {
    mockAdapter.onGet(ApiPaths.HOST).reply((config: any) => {
        const { url } = config;
        const plainHosts = mockedHosts.map((host: any) => classToPlain(host));

        console.log(`[useGetHost] Mocked response for ${url}: `, plainHosts);
        return [200, JSON.stringify(plainHosts)];
    });

    mockAdapter.onGet(pathToRegexp(ApiPaths.HOST_BY_ID)).reply((config: any) => {
        const { url } = config;
        const matchedPath = match(ApiPaths.HOST_BY_ID)(url);
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'params' does not exist on type 'Match<ob... Remove this comment to see the full error message
            params: { hostId },
        } = matchedPath;

        const host = mockedHosts.find((mock: any) => mock.id === hostId);
        const plain = classToPlain(host);

        console.log(`[useGetHost] Mocked response for ${url}: `, host);
        return [200, JSON.stringify(plain)];
    });

    mockAdapter.onPut(pathToRegexp(ApiPaths.HOST_BY_ID)).reply((config: any) => {
        const { url, data } = config;
        const matchedPath = match(ApiPaths.HOST_BY_ID)(url);
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'params' does not exist on type 'Match<ob... Remove this comment to see the full error message
            params: { hostId },
        } = matchedPath;
        const json = JSON.parse(data);

        const updatedHost = plainToClass(Host, json);
        updatedHost.id = hostId;

        const hostIndex = mockedHosts.findIndex((mock: any) => mock.id === hostId);
        if (hostIndex === -1) {
            throw RangeError("[useUpdateHost] Tried to PUT host, but host with such ID is not present in mocks");
        }

        mockedHosts[hostIndex] = updatedHost;

        const plain = data;

        console.log(`[useUpdateHost] Mocked response for ${url}: `, updatedHost);
        return [200, JSON.stringify(plain)];
    });

    mockAdapter.onPost(pathToRegexp(ApiPaths.HOST)).reply((config: any) => {
        const { url, data } = config;
        const json = JSON.parse(data);
        /**
         * @type {Host}
         */
        const createdHost = plainToClass(Host, json);
        createdHost.id = chance.guid({ version: 4 });
        // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
        createdHost.createdAt = moment();
        // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
        createdHost.updatedAt = moment();

        mockedHosts.unshift(createdHost);

        const plain = classToPlain(createdHost);

        console.log(`[useUpdateHost] Mocked response for ${url}: `, createdHost);

        return [200, JSON.stringify(plain)];
    });
};

export { mockHost, mockHostResponses };
