import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import AuthenticatedContainer from "components/AuthenticatedContainer";
import AccommodationEdit from "components/pages/AccommodationEditPage";
import AccommodationCreate from "components/pages/AccommodationCreatePage";
import { Routes } from "constants/Routes";
import AccommodationsPage from "components/pages/AccommodationsPage";
import HostsPage from "components/pages/HostsPage";
import DashboardPage from "components/pages/DashboardPage";
import GuestsPage from "components/pages/GuestsPage";
import LoadingPage from "components/pages/LoadingPage";
import HostEditPage from "components/pages/HostEditPage";

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
                            path={Routes.ACCOMMODATION_EDIT}
                            component={AccommodationEdit}
                        />
                        <Route
                            path={Routes.ACCOMMODATIONS_CREATE}
                            component={AccommodationCreate}
                        />
                        <Route
                            path={Routes.GUESTS}
                            exact
                            render={() => <GuestsPage />}
                        />
                        <Route
                            path={Routes.HOSTS}
                            exact
                            render={() => <HostsPage />}
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
