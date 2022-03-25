import PropTypes from "prop-types";
import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/AppRoutes' or its co... Remove this comment to see the full error message
import { AppRoutes } from "constants/AppRoutes";
import { Button } from "reactstrap";
import { compose } from "redux";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/WithHistoryBa... Remove this comment to see the full error message
import withHistoryBackButtonOptions from "components/atoms/WithHistoryBackButtonOptions";

const EntityFormBackToListButton = ({ label, mobileLabel, ...rest }: any) => {
    return (
        <Button color="secondary" type="button" className="ms-0 ms-md-2" {...rest}>
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

export default compose(withHistoryBackButtonOptions)(EntityFormBackToListButton, { to: AppRoutes.ACCOMMODATIONS });
