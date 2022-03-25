import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody } from "reactstrap";
import classNames from "classnames";

const FormSection = ({ children, className }: any) => {
    const cardClassName = classNames("form-card", "mb-3", className);
    return (
        <Card className={cardClassName} color="form-card-section">
            <CardBody>{children}</CardBody>
        </Card>
    );
};

FormSection.propTypes = {
    children: PropTypes.node.isRequired,
};

export default FormSection;
