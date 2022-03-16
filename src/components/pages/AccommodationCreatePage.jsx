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
    useCreateAccommodation,
} from "hooks/api/accommodationHooks";
import {
    crudInProgressStates,
    getCrudInProgressState,
} from "constants/CrudProgress";
import Accommodation from "models/Accommodation";
import { Routes } from "constants/Routes";

const AccommodationCreatePage = () => {
    const { t } = useTranslation(["accommodation"]);
    const { addToast } = useToasts();
    //const params = useParams();
    const history = useHistory();

    // const {
    //     accommodation,
    //     accommodationGetInProgress,
    //     accommodationGetError,
    //     retrieveAccommodation,
    // } = useGetAccommodation();

    // const {
    //     updatedAccommodation,
    //     accommodationUpdateInProgress,
    //     accommodationUpdateError,
    //     updateAccommodation,
    // } = useUpdateAccommodation();

    const {
        createdAccommodation,
        accommodationCreateInProgress,
        accommodationCreateError,
        createAccommodation,
    } = useCreateAccommodation();

    const accommodationInProgress = getCrudInProgressState({
        createInProgress: accommodationCreateInProgress,
    });

    const formFields = new AccommodationFormFields();
    const initialValues = {};

    // useEffect(() => {
    //     const { accommodationId } = params;
    //     retrieveAccommodation({ accommodationId });
    // }, [params]);

    useLayoutEffect(() => {
        if (createdAccommodation instanceof Accommodation) {
            addToast(t("accommodation:form.message.createSuccess"), {
                appearance: "success",
            });

            history.push(Routes.ACCOMMODATIONS);
        }
    }, [createdAccommodation]);

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

        console.log("[AccommodationEditPage] Created accommodation:", values);
    };

    return (
        <PageCard header={t("accommodation:card.title.create")}>
            <InProgress
                inProgress={
                    accommodationInProgress !== crudInProgressStates.NONE
                }
            />
            <PageErrorMessage error={accommodationCreateError} />

            <AccommodationForm
                accommodationInProgress={accommodationInProgress}
                initialValues={initialValues}
                onSubmit={onSubmit}
            />

            {/*{!initialValues && (*/}
            {/*    <PageNavigationBackToList to={Routes.ACCOMMODATIONS} />*/}
            {/*)}*/}
        </PageCard>
    );
};

export default AccommodationCreatePage;
