import Chance from "chance";
import Accommodation from "models/Accommodation";
import Guest from "models/Guest";
import Host from "models/Host";
import { polishVoivodeships } from "models/constants/Address";
import { AccommodationStatus } from "models/constants/AccommodationStatus";
import { HostStatus } from "models/constants/HostStatus";
import { GuestPriorityStatus } from "models/constants/GuestPriorityStatus";
import moment from "moment-es6";
import GuestChild from "models/guest/GuestChild";
import { languages } from "models/constants/Languages";
import * as constants from "services/Api/constants";
import { Paths } from "services/Api/constants";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { getPath } from "services/Api/utils";
import { matchPath } from "react-router-dom";
import { classToPlain, plainToClass } from "serializers/Serializer";
import { uniq } from "lodash-es";

const chance = new Chance(0xdeadbeef);

export function generateAllMocks() {
    const mockedGuests = Array.from({ length: 30 }, () => {
        const guest = new Guest();
        guest.id = chance.guid({ version: 5 });
        guest.fullName = chance.name();
        guest.verificationStatus = chance.pickone(Object.values(HostStatus));
        guest.email = chance.email();
        guest.phoneNumber = chance.phone();
        guest.children = Array.from(
            { length: chance.natural({ min: 0, max: 3 }) },
            () => {
                const guestChild = new GuestChild();
                guestChild.age = chance.age({ type: "child" });
                return guestChild;
            }
        );
        const stayDuration = moment.duration({
            months: chance.natural({ min: 0, max: 3 }),
            days: chance.natural({ min: 1, max: 28 }),
        });
        guest.durationOfStay = stayDuration.humanize();
        guest.peopleFemaleCount = chance.natural({ min: 1, max: 2 });
        guest.peopleMaleCount = chance.natural({ min: 0, max: 3 });
        guest.peopleTotalCount =
            guest.peopleFemaleCount +
            guest.peopleMaleCount +
            guest.children.length;
        guest.financialStatus = chance.sentence();
        guest.petsPresent = chance.bool();
        guest.petsDescription =
            "Dog, cat and a squirrel. Also " + chance.sentence({ words: 5 });

        const foodAllergies = ["Chocolate", "Nuts", "Strawberry"];
        const foodAllergiesQuantity = chance.natural({
            min: 0,
            max: Math.min(foodAllergies.length, 2),
        });

        guest.foodAllergies = chance
            .pickset(foodAllergies, foodAllergiesQuantity)
            .join(", ");

        guest.meatFreeDiet = chance.bool();
        guest.glutenFreeDiet = chance.bool();
        guest.lactoseFreeDiet = chance.bool();
        guest.desiredDestination = chance.address();
        guest.priorityStatus = chance.pickone(
            Object.values(GuestPriorityStatus)
        );

        const daysFromStartOfWar = moment().diff(moment("2022-02-24"), "days");
        guest.priorityDate = moment().subtract(
            chance.natural({ min: 0, max: daysFromStartOfWar }),
            "days"
        );

        return guest;
    });

    const mockedHosts = Array.from({ length: 30 }, () => {
        const host = new Host();
        host.id = chance.guid({ version: 5 });
        host.fullName = chance.name();
        host.email = chance.email();
        host.phoneNumber = chance.phone();
        host.callAfter = chance.hour({ twentyfour: true }).toString();
        host.callBefore = chance.hour({ twentyfour: true }).toString();
        host.status = chance.pickone(Object.values(HostStatus));
        host.comments = chance.paragraph();
        host.languagesSpoken = uniq(
            chance
                .pickset(languages, chance.integer({ min: 0, max: 4 }))
                .concat("pl")
        );
        return host;
    });

    const mockedAccommodations = Array.from({ length: 15 }, () => {
        const accommodation = new Accommodation();
        // Id
        accommodation.id = chance.guid({ version: 5 });

        // Vacancies
        accommodation.addressLine = chance.address();
        accommodation.addressVoivodeship =
            polishVoivodeships[
                chance.natural({ min: 0, max: polishVoivodeships.length - 1 })
            ].id;
        accommodation.addressCity = chance.city();
        const zip = chance.zip().split("");
        zip.splice(2, 0, "-");
        accommodation.addressZip = zip.join("");

        // Info
        accommodation.staffComments = chance.paragraph();
        accommodation.ownerComments = chance.paragraph();
        accommodation.status = chance.pickone(
            Object.values(AccommodationStatus)
        );

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

        // Relations
        accommodation.host =
            mockedHosts[
                chance.natural({ min: 0, max: mockedHosts.length - 1 })
            ];
        accommodation.hostId = accommodation.host.id;

        return accommodation;
    });

    return { mockedAccommodations, mockedGuests, mockedHosts };
}

if (constants.useMocks) {
    const mockAdapter = new MockAdapter(axios);
    const { mockedAccommodations, mockedHosts, mockedGuests } =
        generateAllMocks();

    mockAdapter.onGet(Paths.ACCOMMODATION).reply((config) => {
        const { url } = config;
        const plainAccommodations = mockedAccommodations.map((accommodation) =>
            classToPlain(accommodation)
        );

        console.log(`[useGetAccommodation] Mocked response for ${url}: `);
        return [200, plainAccommodations];
    });

    mockAdapter
        .onGet(new RegExp(getPath(Paths.ACCOMMODATION) + "/*"))
        .reply((config) => {
            const { url } = config;
            const matchedPath = matchPath(url, {
                path: getPath(Paths.ACCOMMODATION) + "/:accommodationId",
                exact: true,
                strict: false,
            });
            const {
                params: { accommodationId },
            } = matchedPath;

            const accommodation = mockedAccommodations.find(
                (mock) => mock.id === accommodationId
            );
            const plain = classToPlain(accommodation);

            console.log(
                `[useGetAccommodation] Mocked response for ${url}: `,
                accommodation
            );
            return [200, plain];
        });

    mockAdapter
        .onPut(new RegExp(getPath(Paths.ACCOMMODATION)))
        .reply((config) => {
            const { url, data } = config;
            const json = JSON.parse(data);
            const updatedAccommodation = plainToClass(Accommodation, json);

            const accommodationIndex = mockedAccommodations.findIndex(
                (mock) => mock.id === updatedAccommodation.id
            );

            mockedAccommodations[accommodationIndex] = updatedAccommodation;

            const plain = data;

            console.log(
                `[useUpdateAccommodation] Mocked response for ${url}: `,
                updatedAccommodation
            );
            return [200, plain];
        });

    mockAdapter.onPost(Paths.ACCOMMODATION).reply((config) => {
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

        console.log(
            `[useUpdateAccommodation] Mocked response for ${url}: `,
            createdAccommodation
        );

        return [200, plain];
    });

    mockAdapter.onGet(Paths.HOST).reply((config) => {
        const { url } = config;
        const plainHosts = mockedHosts.map((host) => classToPlain(host));

        console.log(`[useGetHost] Mocked response for ${url}: `, plainHosts);
        return [200, plainHosts];
    });

    mockAdapter
        .onGet(new RegExp(getPath(Paths.HOST) + "/.+"))
        .reply((config) => {
            const { url } = config;
            const matchedPath = matchPath(url, {
                path: getPath(Paths.HOST) + "/:hostId",
                exact: true,
                strict: false,
            });
            const {
                params: { hostId },
            } = matchedPath;

            const host = mockedHosts.find((mock) => mock.id === hostId);
            const plain = classToPlain(host);

            console.log(`[useGetHost] Mocked response for ${url}: `, host);
            return [200, plain];
        });

    mockAdapter.onPut(new RegExp(getPath(Paths.HOST))).reply((config) => {
        const { url, data } = config;
        const json = JSON.parse(data);
        const updatedHost = plainToClass(Host, json);

        const hostIndex = mockedHosts.findIndex(
            (mock) => mock.id === updatedHost.id
        );

        mockedHosts[hostIndex] = updatedHost;

        const plain = data;

        console.log(
            `[useUpdateHost] Mocked response for ${url}: `,
            updatedHost
        );
        return [200, plain];
    });

    mockAdapter.onPost(Paths.HOST).reply((config) => {
        const { url, data } = config;
        const json = JSON.parse(data);
        /**
         * @type {Host}
         */
        const createdHost = plainToClass(Host, json);
        createdHost.id = chance.guid({ version: 5 });
        createdHost.createdAt = moment();
        createdHost.updatedAt = moment();

        mockedHosts.unshift(createdHost);

        const plain = classToPlain(createdHost);

        console.log(
            `[useUpdateHost] Mocked response for ${url}: `,
            createdHost
        );

        return [200, plain];
    });

    mockAdapter.onGet(Paths.GUEST).reply((config) => {
        const { url } = config;
        const plainGuests = mockedGuests.map((guest) => classToPlain(guest));

        console.log(`[useGetGuest] Mocked response for ${url}: `, plainGuests);
        return [200, plainGuests];
    });

    mockAdapter
        .onGet(new RegExp(getPath(Paths.GUEST) + "/.+"))
        .reply((config) => {
            const { url } = config;
            const matchedPath = matchPath(url, {
                path: getPath(Paths.GUEST) + "/:guestId",
                exact: true,
                strict: false,
            });
            const {
                params: { guestId },
            } = matchedPath;

            const guest = mockedGuests.find((mock) => mock.id === guestId);
            const plain = classToPlain(guest);

            console.log(`[useGetGuest] Mocked response for ${url}: `, guest);
            return [200, plain];
        });

    mockAdapter.onPut(new RegExp(getPath(Paths.GUEST))).reply((config) => {
        const { url, data } = config;
        const json = JSON.parse(data);
        const updatedGuest = plainToClass(Guest, json);

        const guestIndex = mockedGuests.findIndex(
            (mock) => mock.id === updatedGuest.id
        );

        mockedGuests[guestIndex] = updatedGuest;

        const plain = data;

        console.log(
            `[useUpdateGuest] Mocked response for ${url}: `,
            updatedGuest
        );
        return [200, plain];
    });

    mockAdapter.onPost(Paths.GUEST).reply((config) => {
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

        console.log(
            `[useUpdateGuest] Mocked response for ${url}: `,
            createdGuest
        );

        return [200, plain];
    });
}
