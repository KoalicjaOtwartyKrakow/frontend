import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageCard from "components/atoms/PageCard";
import { useTranslation } from "react-i18next";
import { useToasts } from "react-toast-notifications";

// import { Toast } from "components/atoms/Toast";
import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";
import PageNavigationBackToList from "components/atoms/PageNavHome";
import HostForm from "components/host/HostForm";
import { HostFormFields } from "components/host/HostFormFields";
import { useCreateHost } from "hooks/api/hostHooks";
import { crudInProgressStates, getCrudInProgressState } from "constants/CrudProgress";
import Host from "models/Host";
import { AppRoutes } from "constants/AppRoutes";

const HostCreatePage = () => {
    const { t } = useTranslation(["host"]);
    const { addToast } = useToasts();
    const navigate = useNavigate();

    const { createdHost, hostCreateInProgress, hostCreateError, createHost } = useCreateHost();

    const hostInProgress = getCrudInProgressState({
        createInProgress: hostCreateInProgress,
    });

    const host = new Host();
    const formFields = new HostFormFields();
    const initialValues = formFields.modelToForm(host);

    useLayoutEffect(() => {
        if (createdHost instanceof Host) {
            addToast(t("host:form.message.createSuccess"), {
                appearance: "success",
            });

            navigate(AppRoutes.HOSTS);
        }
    }, [addToast, createdHost, navigate, t]);

    const onSubmit = async (values, onSubmitError) => {
        const host = formFields.formToModel(values);
        console.log("[HostCreatePage] Invoked onSubmit() with values:", values);

        const response = await createHost({ host });

        if (response?.errors) {
            onSubmitError(response);
            addToast(t("host:form.message.createFailure"), {
                appearance: "error",
            });
        }

        console.log("[HostCreatePage] Created host:", values);
    };

    return (
        <PageCard header={t("host:card.title.create")}>
            <InProgress inProgress={hostInProgress !== crudInProgressStates.NONE} />
            <PageErrorMessage error={hostCreateError} />

            {initialValues && (
                <HostForm hostInProgress={hostInProgress} initialValues={initialValues} onSubmit={onSubmit} />
            )}

            {!initialValues && <PageNavigationBackToList to={AppRoutes.HOSTS} />}
        </PageCard>
    );
};

export default HostCreatePage;
