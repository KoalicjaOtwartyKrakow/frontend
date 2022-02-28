import React from "react";
import { Col, Row } from "reactstrap";
import ApartmentFormSectionHeader from 'components/apartment/form/ApartmentFormSectionHeader';
import ApartmentFormSection from 'components/apartment/form/ApartmentFormSection';

const ApartmentFormAdditional = () => (
  <ApartmentFormSection className="mb-0">
    <ApartmentFormSectionHeader>Pozostałe informacje</ApartmentFormSectionHeader>
    <Row>
      <Col xs={ 12 } md={ 6 } lg={ 3 } xl={ 2 }>
          TODO
      </Col>
      <Col xs={ 12 } md={ 6 } lg={ 3 } xl={ 2 }>
          TODO
      </Col>
      <Col xs={ 12 } md={ 6 } lg={ 3 } xl={ 4 }>
          TODO
      </Col>
      <Col xs={ 12 } md={ 6 } lg={ 3 } xl={ 4 }>
          TODO
      </Col>
    </Row>
  </ApartmentFormSection>
);

ApartmentFormAdditional.propTypes = {};

export default React.memo(ApartmentFormAdditional);
