import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageCard from "components/atoms/PageCard";
import { useTranslation } from "react-i18next";
import { useToasts } from "react-toast-notifications";

import PageErrorMessage from "components/atoms/PageErrorMessage";
import PageNavigationBackToList from "components/atoms/PageNavHome";
import AccommodationForm from "components/accommodation/AccommodationForm";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import { useCreateAccommodation } from "hooks/api/accommodationHooks";
import {
    getCrudInProgressState,
} from "constants/CrudProgress";
import Accommodation from "models/Accommodation";
import { AppRoutes } from "constants/AppRoutes";

const AccommodationCreatePage = () => {
    const { t } = useTranslation(["accommodation"]);
    const { addToast } = useToasts();
    const navigate = useNavigate();

    const {
        createdAccommodation,
        accommodationCreateInProgress,
        accommodationCreateError,
        createAccommodation,
    } = useCreateAccommodation();

    const accommodationInProgress = getCrudInProgressState({
        createInProgress: accommodationCreateInProgress,
    });

    const accommodation = new Accommodation();
    const formFields = new AccommodationFormFields();
    const initialValues = formFields.modelToForm(accommodation);

    useLayoutEffect(() => {
        if (createdAccommodation instanceof Accommodation) {
            addToast(t("accommodation:form.message.createSuccess"), {
                appearance: "success",
            });

            navigate(AppRoutes.ACCOMMODATIONS);
        }
    }, [addToast, createdAccommodation, navigate, t]);

    const onSubmit = async (values, onSubmitError) => {
        const accommodation = formFields.formToModel(values);
        console.log(
            "[AccommodationCreatePage] Invoked onSubmit() with values:",
            values
        );

        const response = await createAccommodation({ accommodation });

        if (response?.errors) {
            onSubmitError(response);
            addToast(t("accommodation:form.message.createFailure"), {
                appearance: "error",
            });
        }

        console.log("[AccommodationCreatePage] Created accommodation:", values);
    };

    return (
        <PageCard header={t("accommodation:card.title.create")}>
            <PageErrorMessage error={accommodationCreateError} />

            {initialValues && (
                <AccommodationForm
                    accommodationInProgress={accommodationInProgress}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                />
            )}

            {!initialValues && (
                <PageNavigationBackToList to={AppRoutes.ACCOMMODATIONS} />
            )}
        </PageCard>
    );
};

export default AccommodationCreatePage;
