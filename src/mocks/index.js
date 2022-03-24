import * as constants from "services/Api/constants";
import { mockGuest, mockGuestResponses } from "mocks/guest";
import { mockHost, mockHostResponses } from "mocks/host";
import { mockAccommodation, mockAccommodationResponses } from "mocks/accommodation";
import { mockRelationships } from "mocks/relationships";

// eslint-disable-next-line no-debugger
debugger;
if (constants.useMocks) {
    const mockedGuests = Array.from({ length: 30 }, mockGuest);
    const mockedHosts = Array.from({ length: 30 }, mockHost);
    const mockedAccommodations = Array.from({ length: 30 }, mockAccommodation);

    mockRelationships({ mockedAccommodations, mockedGuests, mockedHosts });

    mockAccommodationResponses({ mockedAccommodations, mockedGuests });
    mockHostResponses({ mockedHosts });
    mockGuestResponses({ mockedAccommodations, mockedGuests });
}
