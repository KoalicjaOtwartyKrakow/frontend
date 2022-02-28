import React from 'react';
import PropTypes from 'prop-types';

const ApartmentFormSection = ({ children, className = "mb-4" }) => (
  <section className={ className }>
    { children }
  </section>
);

ApartmentFormSection.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ApartmentFormSection;
