import React from "react";

import { Button } from "reactstrap";

const HostFormResetButton = ({ label }: any) => {
    return (
        <Button color="secondary" type="reset" outline className="mr-2 d-none d-md-inline-block">
            {label}
        </Button>
    );
};

export default HostFormResetButton;
