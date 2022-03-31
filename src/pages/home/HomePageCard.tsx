import { generatePath, Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const HomePageCard = ({ children, color, header, icon, navigationButtonLabel, navigationRoute }: any) => {
    const navigate = useNavigate();
    const isAppRoute = navigationRoute.startsWith("/");
    const onNavigate = (route: string) => {
        if (isAppRoute) {
            const path = generatePath(route);
            navigate(path);
            return;
        }
        window.location.href = route;
    };

    return (
        <Card color={color} inverse className="mb-3 pointer" onClick={() => onNavigate(navigationRoute)}>
            <CardHeader>
                <CardTitle tag="h5" className="mt-2 mb-2">
                    <FontAwesomeIcon icon={icon} /> {header}
                </CardTitle>
            </CardHeader>
            <CardBody>
                <CardText>{children}</CardText>
                <Row>
                    <Col lg={{ size: 10, offset: 1 }}>
                        <Button
                            color={color}
                            size="lg"
                            tag={isAppRoute ? Link : "a"}
                            {...(isAppRoute ? { to: navigationRoute } : {})}
                            {...(!isAppRoute ? { href: navigationRoute } : {})}
                            className="w-100"
                        >
                            {navigationButtonLabel}
                        </Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default HomePageCard;
