import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AuthenticatedContainer from "components/AuthenticatedContainer";
import { AppRoutes } from "constants/AppRoutes";

import AccommodationEditPage from "components/pages/AccommodationEditPage";
import AccommodationsPage from "components/pages/AccommodationsPage";
import DashboardPage from "components/pages/DashboardPage";
import GuestEditPage from "components/pages/GuestEditPage";
import GuestsPage from "components/pages/GuestsPage";
import HostEditPage from "components/pages/HostEditPage";
import HostsPage from "components/pages/HostsPage";
import LoadingPage from "components/pages/LoadingPage";
import GuestCreatePage from "components/pages/GuestCreatePage";
import HostCreatePage from "components/pages/HostCreatePage";
import AccommodationCreatePage from "components/pages/AccommodationCreatePage";

function App() {
    return (
        <Suspense fallback={<LoadingPage visible={true} />}>
            <AuthenticatedContainer>
                <Routes>
                    <Route path={AppRoutes.ROOT} element={<DashboardPage />} />
                    <Route path={AppRoutes.ACCOMMODATIONS} element={<AccommodationsPage />} />
                    <Route path={AppRoutes.ACCOMMODATION_CREATE} element={<AccommodationCreatePage />} />
                    <Route path={AppRoutes.ACCOMMODATION_EDIT} element={<AccommodationEditPage />} />
                    <Route path={AppRoutes.GUESTS} exact element={<GuestsPage />} />
                    <Route path={AppRoutes.GUEST_CREATE} element={<GuestCreatePage />} />
                    <Route path={AppRoutes.GUEST_EDIT} element={<GuestEditPage />} />
                    <Route path={AppRoutes.HOSTS} exact element={<HostsPage />} />
                    <Route path={AppRoutes.HOST_CREATE} element={<HostCreatePage />} />
                    <Route path={AppRoutes.HOST_EDIT} element={<HostEditPage />} />
                </Routes>
            </AuthenticatedContainer>
        </Suspense>
    );
}

export default App;
