import React from "react";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";

/**
 *
 * @param children
 * @param {boolean|undefined} isError
 * @returns {null|JSX.Element}
 * @constructor
 */
const PageErrorMessage = ({ children, isError }) => {
    if (!isError) {
        return null;
    }

    return (
        <Alert color="danger">
            <p>Błąd komunikacji z API. Szczegóły: </p>
            <p>{children}</p>
        </Alert>
    );
};

PageErrorMessage.propTypes = {
    isError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default PageErrorMessage;
