import PropTypes from "prop-types";
import React from "react";
import { AppRoutes } from "constants/AppRoutes";
import { Button } from "reactstrap";
import { compose } from "redux";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import withHistoryBackButtonOptions from "components/atoms/WithHistoryBackButtonOptions";

const HostFormBackToListButton = ({ label, mobileLabel, ...rest }) => {
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

HostFormBackToListButton.propTypes = {
    label: PropTypes.string.isRequired,
    mobileLabel: PropTypes.string.isRequired,
};

export default compose(withHistoryBackButtonOptions)(HostFormBackToListButton, {
    to: AppRoutes.HOSTS,
});
