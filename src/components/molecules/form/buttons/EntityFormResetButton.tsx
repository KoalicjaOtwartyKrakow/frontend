import React from "react";
import { Button } from "reactstrap";

interface Props {
    disabled: boolean;
    label: string;
}

const EntityFormResetButton = ({ label, disabled }: Props) => {
    return (
        <Button color="secondary" type="reset" outline className="mr-2 d-none d-md-inline-block" disabled={disabled}>
            {label}
        </Button>
    );
};

export default EntityFormResetButton;
