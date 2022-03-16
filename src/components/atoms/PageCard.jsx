import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import PageCardHeader from "components/atoms/PageCardHeader";

const PageCard = ({ children, header, ...props }) => {
    return (
        <Card {...props}>
            <CardHeader>
                <PageCardHeader>{header}</PageCardHeader>
            </CardHeader>
            <CardBody>{children}</CardBody>
        </Card>
    );
};

export default PageCard;
