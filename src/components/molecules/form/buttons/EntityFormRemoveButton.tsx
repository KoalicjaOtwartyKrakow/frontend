import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/ProgressIcon'... Remove this comment to see the full error message
import ProgressIcon from "components/atoms/ProgressIcon";

const EntityFormRemoveButton = ({ label, onClick, inProgress }: any) => {
    return (
        <Button color="danger" type="button" className="mr-1 mr-md-2" onClick={onClick} disabled={inProgress}>
            <ProgressIcon icon={faTrash} inProgress={inProgress} />
            <span className="d-none d-sm-inline">{label}</span>
        </Button>
    );
};

EntityFormRemoveButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
};

export default EntityFormRemoveButton;
