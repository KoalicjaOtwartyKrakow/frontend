import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import PageCard from "components/atoms/PageCard";
import { useTranslation } from "react-i18next";
import { useToasts } from "react-toast-notifications";

import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";
import PageNavigationBackToList from "components/atoms/PageNavHome";
import GuestForm from "components/guest/GuestForm";
import { GuestFormFields } from "components/guest/GuestFormFields";
import { useGetGuest, useUpdateGuest } from "hooks/api/guestHooks";
import {
    crudInProgressStates,
    getCrudInProgressState,
} from "constants/CrudProgress";
import Guest from "models/Guest";
import { Routes } from "constants/Routes";
import { useAddGuestToAccommodation } from "hooks/api/accommodationHooks";
import Accommodation from "models/Accommodation";

const GuestEditPage = () => {
    const { t } = useTranslation(["guest"]);
    const { addToast } = useToasts();
    const params = useParams();
    const history = useHistory();
    const selectedAccommodation = useRef(undefined);

    const { guest, guestGetInProgress, guestGetError, retrieveGuest } =
        useGetGuest();

    const {
        updatedGuest,
        guestUpdateInProgress,
        guestUpdateError,
        updateGuest,
    } = useUpdateGuest();

    const {
        accommodationAddGuest,
        accommodationAddGuestInProgress,
        // accommodationAddGuestsUpdateError,
        addGuestToAccommodation,
    } = useAddGuestToAccommodation();

    const guestInProgress = getCrudInProgressState({
        retrieveInProgress: guestGetInProgress,
        updateInProgress:
            guestUpdateInProgress || accommodationAddGuestInProgress,
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

            history.push(Routes.GUESTS);
        }
    }, [addToast, history, t, updatedGuest]);

    useLayoutEffect(() => {
        if (accommodationAddGuest instanceof Accommodation) {
            addToast(t("guest:form.message.addGuestToAccommodationSuccess"), {
                appearance: "info",
            });
        }
    }, [accommodationAddGuest, addToast, history, t, updatedGuest]);

    /**
     *
     * @param {Accommodation} accommodation
     */
    const onAccommodationSelected = (accommodation) => {
        selectedAccommodation.current = accommodation;
    };

    const guestRequestBindToAccommodation = async (accommodation) => {
        if (!(accommodation instanceof Accommodation)) {
            return;
        }
        const addGuestResponse = await addGuestToAccommodation({
            accommodation,
            guest,
        });

        if (addGuestResponse?.errors) {
            addToast(t("guest:form.message.addGuestToAccommodationFailure"), {
                appearance: "error",
            });
        } else {
            console.log(
                "[GuestEditPage] Guest bound to accommodation:",
                accommodation
            );
        }

        return addGuestResponse;
    };

    const guestRequestUpdate = async (accommodation, onSubmitError) => {
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
        const accommodation = selectedAccommodation.current;

        console.log("[GuestEditPage] Invoked onSubmit() with:", {
            values,
            accommodation,
        });

        await guestRequestBindToAccommodation(accommodation);
        await guestRequestUpdate(guest, onSubmitError);
    };

    return (
        <PageCard header={t("guest:card.title.update")}>
            <InProgress
                inProgress={guestInProgress !== crudInProgressStates.NONE}
            />
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

            {!initialValues && <PageNavigationBackToList to={Routes.GUESTS} />}
        </PageCard>
    );
};

export default GuestEditPage;
