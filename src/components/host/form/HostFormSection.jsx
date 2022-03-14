import React from "react";
import PropTypes from "prop-types";

const HostFormSection = ({ children, className = "mb-4" }) => (
    <section className={className}>{children}</section>
);

HostFormSection.propTypes = {
    children: PropTypes.node.isRequired,
};

export default HostFormSection;
