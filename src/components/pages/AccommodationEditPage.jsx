import React, { useEffect, useLayoutEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import PageCard from "components/atoms/PageCard";
import { useTranslation } from "react-i18next";
import { useToasts, withToastManager } from "react-toast-notifications";

// import { Toast } from "components/atoms/Toast";
import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";
import PageNavigationAccommodationList from "components/atoms/PageNavHome";
import AccommodationForm from "components/accommodation/AccommodationForm";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import {
    useGetAccommodation,
    useUpdateAccommodation,
} from "hooks/api/accommodationHooks";
import { getInProgressState, inProgressStates } from "constants/Progress";
import Accommodation from "models/Accommodation";
import { Routes } from "constants/Routes";

const AccommodationEditPage = () => {
    const { t } = useTranslation(["accommodation"]);
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

    const accommodationInProgress = getInProgressState({
        createInProgress: accommodationGetInProgress,
        updateInProgress: accommodationUpdateInProgress,
    });

    const formFields = new AccommodationFormFields();
    const initialValues = formFields.modelToForm(accommodation);

    useEffect(() => {
        const { accommodationId } = params;
        retrieveAccommodation({ accommodationId });
    }, [params]);

    useLayoutEffect(() => {
        if (updatedAccommodation instanceof Accommodation) {
            addToast(t("accommodation:form.message.updateSuccess"), {
                appearance: "success",
            });

            history.push(Routes.ACCOMMODATIONS);
        }
    }, [updatedAccommodation]);

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
        <PageCard header={t("accommodation:card.title.update")}>
            <InProgress
                inProgress={accommodationInProgress !== inProgressStates.NONE}
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

            {!initialValues && <PageNavigationAccommodationList />}
        </PageCard>
    );
};

export default AccommodationEditPage;
