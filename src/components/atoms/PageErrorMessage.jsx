import React from "react";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";
import { useTranslation } from "react-i18next";
import { ApiClientStatus, ApiErrorTypes } from "services/Api/constants";
import HttpStatus from "http-status-codes";

/**
 *
 * @param children
 * @param {boolean|object|undefined} isError
 * @returns {null|JSX.Element}
 * @constructor
 */
const PageErrorMessage = ({ children, error }) => {
    const { t } = useTranslation(["common"]);

    if (!error) {
        return null;
    }

    const getApiError = () => {
        if (!error.status) {
            return null;
        }

        const { type, code } = error.status;
        let message = "";

        if (type === ApiErrorTypes.SERVER) {
            const httpStatusToMessageMap = {
                [HttpStatus.NOT_FOUND]: t("common:errors.notFound"),
            };
            message = "" + httpStatusToMessageMap[code];
        }
        if (type === ApiErrorTypes.CLIENT) {
            const clientStatusToMessageMap = {
                [ApiClientStatus.ECONNREFUSED]: t(
                    "common:errors.connectionRefused"
                ),
            };
            message = "" + clientStatusToMessageMap[code];
        }
        debugger;
        return (
            <p className={!children && "mb-0"}>
                {message} ({code.toString()})
            </p>
        );
    };

    return (
        <Alert color="danger">
            <h5>{t("common:errors.apiFailure")}</h5>
            {getApiError()}
            {children && <p>{children}</p>}
        </Alert>
    );
};

PageErrorMessage.propTypes = {
    isError: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
        PropTypes.object,
    ]),
};

export default PageErrorMessage;
