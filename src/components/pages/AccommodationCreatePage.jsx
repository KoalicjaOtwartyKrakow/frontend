import React, { useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import PageCard from "components/atoms/PageCard";
import { useTranslation } from "react-i18next";
import { useToasts } from "react-toast-notifications";

// import { Toast } from "components/atoms/Toast";
import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";
import PageNavigationBackToList from "components/atoms/PageNavHome";
import AccommodationForm from "components/accommodation/AccommodationForm";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import { useCreateAccommodation } from "hooks/api/accommodationHooks";
import {
    crudInProgressStates,
    getCrudInProgressState,
} from "constants/CrudProgress";
import Accommodation from "models/Accommodation";
import { Routes } from "constants/Routes";

const AccommodationCreatePage = () => {
    const { t } = useTranslation(["accommodation"]);
    const { addToast } = useToasts();
    const history = useHistory();

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

            history.push(Routes.ACCOMMODATIONS);
        }
    }, [createAccommodation]);

    const onSubmit = async (values, onSubmitError) => {
        debugger;
        const accommodation = formFields.formToModel(values);
        console.log(
            "[AccommodationCreatePage] Invoked onSubmit() with values:",
            values
        );

        const response = await createAccommodation({ accommodation });
        debugger;
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
            <InProgress
                inProgress={
                    accommodationInProgress !== crudInProgressStates.NONE
                }
            />
            <PageErrorMessage error={accommodationCreateError} />

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
    );
};

export default AccommodationCreatePage;
