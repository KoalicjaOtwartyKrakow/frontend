import React from 'react';
import { Col, Row } from 'reactstrap';
import ApartmentFormSectionHeader from 'components/apartment/form/ApartmentFormSectionHeader';
import ApartmentFormSection from 'components/apartment/form/ApartmentFormSection';
import { apartmentFormLandlordPropTypes } from 'proptypes/ApartmentFormPropTypes';
import ApartmentFormLandlordName from 'components/apartment/form/fields/ApartmentFormLandlordName';

const ApartmentFormLandlord = ({ }) => {
  return (
    <ApartmentFormSection>
      <ApartmentFormSectionHeader>Dane osoby udostępniającej</ApartmentFormSectionHeader>
      <Row>
        <Col xs={ 12 } lg={ 4 }>
          <ApartmentFormLandlordName />
        </Col>
        <Col xs={ 12 } lg={ 6 }>
          TODO
        </Col>
        <Col xs={ 12 } lg={ 2 }>
          TODO
        </Col>
        <Col xs={ 12 } lg={ 4 }>
          TODO
        </Col>
        <Col xs={ 12 } lg={ 4 }>
          TODO
        </Col>

      </Row>
    </ApartmentFormSection>
  );
};

ApartmentFormLandlord.propTypes = apartmentFormLandlordPropTypes;

export default React.memo(ApartmentFormLandlord);
