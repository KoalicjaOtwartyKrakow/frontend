import React from "react";
import * as constants from "services/Api/constants";
import { mockGuest, mockGuestResponses } from "mocks/guest";
import { mockHost, mockHostResponses } from "mocks/host";
import { mockAccommodation, mockAccommodationResponses } from "mocks/accommodation";
import { mockRelationships } from "mocks/relationships";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import useApplicationSettings from "hooks/useApplicationSettings";
import { ApplicationSettings } from "components/settings/constants";

const applyMocks = () => {
    const mockAdapter = new MockAdapter(axios);

    const mockedGuests = Array.from({ length: 30 }, mockGuest);
    const mockedHosts = Array.from({ length: 30 }, mockHost);
    const mockedAccommodations = Array.from({ length: 30 }, mockAccommodation);

    mockRelationships({ mockedAccommodations, mockedGuests, mockedHosts });

    mockAccommodationResponses(mockAdapter, { mockedAccommodations, mockedGuests });
    mockHostResponses(mockAdapter, { mockedHosts });
    mockGuestResponses(mockAdapter, { mockedAccommodations, mockedGuests });
};

const Mocks = () => {
    const applicationSettings = useApplicationSettings();
    if (applicationSettings.get(ApplicationSettings.IS_ENABLE_MOCKS)) {
        applyMocks();
    }

    return null;
};

export default Mocks;
