import React from "react";
import PropTypes from "prop-types";

const FormOptionPleaseSelect = ({ value = "" }) => (
    <option value={value} hidden>
        Please select…
    </option>
);

FormOptionPleaseSelect.propTypes = {
    value: PropTypes.any,
};

export default FormOptionPleaseSelect;
