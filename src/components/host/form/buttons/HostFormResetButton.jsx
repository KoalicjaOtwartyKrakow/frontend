import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

const HostFormResetButton = ({ label }) => {
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

HostFormResetButton.propTypes = {
    label: PropTypes.string.isRequired,
};

export default HostFormResetButton;
