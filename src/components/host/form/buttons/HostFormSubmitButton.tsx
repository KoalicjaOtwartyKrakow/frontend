import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/ProgressIcon'... Remove this comment to see the full error message
import ProgressIcon from "components/atoms/ProgressIcon";

const HostFormSubmitButton = ({ disabled, isSubmitting, label }: any) => {
    return (
        <Button color="primary" type="submit" disabled={disabled}>
            <ProgressIcon className="mr-2" icon={faCheck} inProgress={isSubmitting} />
            <span className="fw-semibold">{label}</span>
        </Button>
    );
};

HostFormSubmitButton.propTypes = {
    disabled: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
};

export default HostFormSubmitButton;
