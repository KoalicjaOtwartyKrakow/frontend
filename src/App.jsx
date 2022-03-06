import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import AuthenticatedContainer from "components/AuthenticatedContainer";
import AccommodationEdit from "components/pages/AccommodationEditPage";
import Routes from "constants/Routes";
import AccommodationsPage from "components/pages/AccommodationsPage";

function App() {
    return (
        <AuthenticatedContainer>
            <Switch>
                <Route
                    path={Routes.ROOT}
                    render={() => <Redirect to={Routes.ACCOMMODATIONS} />}
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
                </Switch>
            </Switch>
        </AuthenticatedContainer>
    );
}

export default App;
