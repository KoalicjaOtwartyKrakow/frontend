import React, { useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageCard from "components/atoms/PageCard";
import { useTranslation } from "react-i18next";
import { useToasts } from "react-toast-notifications";
import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";
import PageNavigationBackToList from "components/atoms/PageNavHome";
import HostForm from "components/host/HostForm";
import { HostFormFields } from "components/host/HostFormFields";
import { useGetHost, useUpdateHost } from "hooks/api/hostHooks";
import { CrudInProgressStates, getCrudInProgress } from "constants/CrudProgress";
import Host from "models/Host";
import { AppRoutes } from "constants/AppRoutes";
import { appConfig } from "constants/AppConfig";

const HostEditPage = () => {
    const { t } = useTranslation(["host"]);
    const { addToast } = useToasts();
    const params = useParams();
    const navigate = useNavigate();

    const { host, hostGetInProgress, hostGetError, retrieveHost } = useGetHost();

    const { updatedHost, hostUpdateInProgress, hostUpdateError, updateHost } = useUpdateHost();

    const hostInProgress = getCrudInProgress({
        retrieveInProgress: hostGetInProgress,
        updateInProgress: hostUpdateInProgress,
    });

    const formFields = new HostFormFields();
    const initialValues = formFields.modelToForm(host);

    const { hostId } = params;

    const shouldFetchHost = !(host || hostGetError || hostGetInProgress);

    useEffect(() => {
        if (shouldFetchHost) {
            retrieveHost({ hostId });
        }
    }, [hostId, retrieveHost, shouldFetchHost]);

    useLayoutEffect(() => {
        if (updatedHost instanceof Host) {
            addToast(t("host:form.message.updateSuccess"), {
                appearance: "success",
            });

            if (appConfig.routerOverride.hosts) {
                window.location.href = appConfig.routerOverride.hosts;
                return;
            }

            navigate(AppRoutes.HOSTS);
        }
    }, [updatedHost, addToast, navigate, t]);

    const onSubmit = async (values: any, onSubmitError: any) => {
        const host = formFields.formToModel(values);
        console.info("[HostEditPage] Invoked onSubmit() with values:", values);

        const response = await updateHost({ host });
        if (response?.errors) {
            onSubmitError(response);
            addToast(t("host:form.message.updateFailure"), {
                appearance: "error",
            });
        }

        console.info("[HostEditPage] Updated host:", values);
    };

    return (
        <PageCard header={t("host:card.title.update")}>
            <InProgress inProgress={hostInProgress !== CrudInProgressStates.NONE} />
            <PageErrorMessage error={hostGetError} />
            <PageErrorMessage error={hostUpdateError} />

            {initialValues && (
                <HostForm hostInProgress={hostInProgress} initialValues={initialValues} onSubmit={onSubmit} />
            )}

            {!initialValues && <PageNavigationBackToList to={AppRoutes.HOSTS} />}
        </PageCard>
    );
};

export default HostEditPage;
