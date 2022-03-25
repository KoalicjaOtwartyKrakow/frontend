import moment from "moment-es6";
import { match, pathToRegexp } from "path-to-regexp";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mocks/base' or its correspondi... Remove this comment to see the full error message
import { chance, getRandomItem } from "mocks/base";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Accommodation' or its c... Remove this comment to see the full error message
import Accommodation from "models/Accommodation";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/constants/Accommodation... Remove this comment to see the full error message
import { AccommodationStatus } from "models/constants/AccommodationStatus";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/constants/Address' or i... Remove this comment to see the full error message
import { polishVoivodeships } from "models/constants/Address";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/GuestAccommodation' or ... Remove this comment to see the full error message
import GuestAccommodation from "models/GuestAccommodation";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'serializers/Serializer' or its... Remove this comment to see the full error message
import { classToPlain, plainToClass } from "serializers/Serializer";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'services/Api/constants' or its... Remove this comment to see the full error message
import { ApiPaths } from "services/Api/constants";

const mockAccommodation = () => {
    const accommodation = new Accommodation();
    // Id
    accommodation.id = chance.guid({ version: 5 });
    accommodation.uuid = chance.guid({ version: 5 });

    // Vacancies
    accommodation.addressLine = chance.address();
    accommodation.addressVoivodeship = getRandomItem(polishVoivodeships).id;
    accommodation.addressCity = chance.city();
    const zip = chance.zip().split("");
    zip.splice(2, 0, "-");
    accommodation.addressZip = zip.join("");

    // Info
    accommodation.staffComments = chance.paragraph();
    accommodation.ownerComments = chance.paragraph();
    accommodation.status = chance.pickone(Object.values(AccommodationStatus));

    // Vacancies
    accommodation.vacanciesTotal = chance.natural({ min: 1, max: 8 });
    switch (accommodation.status) {
        case AccommodationStatus.CREATED:
            accommodation.vacanciesFree = accommodation.vacanciesTotal;
            break;
        case AccommodationStatus.REJECTED:
            accommodation.vacanciesFree = 0;
            break;
        case AccommodationStatus.VERIFIED:
            accommodation.vacanciesFree = chance.natural({
                min: 0,
                max: accommodation.vacanciesTotal,
            });
            break;
        default:
            break;
    }

    // Pets
    accommodation.petsAllowed = chance.bool();
    accommodation.petsPresent = chance.bool();

    // Accessibility
    accommodation.lgbtFriendly = chance.bool();
    accommodation.disabledPeopleFriendly = chance.bool();
    accommodation.parkingPlaceAvailable = chance.bool();
    accommodation.easyAmbulanceAccess = chance.bool();

    return accommodation;
};

const mockAccommodationResponses = (mockAdapter: any, { mockedAccommodations, mockedGuests }: any) => {
    mockAdapter.onGet(pathToRegexp(ApiPaths.ACCOMMODATION)).reply((config: any) => {
        const { url } = config;
        const plainAccommodations = mockedAccommodations.map((accommodation: any) => classToPlain(accommodation));

        console.log(`[useGetAccommodation] Mocked response for ${url}: `);
        return [200, JSON.stringify(plainAccommodations)];
    });

    mockAdapter.onGet(pathToRegexp(ApiPaths.ACCOMMODATION_BY_ID)).reply((config: any) => {
        const { url } = config;
        const matchedPath = match(ApiPaths.ACCOMMODATION_BY_ID)(url);
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'params' does not exist on type 'Match<ob... Remove this comment to see the full error message
            params: { accommodationId },
        } = matchedPath;

        const accommodation = mockedAccommodations.find((mock: any) => mock.id === accommodationId);
        const plain = classToPlain(accommodation);

        console.log(`[useGetAccommodation] Mocked response for ${url}: `, accommodation);
        return [200, JSON.stringify(plain)];
    });

    mockAdapter.onPut(pathToRegexp(ApiPaths.ACCOMMODATION_BY_ID)).reply((config: any) => {
        const { url, data } = config;
        const json = JSON.parse(data);
        const updatedAccommodation = plainToClass(Accommodation, json);

        const accommodationIndex = mockedAccommodations.findIndex((mock: any) => mock.id === updatedAccommodation.id);

        mockedAccommodations[accommodationIndex] = updatedAccommodation;

        const plain = data;

        console.log(`[useUpdateAccommodation] Mocked response for ${url}: `, updatedAccommodation);
        return [200, JSON.stringify(plain)];
    });

    mockAdapter.onPost(pathToRegexp(ApiPaths.ACCOMMODATION)).reply((config: any) => {
        const { url, data } = config;
        const json = JSON.parse(data);
        /**
         * @type {Accommodation}
         */
        const createdAccommodation = plainToClass(Accommodation, json);
        createdAccommodation.id = chance.guid({ version: 5 });
        // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
        createdAccommodation.createdAt = moment();
        // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
        createdAccommodation.updatedAt = moment();

        mockedAccommodations.unshift(createdAccommodation);

        const plain = classToPlain(createdAccommodation);

        console.log(`[useUpdateAccommodation] Mocked response for ${url}: `, createdAccommodation);

        return [200, JSON.stringify(plain)];
    });

    mockAdapter.onPost(pathToRegexp(ApiPaths.ACCOMMODATION_BY_ID_ADD_GUEST)).reply((config: any) => {
        const { url } = config;
        const matchedPath = match(ApiPaths.ACCOMMODATION_BY_ID_ADD_GUEST)(url);
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'params' does not exist on type 'Match<ob... Remove this comment to see the full error message
            params: { accommodationId, guestId },
        } = matchedPath;

        const accommodation = mockedAccommodations.find((mock: any) => mock.id === accommodationId);

        const guest = mockedGuests.find((mock: any) => mock.id === guestId);

        if (!accommodation.guests.some((item: any) => item.id)) {
            accommodation.guests.unshift(guest);
            // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
            accommodation.updatedAt = moment();
        }

        guest.accommodation = plainToClass(GuestAccommodation, classToPlain(accommodation));

        const plain = classToPlain(accommodation);

        return [200, JSON.stringify(plain)];
    });
};

export { mockAccommodation, mockAccommodationResponses };
