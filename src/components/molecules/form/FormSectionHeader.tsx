import React from "react";
import PropTypes from "prop-types";

const FormSectionHeader = ({ children }: any) => (
    <React.Fragment>
        <h5 className="mb-3">{children}</h5>
    </React.Fragment>
);

FormSectionHeader.propTypes = {
    children: PropTypes.node.isRequired,
};

export default FormSectionHeader;
