import React from 'react';
import { Col, Row } from 'reactstrap';
import ApartmentFormSection from 'components/apartment/form/ApartmentFormSection';
import ApartmentFormSectionHeader from 'components/apartment/form/ApartmentFormSectionHeader';
import ApartmentFormStreetName from 'components/apartment/form/fields/ApartmentFormStreetName';
import ApartmentFormVacanciesTotal from 'components/apartment/form/fields/ApartmentFormVacanciesTotal';
import ApartmentFormVacanciesTaken from 'components/apartment/form/fields/ApartmentFormVacanciesTaken';
import ApartmentFormStreetNumber from 'components/apartment/form/fields/ApartmentFormStreetNumber';
import ApartmentFormFlatNumber from 'components/apartment/form/fields/ApartmentFormFlatNumber';
import ApartmentFormZip from 'components/apartment/form/fields/ApartmentFormZip';

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
                        <Col xs={12}>
                            <ApartmentFormStreetName />
                        </Col>
                        <Col xs={4}>
                            <ApartmentFormStreetNumber />
                        </Col>
                        <Col xs={4}>
                            <ApartmentFormFlatNumber />
                        </Col>
                        <Col xs={4}>
                            <ApartmentFormZip />
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
