import { times } from "lodash-es";
import { classToPlain, plainToClass } from "serializers/Serializer";
import Guest from "models/Guest";
import GuestAccommodation from "models/GuestAccommodation";
import { chance, getRandomItem } from "mocks/base";

const mockRelationships = ({ mockedAccommodations, mockedGuests, mockedHosts }) => {
    // Relations

    for (const mockedAccommodation of mockedAccommodations) {
        mockedAccommodation.host = mockedHosts[chance.natural({ min: 0, max: mockedHosts.length - 1 })];
        mockedAccommodation.hostId = mockedAccommodation.host.id;

        // Randomly (90%) assign couple of guests to Accommodation.
        // Notice: this does not check if Guest is already assigned to some
        // other mockedAccommodation, which is not a valid production scenario
        if (chance.natural({ min: 1, max: 10 }) < 9) {
            times(chance.natural({ min: 1, max: 4 }), () => {
                const guest = mockedGuests[chance.natural({ min: 0, max: mockedGuests.length - 1 })];
                const plain = classToPlain(guest);
                const copyOfGuest = plainToClass(Guest, plain);
                mockedAccommodation.guests.push(copyOfGuest);
                copyOfGuest.mockedAccommodation = plainToClass(GuestAccommodation, classToPlain(mockedAccommodation));
            });
        }
    }

    for (const mockedGuest of mockedGuests) {
        const mockedAccommodation = getRandomItem(mockedAccommodations);
        const plainAccommodation = classToPlain(mockedAccommodation);
        const guestAccommodation = plainToClass(GuestAccommodation, plainAccommodation);
        mockedGuest.accommodation = guestAccommodation;
    }

    return { mockedAccommodations, mockedGuests, mockedHosts };
};

export { mockRelationships };
