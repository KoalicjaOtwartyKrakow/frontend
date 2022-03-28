import React from "react";
import { useTranslation } from "react-i18next";
import { DefaultToast, ToastProps } from "react-toast-notifications";

const CustomToast = ({ children, appearance, ...props }: ToastProps) => {
    const { t } = useTranslation(["common"]);

    const appearanceTitles = {
        success: t("common:toast.success"),
        warning: t("common:toast.warning"),
        info: t("common:toast.info"),
        error: t("common:toast.error"),
    } as const;

    // @ts-ignore FIXME
    const title = appearanceTitles[appearance] || t("common:toast.unknown");

    return (
        <DefaultToast appearance={appearance} {...props}>
            <div className="toast-content">
                <h6 className="pb-2 font-weight-bold">{title}</h6>
                <div className="small">{children}</div>
            </div>
        </DefaultToast>
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
