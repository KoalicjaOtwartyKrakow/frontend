import React from "react";
import PropTypes from "prop-types";

const HostFormSectionHeader = ({ children }) => (
    <React.Fragment>
        <h5 className="mb-3">{children}</h5>
    </React.Fragment>
);

HostFormSectionHeader.propTypes = {
    children: PropTypes.node.isRequired,
};

export default HostFormSectionHeader;
