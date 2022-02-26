import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from 'components/Home';
import { ApartmentEdit } from 'components/apartments/ApartmentEdit';
import Routes from 'constants/Routes';
import apartments from 'models/mocks/apartments';

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path={Routes.ROOT} render={() => <Home />} exact />
                <Switch>
                    <Route path={Routes.APARTMENTS_EDIT} render={() => <ApartmentEdit apartments={apartments} />} />
                </Switch>
            </Switch>
        </div>
    );
}

export default App;