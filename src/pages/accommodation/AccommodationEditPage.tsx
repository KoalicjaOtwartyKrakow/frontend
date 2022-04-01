import React, { useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useToasts } from "react-toast-notifications";
import Accommodation from "models/Accommodation";
import AccommodationForm from "components/accommodation/AccommodationForm";
import GuestList from "components/guests/GuestList";
import InProgress from "components/atoms/InProgress";
import PageCard from "components/atoms/PageCard";
import PageErrorMessage from "components/atoms/PageErrorMessage";
import PageNavigationBackToList from "components/atoms/PageNavHome";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import { AppRoutes } from "constants/AppRoutes";
import { CrudInProgressStates, getCrudInProgress } from "constants/CrudProgress";
import { useGetAccommodation, useUpdateAccommodation } from "hooks/api/accommodationHooks";
import { appConfig } from "constants/AppConfig";

const AccommodationEditPage = () => {
    const { t } = useTranslation(["accommodation", "guests"]);
    const { addToast } = useToasts();
    const params = useParams();
    const navigate = useNavigate();

    const { accommodation, accommodationGetInProgress, accommodationGetError, retrieveAccommodation } =
        useGetAccommodation();

    const { updatedAccommodation, accommodationUpdateInProgress, accommodationUpdateError, updateAccommodation } =
        useUpdateAccommodation();

    const accommodationInProgress = getCrudInProgress({
        retrieveInProgress: accommodationGetInProgress,
        updateInProgress: accommodationUpdateInProgress,
    });

    const formFields = new AccommodationFormFields();
    const initialValues = formFields.modelToForm(accommodation);

    const { accommodationId } = params;

    const shouldFetchAccommodation = !(accommodation || accommodationGetError || accommodationGetInProgress);

    const guests = accommodation?.guests || [];

    const isAssignedGuestsVisible = initialValues && guests.length > 0;

    const guestCount = guests ? `(${t("guests:card.found")}: ${guests.length})` : "";

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

            if (appConfig.routerOverride.accommodations) {
                window.location.href = appConfig.routerOverride.accommodations;
                return;
            }

            navigate(AppRoutes.ACCOMMODATIONS);
        }
    }, [addToast, navigate, t, updatedAccommodation]);

    const onSubmit = async (values: any, onSubmitError: any) => {
        const accommodation = formFields.formToModel(values);
        console.info("[AccommodationEditPage] Invoked onSubmit() with values:", values);

        const response = await updateAccommodation({ accommodation });
        if (response?.errors) {
            onSubmitError(response);
            addToast(t("accommodation:form.message.updateFailure"), {
                appearance: "error",
            });
        }

        console.info("[AccommodationEditPage] Updated accommodation:", values);
    };

    return (
        <>
            <PageCard header={t("accommodation:card.title.update")}>
                <InProgress inProgress={accommodationInProgress === CrudInProgressStates.RETRIEVE} />
                <PageErrorMessage error={accommodationGetError} />
                <PageErrorMessage error={accommodationUpdateError} />

                {initialValues && (
                    <AccommodationForm
                        accommodationInProgress={accommodationInProgress}
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                    />
                )}

                {!initialValues && <PageNavigationBackToList to={AppRoutes.ACCOMMODATIONS} />}
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
