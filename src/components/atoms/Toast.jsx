import React from "react";
import { useTranslation } from "react-i18next";

const CustomToast = ({ appearance, children }) => {
    const { t } = useTranslation(["common"]);

    const appearanceTitles = {
        success: t("common:toast.success"),
        info: t("common:toast.info"),
        error: t("common:toast.error"),
    };

    const title = appearanceTitles[appearance] || t("common:toast.unknown");

    return (
        <div className="toast-content">
            <h6 className="pb-2 font-weight-bold">{title}</h6>
            <div className="small">{children}</div>
        </div>
    );
};

const toastError = { appearance: "error" };
const toastInfo = { appearance: "info" };
const toastSuccess = { appearance: "info" };

const toastStyle = {
    toastError,
    toastInfo,
    toastSuccess,
};

export { CustomToast, toastStyle };
