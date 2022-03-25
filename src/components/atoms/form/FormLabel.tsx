import React from "react";
import { Label } from "reactstrap";
import classNames from "classnames";

const FormLabel = ({ children, className, required = false, ...props }) => {
    const labelClassName = classNames(className, { required });
    return (
        <Label className={labelClassName} {...props}>
            {children}
            {":"}
        </Label>
    );
};

export default FormLabel;
