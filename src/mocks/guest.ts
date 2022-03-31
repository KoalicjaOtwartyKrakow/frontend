import Guest from "models/Guest";
import { HostStatus } from "models/constants/HostStatus";
import moment from "moment";
import { GuestPriorityStatus } from "models/constants/GuestPriorityStatus";
import { chance } from "mocks/base";
import { match, MatchResult, pathToRegexp } from "path-to-regexp";
import { ApiPaths, GuestByIdParams } from "services/Api/constants";
import { classToPlain, plainToClass } from "serializers/Serializer";
import GuestAccommodation from "models/GuestAccommodation";
import Accommodation from "models/Accommodation";

const mockGuest = () => {
    const guest = new Guest();

    guest.createdAt = moment();
    guest.id = chance.guid({ version: 5 });
    guest.fullName = chance.name();
    guest.verificationStatus = chance.pickone(Object.values(HostStatus));
    guest.email = chance.email();
    guest.phoneNumber = chance.phone();
    guest.children = Array.from({ length: chance.natural({ min: 0, max: 3 }) }, () => chance.age({ type: "child" }));
    guest.durationOfStay = moment.duration(
        chance.natural({ min: 1, max: 4 }),
        chance.pickone(["weeks", "months", "days"])
    );
    guest.peopleFemaleCount = chance.natural({ min: 1, max: 2 });
    guest.peopleMaleCount = chance.natural({ min: 0, max: 3 });
    guest.peopleTotalCount = guest.peopleFemaleCount + guest.peopleMaleCount + guest.children.length;
    guest.financialStatus = chance.sentence();
    guest.petsPresent = chance.bool();
    guest.petsDescription = "Dog, cat and a squirrel. Also " + chance.sentence({ words: 5 });
    guest.isAgent = chance.bool();
    guest.documentNumber = chance.ssn();

    const foodAllergies = ["Chocolate", "Nuts", "Strawberry"];
    const foodAllergiesQuantity = chance.natural({
        min: 0,
        max: Math.min(foodAllergies.length, 2),
    });

    guest.foodAllergies = chance.pickset(foodAllergies, foodAllergiesQuantity).join(", ");

    guest.meatFreeDiet = chance.bool();
    guest.glutenFreeDiet = chance.bool();
    guest.lactoseFreeDiet = chance.bool();
    guest.desiredDestination = chance.address();
    guest.priorityStatus = chance.pickone(Object.values(GuestPriorityStatus));
    guest.staffComments = chance.sentence({ words: 16 });

    const daysFromStartOfWar = moment().diff(moment("2022-02-24"), "days");

    guest.priorityDate = moment().subtract(chance.natural({ min: 0, max: daysFromStartOfWar }), "days");

    return guest;
};

const mockGuestResponses = (mockAdapter: any, { mockedAccommodations, mockedGuests }: any) => {
    mockAdapter.onGet(pathToRegexp(ApiPaths.GUEST)).reply((config: any) => {
        const { url } = config;
        const plainGuests = mockedGuests.map((guest: any) => classToPlain(guest));

        console.info(`[useGetGuest] Mocked response for ${url}: `, plainGuests);
        return [200, JSON.stringify(plainGuests)];
    });

    mockAdapter.onGet(pathToRegexp(ApiPaths.GUEST_BY_ID)).reply((config: any) => {
        const { url } = config;
        const matchedPath = match(ApiPaths.GUEST_BY_ID)(url) as MatchResult<GuestByIdParams>;
        const {
            params: { guestId },
        } = matchedPath;

        const guest = mockedGuests.find((mock: any) => mock.id === guestId);
        const plain = classToPlain(guest);

        console.info(`[useGetGuest] Mocked response for ${url}: `, guest);
        return [200, JSON.stringify(plain)];
    });

    mockAdapter.onPut(pathToRegexp(ApiPaths.GUEST_BY_ID)).reply((config: any) => {
        const { url, data } = config;
        const matchedPath = match(ApiPaths.GUEST_BY_ID)(url) as MatchResult<GuestByIdParams>;
        const {
            params: { guestId },
        } = matchedPath;

        const json = JSON.parse(data);

        const guestIndex = mockedGuests.findIndex((mockedGuestId: any) => mockedGuestId.id === guestId);

        if (guestIndex === -1) {
            throw RangeError("[useUpdateGuest] Tried to PUT guest, but guest with such ID is not present in mocks");
        }

        /**
         *
         * @type {Guest}
         */
        const updatedGuest = plainToClass(Guest, json);
        updatedGuest.id = guestId;

        const accommodation = mockedAccommodations.find(
            (mockedAccommodation: any) => mockedAccommodation.id === updatedGuest.accommodationUnitId
        );

        if (accommodation instanceof Accommodation) {
            const plainAccommodation = classToPlain(accommodation);
            const accommodationUnit = plainToClass(GuestAccommodation, plainAccommodation);
            updatedGuest.accommodationUnit = accommodationUnit;
        } else {
            updatedGuest.accommodationUnit = undefined;
        }

        mockedGuests[guestIndex] = updatedGuest;

        const plain = classToPlain(updatedGuest);

        console.info(`[useUpdateGuest] Mocked response for ${url}: `, updatedGuest);
        return [200, JSON.stringify(plain)];
    });

    mockAdapter.onPost(pathToRegexp(ApiPaths.GUEST)).reply((config: any) => {
        const { url, data } = config;
        const json = JSON.parse(data);
        /**
         * @type {Guest}
         */
        const createdGuest = plainToClass(Guest, json);
        createdGuest.id = chance.guid({ version: 5 });

        createdGuest.createdAt = moment();

        createdGuest.updatedAt = moment();

        mockedGuests.unshift(createdGuest);

        const plain = classToPlain(createdGuest);

        console.info(`[useUpdateGuest] Mocked response for ${url}: `, createdGuest);

        return [200, JSON.stringify(plain)];
    });
};

export { mockGuest, mockGuestResponses };
