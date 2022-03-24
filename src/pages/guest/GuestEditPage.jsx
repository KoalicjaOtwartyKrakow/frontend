import React, { useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageCard from "components/atoms/PageCard";
import { useTranslation } from "react-i18next";
import { useToasts } from "react-toast-notifications";

import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";
import PageNavigationBackToList from "components/atoms/PageNavHome";
import GuestForm from "components/guest/GuestForm";
import { GuestFormFields } from "components/guest/GuestFormFields";
import { useGetGuest, useUpdateGuest } from "hooks/api/guestHooks";
import { crudInProgressStates, getCrudInProgressState } from "constants/CrudProgress";
import Guest from "models/Guest";
import { AppRoutes } from "constants/AppRoutes";
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

    /**
     *
     * @param {GuestAccommodation} accommodation
     */
    const onAccommodationSelected = (accommodation) => {
        console.log("[onAccommodationSelected] Selected guest accommodation: ", accommodation);
        if (!GuestAccommodation.is(accommodation)) {
            addToast(t("guest:form.message.removeGuestFromAccommodationWarning"), {
                appearance: "warning",
            });
        }
    };

    const guestRequestUpdate = async (guest, onSubmitError) => {
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

    const onSubmit = async (values, onSubmitError) => {
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
                <GuestForm
                    guestInProgress={guestInProgress}
                    initialValues={initialValues}
                    onAccommodationSelected={onAccommodationSelected}
                    onSubmit={onSubmit}
                />
            )}

            {!initialValues && <PageNavigationBackToList to={AppRoutes.GUESTS} />}
        </PageCard>
    );
};

export default GuestEditPage;
