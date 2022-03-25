import React, { useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/PageCard' or ... Remove this comment to see the full error message
import PageCard from "components/atoms/PageCard";
import { useTranslation } from "react-i18next";
import { useToasts } from "react-toast-notifications";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/InProgress' o... Remove this comment to see the full error message
import InProgress from "components/atoms/InProgress";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/PageErrorMess... Remove this comment to see the full error message
import PageErrorMessage from "components/atoms/PageErrorMessage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/PageNavHome' ... Remove this comment to see the full error message
import PageNavigationBackToList from "components/atoms/PageNavHome";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/host/HostForm' or i... Remove this comment to see the full error message
import HostForm from "components/host/HostForm";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/host/HostFormFields... Remove this comment to see the full error message
import { HostFormFields } from "components/host/HostFormFields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'hooks/api/hostHooks' or its co... Remove this comment to see the full error message
import { useGetHost, useUpdateHost } from "hooks/api/hostHooks";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/CrudProgress' or its... Remove this comment to see the full error message
import { crudInProgressStates, getCrudInProgressState } from "constants/CrudProgress";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Host' or its correspond... Remove this comment to see the full error message
import Host from "models/Host";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/AppRoutes' or its co... Remove this comment to see the full error message
import { AppRoutes } from "constants/AppRoutes";

const HostEditPage = () => {
    const { t } = useTranslation(["host"]);
    const { addToast } = useToasts();
    const params = useParams();
    const navigate = useNavigate();

    const { host, hostGetInProgress, hostGetError, retrieveHost } = useGetHost();

    const { updatedHost, hostUpdateInProgress, hostUpdateError, updateHost } = useUpdateHost();

    const hostInProgress = getCrudInProgressState({
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

            navigate(AppRoutes.HOSTS);
        }
    }, [updatedHost, addToast, navigate, t]);

    const onSubmit = async (values: any, onSubmitError: any) => {
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
            <InProgress inProgress={hostInProgress !== crudInProgressStates.NONE} />
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
