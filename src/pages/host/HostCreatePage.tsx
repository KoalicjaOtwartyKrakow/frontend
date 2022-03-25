import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/PageCard' or ... Remove this comment to see the full error message
import PageCard from "components/atoms/PageCard";
import { useTranslation } from "react-i18next";
import { useToasts } from "react-toast-notifications";

// import { Toast } from "components/atoms/Toast";
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
import { useCreateHost } from "hooks/api/hostHooks";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/CrudProgress' or its... Remove this comment to see the full error message
import { crudInProgressStates, getCrudInProgressState } from "constants/CrudProgress";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Host' or its correspond... Remove this comment to see the full error message
import Host from "models/Host";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/AppRoutes' or its co... Remove this comment to see the full error message
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

    const onSubmit = async (values: any, onSubmitError: any) => {
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
