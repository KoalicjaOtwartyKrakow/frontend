import React from "react";
import PropTypes from "prop-types";

const ApartmentFormSectionHeader = ({ children }) => (
    <React.Fragment>
        <h5 className="mb-3">{children}</h5>
    </React.Fragment>
);

ApartmentFormSectionHeader.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ApartmentFormSectionHeader;
