import React from 'react';
import { Col, Row } from 'reactstrap';
import ApartmentFormSection from 'components/apartment/form/ApartmentFormSection';
import ApartmentFormSectionHeader from 'components/apartment/form/ApartmentFormSectionHeader';
import ApartmentFormStreetName from 'components/apartment/form/fields/ApartmentFormStreetName';
import ApartmentFormVacanciesTotal from 'components/apartment/form/fields/ApartmentFormVacanciesTotal';
import ApartmentFormVacanciesTaken from 'components/apartment/form/fields/ApartmentFormVacanciesTaken';
import ApartmentFormStreetNumber from 'components/apartment/form/fields/ApartmentFormStreetNumber';

/**
 * @component
 */
const ApartmentFormAddress = () => {
    return (
        <ApartmentFormSection>
            <ApartmentFormSectionHeader>Dane adresowe lokalu</ApartmentFormSectionHeader>
            <Row>
                <Col xs={12} md={6}>
                    <Row>
                        <Col xs={12} md={8} lg={9}>
                            <ApartmentFormStreetName />
                        </Col>
                        <Col xs={12} md={4} lg={3}>
                            <ApartmentFormStreetNumber />
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={6}>
                    <Row>
                        <Col xs={6} md={6}>
                            <ApartmentFormVacanciesTaken />
                        </Col>
                        <Col xs={6} md={6}>
                            <ApartmentFormVacanciesTotal />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </ApartmentFormSection>
    );
};

ApartmentFormAddress.propTypes = {};

export default React.memo(ApartmentFormAddress);
