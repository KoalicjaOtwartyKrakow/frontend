import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import PageCardHeader from 'components/atoms/PageCardHeader';

const PageCard = ({children, header}) => {
    return (
        <Card>
            <CardHeader>
                <PageCardHeader>{header}</PageCardHeader>
            </CardHeader>
            <CardBody>
                {children}
            </CardBody>
        </Card>
    )
}

export default PageCard;