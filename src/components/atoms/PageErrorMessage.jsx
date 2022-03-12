import React from "react";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";
import { useTranslation } from "react-i18next";

/**
 *
 * @param children
 * @param {boolean|undefined} isError
 * @returns {null|JSX.Element}
 * @constructor
 */
const PageErrorMessage = ({ children, isError }) => {
    const { t } = useTranslation(["common"]);

    if (!isError) {
        return null;
    }

    return (
        <Alert color="danger">
            <p>{t("common:errors:apiFailure")} </p>
            <p>{children}</p>
        </Alert>
    );
};

PageErrorMessage.propTypes = {
    isError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default PageErrorMessage;
