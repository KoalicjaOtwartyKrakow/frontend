import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import AuthenticatedContainer from "components/AuthenticatedContainer";
import ApartmentEdit from "components/pages/ApartmentEditPage";
import Routes from "constants/Routes";
import ApartmentsPage from "components/pages/ApartmentsPage";

function App() {
    return (
        <AuthenticatedContainer>
            <Switch>
                <Route
                    path={Routes.ROOT}
                    render={() => <Redirect to={Routes.APARTMENTS} />}
                    exact
                />
                <Switch>
                    <Route
                        path={Routes.APARTMENTS}
                        exact
                        render={() => <ApartmentsPage />}
                    />
                    <Route
                        path={Routes.APARTMENTS_EDIT}
                        component={ApartmentEdit}
                    />
                </Switch>
            </Switch>
        </AuthenticatedContainer>
    );
}

export default App;
