import React from "react";
import PropTypes from "prop-types";

const AccommodationFormSection = ({ children, className = "mb-4" }) => (
    <section className={className}>{children}</section>
);

AccommodationFormSection.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AccommodationFormSection;
