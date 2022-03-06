import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

const AccommodationFormResetButton = ({ label }) => {
    return (
        <Button
            color="secondary"
            type="reset"
            outline
            className="mr-2 d-none d-md-inline-block"
        >
            {label}
        </Button>
    );
};

AccommodationFormResetButton.propTypes = {
    label: PropTypes.string.isRequired,
};

export default AccommodationFormResetButton;
