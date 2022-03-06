import React from "react";
import PropTypes from "prop-types";

const AccommodationFormSectionHeader = ({ children }) => (
    <React.Fragment>
        <h5 className="mb-3">{children}</h5>
    </React.Fragment>
);

AccommodationFormSectionHeader.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AccommodationFormSectionHeader;
