import React from 'react';
import { Container, Jumbotron } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Routes from 'constants/Routes';

const AuthenticatedContainer = ({ children, history }) => {
    const onJumbotronClick = () => {
        const path = Routes.ROOT;
        history.push(path);
    };

    return (
        <>
            <Jumbotron onClick={onJumbotronClick} className="pointer">
                <Container>
                    <h1 className="display-3">#KoalicjaOtwartyKraków </h1>
                    <p className="lead">Mieszkańcy Krakowa na pomoc Ukrainie</p>
                </Container>
            </Jumbotron>
            <Container>
                {children}
            </Container>
        </>
    );
};

export default withRouter(AuthenticatedContainer);