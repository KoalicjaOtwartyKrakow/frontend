import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import AuthenticatedContainer from "components/AuthenticatedContainer";
import { Routes } from "constants/Routes";

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
                <Switch>
                    <Route
                        path={Routes.ROOT}
                        render={() => <DashboardPage />}
                        exact
                    />
                    <Switch>
                        <Route
                            path={Routes.ACCOMMODATIONS}
                            exact
                            render={() => <AccommodationsPage />}
                        />
                        <Route
                            path={Routes.ACCOMMODATION_CREATE}
                            component={AccommodationCreatePage}
                        />
                        <Route
                            path={Routes.ACCOMMODATION_EDIT}
                            component={AccommodationEditPage}
                        />
                        <Route
                            path={Routes.GUESTS}
                            exact
                            render={() => <GuestsPage />}
                        />
                        <Route
                            path={Routes.GUEST_CREATE}
                            component={GuestCreatePage}
                        />
                        <Route
                            path={Routes.GUEST_EDIT}
                            component={GuestEditPage}
                        />
                        <Route
                            path={Routes.HOSTS}
                            exact
                            render={() => <HostsPage />}
                        />
                        <Route
                            path={Routes.HOST_CREATE}
                            component={HostCreatePage}
                        />
                        <Route
                            path={Routes.HOST_EDIT}
                            component={HostEditPage}
                        />
                    </Switch>
                </Switch>
            </AuthenticatedContainer>
        </Suspense>
    );
}

export default App;
