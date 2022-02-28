import React from 'react';
import { Col, Row } from 'reactstrap';
import ApartmentFormSection from 'components/apartment/form/ApartmentFormSection';
import ApartmentFormSectionHeader from 'components/apartment/form/ApartmentFormSectionHeader';
import ApartmentFormStreetName from 'components/apartment/form/fields/ApartmentFormStreetName';

/**
 * @component
 */
const ApartmentFormAddress = () => {
    return (
        <ApartmentFormSection>
            <ApartmentFormSectionHeader>Dane adresowe lokalu</ApartmentFormSectionHeader>
            <Row>
                <Col xs={12} md={4}>
                    <ApartmentFormStreetName />
                </Col>
                <Col xs={12} md={4}>
                    TODO
                </Col>
                <Col xs={12} md={4}>
                    TODO
                </Col>
            </Row>
        </ApartmentFormSection>
    );
};

ApartmentFormAddress.propTypes = {};

export default React.memo(ApartmentFormAddress);
