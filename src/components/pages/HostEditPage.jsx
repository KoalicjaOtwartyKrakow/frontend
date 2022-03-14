import React, { useEffect, useLayoutEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import PageCard from "components/atoms/PageCard";
import { useTranslation } from "react-i18next";
import { useToasts } from "react-toast-notifications";

import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";
import PageNavigationBackToList from "components/atoms/PageNavHome";
import HostForm from "components/host/HostForm";
import { HostFormFields } from "components/host/HostFormFields";
import { useGetHost, useUpdateHost } from "hooks/api/hostHooks";
import {
    crudInProgressStates,
    getCrudInProgressState,
} from "constants/CrudProgress";
import Host from "models/Host";
import { Routes } from "constants/Routes";

const HostEditPage = () => {
    const { t } = useTranslation(["host"]);
    const { addToast } = useToasts();
    const params = useParams();
    const history = useHistory();

    const { host, hostGetInProgress, hostGetError, retrieveHost } =
        useGetHost();

    const { updatedHost, hostUpdateInProgress, hostUpdateError, updateHost } =
        useUpdateHost();

    const hostInProgress = getCrudInProgressState({
        retrieveInProgress: hostGetInProgress,
        updateInProgress: hostUpdateInProgress,
    });

    const formFields = new HostFormFields();
    const initialValues = formFields.modelToForm(host);

    useEffect(() => {
        const { hostId } = params;
        retrieveHost({ hostId });
    }, [params]);

    useLayoutEffect(() => {
        if (updatedHost instanceof Host) {
            addToast(t("host:form.message.updateSuccess"), {
                appearance: "success",
            });

            history.push(Routes.HOSTS);
        }
    }, [updatedHost]);

    const onSubmit = async (values, onSubmitError) => {
        const host = formFields.formToModel(values);
        console.log("[HostEditPage] Invoked onSubmit() with values:", values);

        const response = await updateHost({ host });
        if (response?.errors) {
            onSubmitError(response);
            addToast(t("host:form.message.updateFailure"), {
                appearance: "error",
            });
        }

        console.log("[HostEditPage] Updated host:", values);
    };

    return (
        <PageCard header={t("host:card.title.update")}>
            <InProgress
                inProgress={hostInProgress !== crudInProgressStates.NONE}
            />
            <PageErrorMessage error={hostGetError} />
            <PageErrorMessage error={hostUpdateError} />

            {initialValues && (
                <HostForm
                    hostInProgress={hostInProgress}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                />
            )}

            {!initialValues && <PageNavigationBackToList to={Routes.HOSTS} />}
        </PageCard>
    );
};

export default HostEditPage;
