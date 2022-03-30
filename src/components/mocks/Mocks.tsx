import { mockGuest, mockGuestResponses } from "mocks/guest";
import { mockHost, mockHostResponses } from "mocks/host";
import { mockAccommodation, mockAccommodationResponses } from "mocks/accommodation";
import { mockRelationships } from "mocks/relationships";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import useApplicationSettings from "hooks/useApplicationSettings";
import { ApplicationSettings } from "components/settings/constants";
import { mockUser, mockUserResponses } from "mocks/user";

const applyMocks = () => {
    const mockAdapter = new MockAdapter(axios);

    const mockedAccommodations = Array.from({ length: 400 }, mockAccommodation);
    const mockedGuests = Array.from({ length: 4000 }, mockGuest);
    const mockedHosts = Array.from({ length: 400 }, mockHost);
    const mockedUsers = Array.from({ length: 30 }, mockUser);

    mockRelationships({ mockedAccommodations, mockedGuests, mockedHosts, mockedUsers });

    mockAccommodationResponses(mockAdapter, { mockedAccommodations, mockedGuests });
    mockHostResponses(mockAdapter, { mockedHosts });
    mockGuestResponses(mockAdapter, { mockedAccommodations, mockedGuests });

    mockUserResponses(mockAdapter, { mockedUsers });
};

const Mocks = () => {
    const applicationSettings = useApplicationSettings();
    if (applicationSettings.get(ApplicationSettings.IS_ENABLE_MOCKS)) {
        applyMocks();
    }

    return null;
};

export default Mocks;
