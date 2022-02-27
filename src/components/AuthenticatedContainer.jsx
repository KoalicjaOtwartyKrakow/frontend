import React from 'react';
import { Container, Jumbotron } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Routes from 'constants/Routes';
import { Notifications } from 'services/Notifications';
import { ToastProvider } from 'react-toast-notifications';

const AuthenticatedContainer = ({ children, history }) => {
    const onJumbotronClick = () => {
        const path = Routes.ROOT;
        history.push(path);
    };

    return (
        <ToastProvider autoDismiss={ Notifications.toastAutoDismiss }>
            <Jumbotron onClick={onJumbotronClick} className="pointer">
                <Container>
                    <h1 className="display-3">#KoalicjaOtwartyKraków </h1>
                    <p className="lead">Mieszkańcy Krakowa na pomoc Ukrainie</p>
                </Container>
            </Jumbotron>
            <Container>
                {children}
            </Container>
        </ToastProvider>
    );
};

export default withRouter(AuthenticatedContainer);