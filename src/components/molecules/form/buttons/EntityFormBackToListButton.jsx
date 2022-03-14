import PropTypes from "prop-types";
import React from "react";
import { Routes } from "constants/Routes";
import { Button } from "reactstrap";
import { compose } from "redux";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import withHistoryBackButtonOptions from "components/atoms/WithHistoryBackButtonOptions";

const EntityFormBackToListButton = ({ label, mobileLabel, ...rest }) => {
    return (
        <Button
            color="secondary"
            type="button"
            className="ms-0 ms-md-2"
            {...rest}
        >
            <FontAwesomeIcon icon={faCaretLeft} className="me-2" />
            <span className="d-inline d-sm-none">{mobileLabel}</span>
            <span className="d-none d-sm-inline">{label}</span>
        </Button>
    );
};

EntityFormBackToListButton.propTypes = {
    label: PropTypes.string.isRequired,
    mobileLabel: PropTypes.string.isRequired,
};

export default compose(withHistoryBackButtonOptions)(
    EntityFormBackToListButton,
    { to: Routes.ACCOMMODATIONS }
);
