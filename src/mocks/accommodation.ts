import moment from "moment";
import { match, MatchResult, pathToRegexp } from "path-to-regexp";
import { chance, getRandomItem } from "mocks/base";
import Accommodation from "models/Accommodation";
import { AccommodationStatus } from "models/constants/AccommodationStatus";
import { polishVoivodeships } from "models/constants/Address";
import { classToPlain, plainToClass } from "serializers/Serializer";
import { AccommodationByIdParams, ApiPaths } from "services/Api/constants";

const mockAccommodation = () => {
    const accommodation = new Accommodation();
    // Id
    accommodation.id = chance.guid({ version: 5 });

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

        console.info(`[useGetAccommodation] Mocked response for ${url}: `, plainAccommodations);
        return [200, JSON.stringify(plainAccommodations)];
    });

    mockAdapter.onGet(pathToRegexp(ApiPaths.ACCOMMODATION_BY_ID)).reply((config: any) => {
        const { url } = config;
        const matchedPath = match(ApiPaths.ACCOMMODATION_BY_ID)(url) as MatchResult<AccommodationByIdParams>;
        const {
            params: { accommodationId },
        } = matchedPath;

        const accommodation = mockedAccommodations.find((mock: any) => mock.id === accommodationId);
        if (!accommodation) {
            return [404];
        }
        const plain = classToPlain(accommodation);

        console.info(`[useGetAccommodation] Mocked response for ${url}: `, accommodation);
        return [200, JSON.stringify(plain)];
    });

    mockAdapter.onPut(pathToRegexp(ApiPaths.ACCOMMODATION_BY_ID)).reply((config: any) => {
        const { url, data } = config;
        const json = JSON.parse(data);
        const updatedAccommodation = plainToClass(Accommodation, json);

        const accommodationIndex = mockedAccommodations.findIndex((mock: any) => mock.id === updatedAccommodation.id);

        mockedAccommodations[accommodationIndex] = updatedAccommodation;

        const plain = data;

        console.info(`[useUpdateAccommodation] Mocked response for ${url}: `, updatedAccommodation);
        return [200, JSON.stringify(plain)];
    });

    mockAdapter.onPost(pathToRegexp(ApiPaths.ACCOMMODATION)).reply((config: any) => {
        const { url, data } = config;
        const json = JSON.parse(data);
        const createdAccommodation: Accommodation = plainToClass(Accommodation, json);
        createdAccommodation.id = chance.guid({ version: 5 });

        createdAccommodation.createdAt = moment();

        createdAccommodation.updatedAt = moment();

        mockedAccommodations.unshift(createdAccommodation);

        const plain = classToPlain(createdAccommodation);

        console.info(`[useUpdateAccommodation] Mocked response for ${url}: `, createdAccommodation);

        return [200, JSON.stringify(plain)];
    });
};

export { mockAccommodation, mockAccommodationResponses };
