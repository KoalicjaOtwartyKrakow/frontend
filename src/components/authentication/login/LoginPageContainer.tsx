import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import LoginForm from "./LoginForm";
import "./LoginPageContainer.scss";
import classNames from "classnames";

import { appConfig } from "constants/AppConfig";

const LoginPageContainer = ({ onSubmit, visible }) => {
    const className = classNames("h-100", { "d-none": !visible });
    const { publicUrl } = appConfig;

    return (
        <Container className={className}>
            <Row className="h-100 align-items-start align-items-md-center">
                <Col xs={{ size: 12 }} sm={{ size: 10 }} lg={{ size: 8, offset: 2 }}>
                    <Card className="login-container">
                        <CardHeader>Welcome! Please sign in.</CardHeader>
                        <CardBody>
                            <Row>
                                <Col xs={12} md={4} className="application-logo-container">
                                    <img
                                        className="d-inline-block w-100"
                                        alt="Logo of Koalicja Otwarty Kraków"
                                        src={`${publicUrl}/images/logo-koalicja.png`}
                                    />
                                </Col>
                                <Col xs={12} md={8}>
                                    <LoginForm onSubmit={onSubmit} />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default React.memo(LoginPageContainer);
