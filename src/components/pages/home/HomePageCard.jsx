import { generatePath, Link, useNavigate } from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardText,
    CardTitle,
    Col,
    Row,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const HomePageCard = ({
    children,
    color,
    header,
    icon,
    navigationButtonLabel,
    navigationRoute,
}) => {
    const navigate = useNavigate();
    const onNavigate = (route) => {
        const path = generatePath(route);
        navigate(path);
    };

    return (
        <Card
            color={color}
            inverse
            className="mb-3 pointer"
            onClick={() => onNavigate(navigationRoute)}
        >
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
                            tag={Link}
                            to={navigationRoute}
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
