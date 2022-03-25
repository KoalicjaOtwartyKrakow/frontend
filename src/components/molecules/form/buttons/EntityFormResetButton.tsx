import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

const EntityFormResetButton = ({ label, disabled }: any) => {
    return (
        <Button color="secondary" type="reset" outline className="mr-2 d-none d-md-inline-block" disabled={disabled}>
            {label}
        </Button>
    );
};

EntityFormResetButton.propTypes = {
    label: PropTypes.string.isRequired,
};

export default EntityFormResetButton;
