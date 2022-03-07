import React from "react";
import { Route, Switch } from "react-router-dom";

import AuthenticatedContainer from "components/AuthenticatedContainer";
import AccommodationEdit from "components/pages/AccommodationEditPage";
import { Routes } from "constants/Routes";
import AccommodationsPage from "components/pages/AccommodationsPage";
import HomePage from "components/pages/HomePage";

function App() {
    return (
        <AuthenticatedContainer>
            <Switch>
                <Route path={Routes.ROOT} render={() => <HomePage />} exact />
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
                </Switch>
            </Switch>
        </AuthenticatedContainer>
    );
}

export default App;
