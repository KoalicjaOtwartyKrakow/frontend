import React from 'react';
import { Col, Row } from 'reactstrap';
import ApartmentFormSection from 'components/apartment/form/ApartmentFormSection';
import ApartmentFormSectionHeader from 'components/apartment/form/ApartmentFormSectionHeader';
import ApartmentFormStreetName from 'components/apartment/form/fields/ApartmentFormStreetName';
import ApartmentFormVacanciesTotal from 'components/apartment/form/fields/ApartmentFormVacanciesTotal';
import ApartmentFormVacanciesTaken from 'components/apartment/form/fields/ApartmentFormVacanciesTaken';

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
                    <ApartmentFormVacanciesTaken />
                </Col>
                <Col xs={12} md={4}>
                    <ApartmentFormVacanciesTotal />
                </Col>
            </Row>
        </ApartmentFormSection>
    );
};

ApartmentFormAddress.propTypes = {};

export default React.memo(ApartmentFormAddress);
