// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { times } from "lodash-es";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'serializers/Serializer' or its... Remove this comment to see the full error message
import { classToPlain, plainToClass } from "serializers/Serializer";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Guest' or its correspon... Remove this comment to see the full error message
import Guest from "models/Guest";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/GuestAccommodation' or ... Remove this comment to see the full error message
import GuestAccommodation from "models/GuestAccommodation";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mocks/base' or its correspondi... Remove this comment to see the full error message
import { chance, getRandomItem } from "mocks/base";
import moment from "moment-es6";

const mockAccommodationRelationships = ({ mockedAccommodations, mockedGuests, mockedHosts }: any) => {
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
};

/**
 *
 * @param {Accommodation[]} mockedAccommodations
 * @param {Guest[]} mockedGuests
 * @param {User[]} mockedUsers
 */
const mockGuestRelationships = ({ mockedAccommodations, mockedGuests, mockedUsers }: any) => {
    for (const mockedGuest of mockedGuests) {
        const mockedAccommodation = getRandomItem(mockedAccommodations);
        const plainAccommodation = classToPlain(mockedAccommodation);
        const guestAccommodation = plainToClass(GuestAccommodation, plainAccommodation);
        mockedGuest.accommodation = guestAccommodation;

        // Claim 90% of Guests with claim dates within 0-10 days ago
        if (chance.natural({ min: 1, max: 10 }) < 9) {
            const mockedUser = getRandomItem(mockedUsers);
            mockedGuest.claimedBy = mockedUser;
            mockedGuest.claimedById = mockedUser.id;
            // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
            mockedGuest.claimedAt = moment().subtract(chance.natural({ min: 0, max: 10 }), "days");
        } else {
            // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
            mockedGuest.claimedAt = moment(mockedGuest.createdAt);
        }
    }
};

const mockRelationships = (mocks: any) => {
    const { mockedAccommodations, mockedGuests, mockedHosts, mockedUsers } = mocks;
    mockAccommodationRelationships(mocks);
    mockGuestRelationships(mocks);

    return { mockedAccommodations, mockedGuests, mockedHosts, mockedUsers };
};

export { mockRelationships };
