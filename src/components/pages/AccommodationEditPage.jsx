import React, { useEffect, useLayoutEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import PageCard from "components/atoms/PageCard";
import { useTranslation } from "react-i18next";
import { useToasts } from "react-toast-notifications";

// import { Toast } from "components/atoms/Toast";
import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";
import PageNavigationBackToList from "components/atoms/PageNavHome";
import AccommodationForm from "components/accommodation/AccommodationForm";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import {
    useGetAccommodation,
    useUpdateAccommodation,
} from "hooks/api/accommodationHooks";
import {
    crudInProgressStates,
    getCrudInProgressState,
} from "constants/CrudProgress";
import Accommodation from "models/Accommodation";
import { Routes } from "constants/Routes";
import GuestList from "components/guests/GuestList";

const AccommodationEditPage = () => {
    const { t } = useTranslation(["accommodation", "guests"]);
    const { addToast } = useToasts();
    const params = useParams();
    const history = useHistory();

    const {
        accommodation,
        accommodationGetInProgress,
        accommodationGetError,
        retrieveAccommodation,
    } = useGetAccommodation();

    const {
        updatedAccommodation,
        accommodationUpdateInProgress,
        accommodationUpdateError,
        updateAccommodation,
    } = useUpdateAccommodation();

    const accommodationInProgress = getCrudInProgressState({
        retrieveInProgress: accommodationGetInProgress,
        updateInProgress: accommodationUpdateInProgress,
    });

    const formFields = new AccommodationFormFields();
    const initialValues = formFields.modelToForm(accommodation);

    const { accommodationId } = params;

    const shouldFetchAccommodation = !(
        accommodation ||
        accommodationGetError ||
        accommodationGetInProgress
    );

    const guests = accommodation?.guests || [];

    const isAssignedGuestsVisible = initialValues && guests.length > 0;

    const guestCount = guests
        ? `(${t("guests:card.found")}: ${guests.length})`
        : "";

    const guestCardHeader = `${t("guests:card.title")} ${guestCount}`;

    useEffect(() => {
        if (shouldFetchAccommodation) {
            retrieveAccommodation({ accommodationId });
        }
    }, [accommodationId, retrieveAccommodation, shouldFetchAccommodation]);

    useLayoutEffect(() => {
        if (updatedAccommodation instanceof Accommodation) {
            addToast(t("accommodation:form.message.updateSuccess"), {
                appearance: "success",
            });

            history.push(Routes.ACCOMMODATIONS);
        }
    }, [addToast, history, t, updatedAccommodation]);

    const onSubmit = async (values, onSubmitError) => {
        const accommodation = formFields.formToModel(values);
        console.log(
            "[AccommodationEditPage] Invoked onSubmit() with values:",
            values
        );

        const response = await updateAccommodation({ accommodation });
        if (response?.errors) {
            onSubmitError(response);
            addToast(t("accommodation:form.message.updateFailure"), {
                appearance: "error",
            });
        }

        console.log("[AccommodationEditPage] Updated accommodation:", values);
    };

    return (
        <>
            <PageCard header={t("accommodation:card.title.update")}>
                <InProgress
                    inProgress={
                        accommodationInProgress !== crudInProgressStates.NONE
                    }
                />
                <PageErrorMessage error={accommodationGetError} />
                <PageErrorMessage error={accommodationUpdateError} />

                {initialValues && (
                    <AccommodationForm
                        accommodationInProgress={accommodationInProgress}
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                    />
                )}

                {!initialValues && (
                    <PageNavigationBackToList to={Routes.ACCOMMODATIONS} />
                )}
            </PageCard>
            {isAssignedGuestsVisible && (
                <PageCard header={guestCardHeader} className="mt-3 mb-3">
                    <GuestList guests={accommodation.guests} />
                </PageCard>
            )}
        </>
    );
};

export default AccommodationEditPage;
