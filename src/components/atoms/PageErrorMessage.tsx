import React from "react";
import { UncontrolledAlert } from "reactstrap";
import { useTranslation } from "react-i18next";
import HttpStatus from "http-status-codes";
import type { ApiErrorCodeClient, ApiErrors } from "services/Api/types";
import { ApiErrorCodesClient, ApiErrorTypes } from "services/Api/types";
import useApplicationSettings from "hooks/useApplicationSettings";
import { ApplicationSettings } from "components/settings/constants";

interface Props {
    children?: React.ReactNode;
    error: ApiErrors;
}

const PageErrorMessage = ({ children, error }: Props) => {
    const { t } = useTranslation(["common"]);
    const applicationSettings = useApplicationSettings();

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
            // FIXME: better key types
            const httpStatusToMessageMap: Record<number, string> = {
                [HttpStatus.INTERNAL_SERVER_ERROR]: t("common:errors.internalServerError"),
                [HttpStatus.NOT_FOUND]: t("common:errors.notFound"),
                [HttpStatus.UNAUTHORIZED]: t("common:errors.unauthorized"),
                [HttpStatus.BAD_REQUEST]: t("common:errors.badRequest"),
                [HttpStatus.UNPROCESSABLE_ENTITY]: t("common:errors.unprocessableEntity"),
            };
            message = `${httpStatusToMessageMap[code as number]}`;
        }
        if (type === ApiErrorTypes.CLIENT) {
            const networkTimeout = applicationSettings.get(ApplicationSettings.NETWORK_TIMEOUT);
            // FIXME: better key types
            const clientStatusToMessageMap: Record<string, string> = {
                [ApiErrorCodesClient.ECONNREFUSED]: t("common:errors.connectionRefused"),
                [ApiErrorCodesClient.ETIMEDOUT]: t("common:errors.connectionTimeout", { count: networkTimeout }),
            };
            message = `${clientStatusToMessageMap[code as ApiErrorCodeClient]}`;
        }

        if (message.trim() === "") {
            message = t("common:errors.unhandledApiError");
        }

        return (
            <p className={!children ? "mb-0" : undefined}>
                {message}. ({code.toString()})
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

export default PageErrorMessage;
