// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mocks/guest' or its correspond... Remove this comment to see the full error message
import { mockGuest, mockGuestResponses } from "mocks/guest";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mocks/host' or its correspondi... Remove this comment to see the full error message
import { mockHost, mockHostResponses } from "mocks/host";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mocks/accommodation' or its co... Remove this comment to see the full error message
import { mockAccommodation, mockAccommodationResponses } from "mocks/accommodation";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mocks/relationships' or its co... Remove this comment to see the full error message
import { mockRelationships } from "mocks/relationships";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'hooks/useApplicationSettings' ... Remove this comment to see the full error message
import useApplicationSettings from "hooks/useApplicationSettings";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/settings/constants'... Remove this comment to see the full error message
import { ApplicationSettings } from "components/settings/constants";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mocks/user' or its correspondi... Remove this comment to see the full error message
import { mockUser, mockUserResponses } from "mocks/user";

const applyMocks = () => {
    const mockAdapter = new MockAdapter(axios);

    const mockedAccommodations = Array.from({ length: 30 }, mockAccommodation);
    const mockedGuests = Array.from({ length: 30 }, mockGuest);
    const mockedHosts = Array.from({ length: 30 }, mockHost);
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
