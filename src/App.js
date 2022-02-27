import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from 'components/Home';
import { ApartmentEdit } from 'components/apartments/ApartmentEdit';
import Routes from 'constants/Routes';
// import apartments from 'models/mocks/apartments';
// import { plainToClass } from 'serializers/Serializer';
// import Apartment from 'models/Apartment';
import { Container } from 'reactstrap';

function App() {

    // console.log(apartments[0])
    // console.log(plainToClass(Apartment, apartments[0]))

    return (
        <Container>
            <h2>#KoalicjaOtwartyKraków</h2>

            <Switch>
                <Route path={Routes.ROOT} render={() => <Home />} exact />
                <Switch>
                    <Route path={Routes.APARTMENTS_EDIT} render={() => <ApartmentEdit />} />
                </Switch>
            </Switch>
        </Container>
    );
}

export default App;