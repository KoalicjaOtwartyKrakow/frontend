import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import ProgressIcon from 'components/atoms/ProgressIcon';

const ApartmentFormSubmitButton = ({ disabled, isSubmitting, label }) => {
  return (
    <Button color="primary" type="submit" disabled={ disabled }>
      <ProgressIcon className="mr-2" icon={ faCheck } inProgress={ isSubmitting } />
      <span className="font-weight-semibold">{ label }</span>
    </Button>
  );
};

ApartmentFormSubmitButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default ApartmentFormSubmitButton;
