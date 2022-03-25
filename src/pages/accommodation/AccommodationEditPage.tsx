import React, { useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/Accom... Remove this comment to see the full error message
import AccommodationForm from "components/accommodation/AccommodationForm";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/Accom... Remove this comment to see the full error message
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'hooks/api/accommodationHooks' ... Remove this comment to see the full error message
import { useGetAccommodation, useUpdateAccommodation } from "hooks/api/accommodationHooks";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/CrudProgress' or its... Remove this comment to see the full error message
import { crudInProgressStates, getCrudInProgressState } from "constants/CrudProgress";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Accommodation' or its c... Remove this comment to see the full error message
import Accommodation from "models/Accommodation";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/AppRoutes' or its co... Remove this comment to see the full error message
import { AppRoutes } from "constants/AppRoutes";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guests/GuestList' o... Remove this comment to see the full error message
import GuestList from "components/guests/GuestList";

const AccommodationEditPage = () => {
    const { t } = useTranslation(["accommodation", "guests"]);
    const { addToast } = useToasts();
    const params = useParams();
    const navigate = useNavigate();

    const { accommodation, accommodationGetInProgress, accommodationGetError, retrieveAccommodation } =
        useGetAccommodation();

    const { updatedAccommodation, accommodationUpdateInProgress, accommodationUpdateError, updateAccommodation } =
        useUpdateAccommodation();

    const accommodationInProgress = getCrudInProgressState({
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

            navigate(AppRoutes.ACCOMMODATIONS);
        }
    }, [addToast, navigate, t, updatedAccommodation]);

    const onSubmit = async (values: any, onSubmitError: any) => {
        const accommodation = formFields.formToModel(values);
        console.log("[AccommodationEditPage] Invoked onSubmit() with values:", values);

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
                <InProgress inProgress={accommodationInProgress === crudInProgressStates.RETRIEVE} />
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
