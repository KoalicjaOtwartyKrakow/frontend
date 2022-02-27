import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const ApartmentFormResetButton = ({ label }) => {
  return (
    <Button color="secondary" type="reset" outline className="mr-2 d-none d-md-inline-block">
      { label }
    </Button>
  );
};

ApartmentFormResetButton.propTypes = {
  label: PropTypes.string.isRequired,
};

export default ApartmentFormResetButton;
