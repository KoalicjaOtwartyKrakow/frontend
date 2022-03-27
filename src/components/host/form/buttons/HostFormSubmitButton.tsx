import React from "react";

import { Button } from "reactstrap";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import ProgressIcon from "components/atoms/ProgressIcon";

const HostFormSubmitButton = ({ disabled, isSubmitting, label }: any) => {
    return (
        <Button color="primary" type="submit" disabled={disabled}>
            <ProgressIcon className="mr-2" icon={faCheck} inProgress={isSubmitting} />
            <span className="fw-semibold">{label}</span>
        </Button>
    );
};

export default HostFormSubmitButton;
