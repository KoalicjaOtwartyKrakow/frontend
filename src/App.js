import { GlobalProvider } from 'context/GlobalState';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from 'components/Home';
import { ApartmentEdit } from 'components/ApartmentEdit';
import Routes from 'constants/Routes';

function App() {
    return (
        <GlobalProvider>
            <div className="App">
                <Switch>
                    <Route path={Routes.ROOT} render={() => <Home />} exact />
                    <Switch>
                        <Route path={Routes.APARTMENTS_EDIT} render={() => <ApartmentEdit />} />
                    </Switch>
                </Switch>
            </div>
        </GlobalProvider>
    );
}

export default App;