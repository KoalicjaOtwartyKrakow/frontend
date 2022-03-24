import moment from "moment-es6";
import { match, pathToRegexp } from "path-to-regexp";
import { chance, getRandomItem } from "mocks/base";
import Accommodation from "models/Accommodation";
import { AccommodationStatus } from "models/constants/AccommodationStatus";
import { polishVoivodeships } from "models/constants/Address";
import GuestAccommodation from "models/GuestAccommodation";
import { classToPlain, plainToClass } from "serializers/Serializer";
import { ApiPaths } from "services/Api/constants";

const mockAccommodation = (mockedGuests, mockedHosts) => {
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

const mockAccommodationResponses = (mockAdapter, { mockedAccommodations, mockedGuests }) => {
    mockAdapter.onGet(pathToRegexp(ApiPaths.ACCOMMODATION)).reply((config) => {
        const { url } = config;
        const plainAccommodations = mockedAccommodations.map((accommodation) => classToPlain(accommodation));

        console.log(`[useGetAccommodation] Mocked response for ${url}: `);
        return [200, JSON.stringify(plainAccommodations)];
    });

    mockAdapter.onGet(pathToRegexp(ApiPaths.ACCOMMODATION_BY_ID)).reply((config) => {
        const { url } = config;
        const matchedPath = match(ApiPaths.ACCOMMODATION_BY_ID)(url);
        const {
            params: { accommodationId },
        } = matchedPath;

        const accommodation = mockedAccommodations.find((mock) => mock.id === accommodationId);
        const plain = classToPlain(accommodation);

        console.log(`[useGetAccommodation] Mocked response for ${url}: `, accommodation);
        return [200, JSON.stringify(plain)];
    });

    mockAdapter.onPut(pathToRegexp(ApiPaths.ACCOMMODATION_BY_ID)).reply((config) => {
        const { url, data } = config;
        const json = JSON.parse(data);
        const updatedAccommodation = plainToClass(Accommodation, json);

        const accommodationIndex = mockedAccommodations.findIndex((mock) => mock.id === updatedAccommodation.id);

        mockedAccommodations[accommodationIndex] = updatedAccommodation;

        const plain = data;

        console.log(`[useUpdateAccommodation] Mocked response for ${url}: `, updatedAccommodation);
        return [200, JSON.stringify(plain)];
    });

    mockAdapter.onPost(pathToRegexp(ApiPaths.ACCOMMODATION)).reply((config) => {
        const { url, data } = config;
        const json = JSON.parse(data);
        /**
         * @type {Accommodation}
         */
        const createdAccommodation = plainToClass(Accommodation, json);
        createdAccommodation.id = chance.guid({ version: 5 });
        createdAccommodation.createdAt = moment();
        createdAccommodation.updatedAt = moment();

        mockedAccommodations.unshift(createdAccommodation);

        const plain = classToPlain(createdAccommodation);

        console.log(`[useUpdateAccommodation] Mocked response for ${url}: `, createdAccommodation);

        return [200, JSON.stringify(plain)];
    });

    mockAdapter.onPost(pathToRegexp(ApiPaths.ACCOMMODATION_BY_ID_ADD_GUEST)).reply((config) => {
        const { url } = config;
        const matchedPath = match(ApiPaths.ACCOMMODATION_BY_ID_ADD_GUEST)(url);
        const {
            params: { accommodationId, guestId },
        } = matchedPath;

        const accommodation = mockedAccommodations.find((mock) => mock.id === accommodationId);

        const guest = mockedGuests.find((mock) => mock.id === guestId);

        if (!accommodation.guests.some((item) => item.id)) {
            accommodation.guests.unshift(guest);
            accommodation.updatedAt = moment();
        }

        guest.accommodation = plainToClass(GuestAccommodation, classToPlain(accommodation));

        const plain = classToPlain(accommodation);

        return [200, JSON.stringify(plain)];
    });
};

export { mockAccommodation, mockAccommodationResponses };
