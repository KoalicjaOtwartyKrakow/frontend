import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import ProgressIcon from "components/atoms/ProgressIcon";

const AccommodationFormSubmitButton = ({ disabled, isSubmitting, label }) => {
    return (
        <Button
            color="primary"
            type="submit"
            disabled={disabled}
            className="ms-2"
        >
            <ProgressIcon
                className="me-2"
                icon={faCheck}
                inProgress={isSubmitting}
            />
            <span className="fw-semibold">{label}</span>
        </Button>
    );
};

AccommodationFormSubmitButton.propTypes = {
    disabled: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
};

export default AccommodationFormSubmitButton;
