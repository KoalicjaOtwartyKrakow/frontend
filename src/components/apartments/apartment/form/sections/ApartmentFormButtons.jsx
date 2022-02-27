import React from "react";
import { Col, Row } from "reactstrap";
import PropTypes from 'prop-types';
import { apartmentInProgressPropType } from 'proptypes/ApartmentFormPropTypes';
import ApartmentFormRemoveButton from 'components/apartments/apartment/form/buttons/ApartmentFormRemoveButton';
import ApartmentFormResetButton from 'components/apartments/apartment/form/buttons/ApartmentFormResetButton';
import ApartmentFormSubmitButton from 'components/apartments/apartment/form/buttons/ApartmentFormSubmitButton';
import ApartmentFormBackToListButton from 'components/apartments/apartment/form/buttons/ApartmentFormBackToListButton';

// FIXME!!!
const APARTMENT_PROGRESS_REMOVE = 'apartment-progress-remove';

/**
 * @component
 */
const ApartmentFormButtons = React.memo((props) => {
  const {
    isSubmitting,
    onRemove,
    apartmentInProgress,
    submitDisabled,
    submitLabel
  } = props;
  return (
    <React.Fragment>
      <hr className="mb-4 mt-4" />
      <Row form className="mb-2">
        <Col xs={ 4 }>
          <ApartmentFormBackToListButton
            mobileLabel="Powrót"
            label="Powrót do listy"
          />
        </Col>
        <Col xs={ 8 } className="mb-0 d-flex flex-row-reverse">
          <ApartmentFormSubmitButton
            disabled={ submitDisabled }
            isSubmitting={ isSubmitting }
            label={ submitLabel }
          />
          {
            onRemove &&
            <ApartmentFormRemoveButton
              label="Usuń"
              onClick={ onRemove }
              inProgress={ apartmentInProgress === APARTMENT_PROGRESS_REMOVE }
            />
          }
          <ApartmentFormResetButton label="Zresetuj" />
        </Col>
      </Row>
    </React.Fragment>
  );
});

ApartmentFormButtons.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  onRemove: PropTypes.func,
  apartmentInProgress: apartmentInProgressPropType,
  submitDisabled: PropTypes.bool.isRequired,
  submitLabel: PropTypes.string.isRequired,
};

export default ApartmentFormButtons;
