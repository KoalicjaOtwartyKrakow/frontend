import React from "react";
import PropTypes from "prop-types";
import { Alert, UncontrolledAlert } from "reactstrap";
import { useTranslation } from "react-i18next";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'services/Api/constants' or its... Remove this comment to see the full error message
import { ApiClientStatus, ApiErrorTypes } from "services/Api/constants";
import HttpStatus from "http-status-codes";

/**
 *
 * @param children
 * @param {boolean|object|undefined} isError
 * @returns {null|JSX.Element}
 * @constructor
 */
const PageErrorMessage = ({ children, error }: any) => {
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
                [HttpStatus.INTERNAL_SERVER_ERROR]: t("common:errors.internalServerError"),
                [HttpStatus.NOT_FOUND]: t("common:errors.notFound"),
                [HttpStatus.UNAUTHORIZED]: t("common:errors.unauthorized"),
                [HttpStatus.BAD_REQUEST]: t("common:errors.badRequest"),
                [HttpStatus.UNPROCESSABLE_ENTITY]: t("common:errors.unprocessableEntity"),
            };
            message = "" + httpStatusToMessageMap[code];
        }
        if (type === ApiErrorTypes.CLIENT) {
            const clientStatusToMessageMap = {
                [ApiClientStatus.ECONNREFUSED]: t("common:errors.connectionRefused"),
            };
            message = "" + clientStatusToMessageMap[code];
        }
        return (
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'false | "mb-0"' is not assignable to type 's... Remove this comment to see the full error message
            <p className={!children && "mb-0"}>
                {message} ({code.toString()})
            </p>
        );
    };

    return (
        <UncontrolledAlert color="danger">
            <h5>{t("common:errors.apiFailure")}</h5>
            {getApiError()}
            {children && <p>{children}</p>}
        </UncontrolledAlert>
    );
};

PageErrorMessage.propTypes = {
    isError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.object]),
};

export default PageErrorMessage;
