import React from "react";
import { Button } from "reactstrap";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ProgressIcon from "components/atoms/ProgressIcon";

const HostFormRemoveButton = ({ label, onClick, inProgress }: any) => {
    return (
        <Button color="danger" type="button" className="mr-1 mr-md-2" onClick={onClick} disabled={inProgress}>
            <ProgressIcon icon={faTrash} inProgress={inProgress} />
            <span className="d-none d-sm-inline">{label}</span>
        </Button>
    );
};

export default HostFormRemoveButton;
