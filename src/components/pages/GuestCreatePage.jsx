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
import { useCreateGuest } from "hooks/api/guestHooks";
import {
    crudInProgressStates,
    getCrudInProgressState,
} from "constants/CrudProgress";
import Guest from "models/Guest";
import { Routes } from "constants/Routes";

const GuestCreatePage = () => {
    const { t } = useTranslation(["guest"]);
    const { addToast } = useToasts();
    const history = useHistory();

    const {
        createdGuest,
        guestCreateInProgress,
        guestCreateError,
        createGuest,
    } = useCreateGuest();

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

            history.push(Routes.GUESTS);
        }
    }, [createGuest]);

    const onSubmit = async (values, onSubmitError) => {
        const guest = formFields.formToModel(values);
        console.log(
            "[GuestCreatePage] Invoked onSubmit() with values:",
            values
        );

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
            <InProgress
                inProgress={guestInProgress !== crudInProgressStates.NONE}
            />
            <PageErrorMessage error={guestCreateError} />

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

export default GuestCreatePage;
