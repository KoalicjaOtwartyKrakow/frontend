import PropTypes from "prop-types";
import React from "react";
import { Routes } from "constants/Routes";
import { Button } from "reactstrap";
import { compose } from "redux";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import withHistoryBackButtonOptions from "components/atoms/WithHistoryBackButtonOptions";

const AccommodationFormBackToListButton = ({ label, mobileLabel, ...rest }) => {
    return (
        <Button
            color="secondary"
            type="button"
            className="mr-0 mr-md-2"
            {...rest}
        >
            <FontAwesomeIcon icon={faCaretLeft} />{" "}
            <span className="d-inline d-sm-none">{mobileLabel}</span>
            <span className="d-none d-sm-inline">{label}</span>
        </Button>
    );
};

AccommodationFormBackToListButton.propTypes = {
    label: PropTypes.string.isRequired,
    mobileLabel: PropTypes.string.isRequired,
};

export default compose(withHistoryBackButtonOptions)(
    AccommodationFormBackToListButton,
    { to: Routes.ACCOMMODATIONS }
);
