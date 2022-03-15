import React, { useEffect, useLayoutEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import PageCard from "components/atoms/PageCard";
import { useTranslation } from "react-i18next";
import { useToasts } from "react-toast-notifications";

// import { Toast } from "components/atoms/Toast";
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

const GuestEditPage = () => {
    const { t } = useTranslation(["guest"]);
    const { addToast } = useToasts();
    const params = useParams();
    const history = useHistory();

    const { guest, guestGetInProgress, guestGetError, retrieveGuest } =
        useGetGuest();

    const {
        updatedGuest,
        guestUpdateInProgress,
        guestUpdateError,
        updateGuest,
    } = useUpdateGuest();

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

    useEffect(() => {
        const { guestId } = params;
        retrieveGuest({ guestId });
    }, [params]);

    useLayoutEffect(() => {
        if (updatedGuest instanceof Guest) {
            addToast(t("guest:form.message.updateSuccess"), {
                appearance: "success",
            });

            history.push(Routes.GUESTS);
        }
    }, [updatedGuest]);

    const onSubmit = async (values, onSubmitError) => {
        const guest = formFields.formToModel(values);
        console.log("[GuestEditPage] Invoked onSubmit() with values:", values);

        const response = await updateGuest({ guest });
        if (response?.errors) {
            onSubmitError(response);
            addToast(t("guest:form.message.updateFailure"), {
                appearance: "error",
            });
        }

        console.log("[GuestEditPage] Updated guest:", values);
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
                    onSubmit={onSubmit}
                />
            )}

            {!initialValues && <PageNavigationBackToList to={Routes.GUESTS} />}
        </PageCard>
    );
};

export default GuestEditPage;
