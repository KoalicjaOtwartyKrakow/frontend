import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/PageCard' or ... Remove this comment to see the full error message
import PageCard from "components/atoms/PageCard";
import { useTranslation } from "react-i18next";
import { useToasts } from "react-toast-notifications";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/PageErrorMess... Remove this comment to see the full error message
import PageErrorMessage from "components/atoms/PageErrorMessage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/PageNavHome' ... Remove this comment to see the full error message
import PageNavigationBackToList from "components/atoms/PageNavHome";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/Accom... Remove this comment to see the full error message
import AccommodationForm from "components/accommodation/AccommodationForm";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/Accom... Remove this comment to see the full error message
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'hooks/api/accommodationHooks' ... Remove this comment to see the full error message
import { useCreateAccommodation } from "hooks/api/accommodationHooks";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/CrudProgress' or its... Remove this comment to see the full error message
import { getCrudInProgressState } from "constants/CrudProgress";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Accommodation' or its c... Remove this comment to see the full error message
import Accommodation from "models/Accommodation";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/AppRoutes' or its co... Remove this comment to see the full error message
import { AppRoutes } from "constants/AppRoutes";

const AccommodationCreatePage = () => {
    const { t } = useTranslation(["accommodation"]);
    const { addToast } = useToasts();
    const navigate = useNavigate();

    const { createdAccommodation, accommodationCreateInProgress, accommodationCreateError, createAccommodation } =
        useCreateAccommodation();

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

    const onSubmit = async (values: any, onSubmitError: any) => {
        const accommodation = formFields.formToModel(values);
        console.log("[AccommodationCreatePage] Invoked onSubmit() with values:", values);

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

            {!initialValues && <PageNavigationBackToList to={AppRoutes.ACCOMMODATIONS} />}
        </PageCard>
    );
};

export default AccommodationCreatePage;
