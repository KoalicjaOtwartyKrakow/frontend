import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from 'components/Home';
import { ApartmentEdit } from 'components/apartments/ApartmentEdit';
import Routes from 'constants/Routes';
import { Container, Jumbotron } from 'reactstrap';

function App() {

    return (
        <>
            <Jumbotron>
                <Container>
                    <h1 className="display-3">#KoalicjaOtwartyKraków</h1>
                    <p className="lead">Mieszkańcy Krakowa na pomoc Ukrainie</p>
                </Container>
            </Jumbotron>
            <Container>
                <Switch>
                    <Route path={Routes.ROOT} render={() => <Home />} exact />
                    <Switch>
                        <Route path={Routes.APARTMENTS_EDIT} render={() => <ApartmentEdit />} />
                    </Switch>
                </Switch>
            </Container>
        </>

    );
}

export default App;