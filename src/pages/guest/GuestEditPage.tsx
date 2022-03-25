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
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/GuestForm' or... Remove this comment to see the full error message
import GuestForm from "components/guest/GuestForm";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/GuestFormFiel... Remove this comment to see the full error message
import { GuestFormFields } from "components/guest/GuestFormFields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'hooks/api/guestHooks' or its c... Remove this comment to see the full error message
import { useGetGuest, useUpdateGuest } from "hooks/api/guestHooks";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/CrudProgress' or its... Remove this comment to see the full error message
import { crudInProgressStates, getCrudInProgressState } from "constants/CrudProgress";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Guest' or its correspon... Remove this comment to see the full error message
import Guest from "models/Guest";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/AppRoutes' or its co... Remove this comment to see the full error message
import { AppRoutes } from "constants/AppRoutes";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/GuestAccommodation' or ... Remove this comment to see the full error message
import GuestAccommodation from "models/GuestAccommodation";

const GuestEditPage = () => {
    const { t } = useTranslation(["guest"]);
    const { addToast } = useToasts();
    const params = useParams();
    const navigate = useNavigate();

    const { guest, guestGetInProgress, guestGetError, retrieveGuest } = useGetGuest();

    const { updatedGuest, guestUpdateInProgress, guestUpdateError, updateGuest } = useUpdateGuest();

    const guestInProgress = getCrudInProgressState({
        retrieveInProgress: guestGetInProgress,
        updateInProgress: guestUpdateInProgress,
    });

    const formFields = new GuestFormFields();
    const initialValues = formFields.modelToForm(guest);

    const { guestId } = params;

    const shouldFetchGuest = !(guest || guestGetError || guestGetInProgress);

    useEffect(() => {
        if (shouldFetchGuest) {
            retrieveGuest({ guestId });
        }
    }, [guestId, retrieveGuest, shouldFetchGuest]);

    useLayoutEffect(() => {
        if (updatedGuest instanceof Guest) {
            addToast(t("guest:form.message.updateSuccess"), {
                appearance: "success",
            });
            navigate(AppRoutes.GUESTS);
        }
    }, [addToast, navigate, t, updatedGuest]);

    const guestRequestUpdate = async (guest: any, onSubmitError: any) => {
        const updateGuestResponse = await updateGuest({ guest });

        if (updateGuestResponse?.errors) {
            onSubmitError(updateGuestResponse);
            addToast(t("guest:form.message.updateFailure"), {
                appearance: "error",
            });

            return;
        }

        console.log("[GuestEditPage] Updated guest:", guest);

        return updateGuestResponse;
    };

    const onSubmit = async (values: any, onSubmitError: any) => {
        const guest = formFields.formToModel(values);

        console.log("[GuestEditPage] Invoked onSubmit() with:", {
            values,
            guest,
        });

        await guestRequestUpdate(guest, onSubmitError);
    };

    return (
        <PageCard header={t("guest:card.title.update")}>
            <InProgress inProgress={guestInProgress === crudInProgressStates.RETRIEVE} />
            <PageErrorMessage error={guestGetError} />
            <PageErrorMessage error={guestUpdateError} />

            {initialValues && (
                <GuestForm guestInProgress={guestInProgress} initialValues={initialValues} onSubmit={onSubmit} />
            )}

            {!initialValues && <PageNavigationBackToList to={AppRoutes.GUESTS} />}
        </PageCard>
    );
};

export default GuestEditPage;
