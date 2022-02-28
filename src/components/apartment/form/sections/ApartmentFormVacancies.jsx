import React from 'react';
import { Col, Row } from 'reactstrap';
import ApartmentFormSectionHeader from 'components/apartment/form/ApartmentFormSectionHeader';
import ApartmentFormSection from 'components/apartment/form/ApartmentFormSection';
import ApartmentFormVacanciesTaken from 'components/apartment/form/fields/ApartmentFormVacanciesTaken';
import ApartmentFormVacanciesTotal from 'components/apartment/form/fields/ApartmentFormVacanciesTotal';

const ApartmentFormVacancies = () => (
    <ApartmentFormSection className="mb-0">
        <ApartmentFormSectionHeader>Dostępność lokalu</ApartmentFormSectionHeader>
        <Row>
            <Col xs={6} md={6}>
                <ApartmentFormVacanciesTaken />
            </Col>
            <Col xs={6} md={6}>
                <ApartmentFormVacanciesTotal />
            </Col>
        </Row>
    </ApartmentFormSection>
);

ApartmentFormVacancies.propTypes = {};

export default React.memo(ApartmentFormVacancies);
