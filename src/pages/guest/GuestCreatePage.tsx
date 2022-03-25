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
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/GuestForm' or... Remove this comment to see the full error message
import GuestForm from "components/guest/GuestForm";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/GuestFormFiel... Remove this comment to see the full error message
import { GuestFormFields } from "components/guest/GuestFormFields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'hooks/api/guestHooks' or its c... Remove this comment to see the full error message
import { useCreateGuest } from "hooks/api/guestHooks";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/CrudProgress' or its... Remove this comment to see the full error message
import { crudInProgressStates, getCrudInProgressState } from "constants/CrudProgress";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Guest' or its correspon... Remove this comment to see the full error message
import Guest from "models/Guest";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/AppRoutes' or its co... Remove this comment to see the full error message
import { AppRoutes } from "constants/AppRoutes";

const GuestCreatePage = () => {
    const { t } = useTranslation(["guest"]);
    const { addToast } = useToasts();
    const navigate = useNavigate();

    const { createdGuest, guestCreateInProgress, guestCreateError, createGuest } = useCreateGuest();

    const guestInProgress = getCrudInProgressState({
        createInProgress: guestCreateInProgress,
    });

    const guest = new Guest();
    const formFields = new GuestFormFields();
    const initialValues = formFields.modelToForm(guest);

    useLayoutEffect(() => {
        if (createdGuest instanceof Guest) {
            addToast(t("guest:form.message.createSuccess"), {
                appearance: "success",
            });

            navigate(AppRoutes.GUESTS);
        }
    }, [addToast, createdGuest, navigate, t]);

    const onSubmit = async (values: any, onSubmitError: any) => {
        const guest = formFields.formToModel(values);
        console.log("[GuestCreatePage] Invoked onSubmit() with values:", values);

        const response = await createGuest({ guest });
        if (response?.errors) {
            onSubmitError(response);
            addToast(t("guest:form.message.createFailure"), {
                appearance: "error",
            });
        }

        console.log("[GuestCreatePage] Created guest:", values);
    };

    return (
        <PageCard header={t("guest:card.title.create")}>
            <InProgress inProgress={guestInProgress === crudInProgressStates.RETRIEVE} />
            <PageErrorMessage error={guestCreateError} />

            {initialValues && (
                <GuestForm
                    guestInProgress={guestInProgress === crudInProgressStates.CREATE}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                />
            )}

            {!initialValues && <PageNavigationBackToList to={AppRoutes.GUESTS} />}
        </PageCard>
    );
};

export default GuestCreatePage;
