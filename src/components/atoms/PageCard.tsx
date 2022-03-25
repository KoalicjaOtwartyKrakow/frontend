import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/PageCardHeade... Remove this comment to see the full error message
import PageCardHeader from "components/atoms/PageCardHeader";

const PageCard = ({ children, header, ...props }: any) => {
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
