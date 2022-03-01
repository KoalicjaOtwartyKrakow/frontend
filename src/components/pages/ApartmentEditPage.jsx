import React, { useEffect } from "react";
import { useParams, useLocation, matchPath } from "react-router-dom";
import withApartments from "components/apartments/Apartments";
import PageCard from "components/atoms/PageCard";
import { Alert } from "reactstrap";
import { useTranslation } from "react-i18next";

import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";
import PageNavigationApartmentList from "components/atoms/PageNavHome";
import ApartmentForm from "components/apartment/ApartmentForm";
import Routes from "constants/Routes";
import memoize from "lodash-es/memoize";
import { ApartmentFormFields } from "components/apartment/ApartmentFormFields";
import Apartment from "models/Apartment";

const ApartmentEditPage = ({
    apartments,
    apartmentsErrorMessage,
    apartmentsInProgress,
    apartmentsSuccess,
}) => {
    const params = useParams();
    const location = useLocation();

    const { apartmentId } = params;

    const hasApartments = apartmentsSuccess && apartments.length > 0;
    const isRouteApartmentPresent = apartments.some(
        (apartment) => apartment.id === apartmentId
    );
    const showEditForm = hasApartments && isRouteApartmentPresent;
    const showApartmentNotFoundVisible =
        hasApartments && !isRouteApartmentPresent;

    let initialValues = {};

    const onSubmit = () => {};

    const updateInitialValuesFromLocation = () => {
        const options = {
            exact: false,
            strict: false,
        };

        const { pathname } = location;

        const editPath = matchPath(pathname, {
            ...options,
            path: Routes.APARTMENTS_EDIT,
        });
        const createPath = matchPath(pathname, {
            ...options,
            path: Routes.APARTMENTS_CREATE,
        });

        const getInitialValues = memoize(ApartmentFormFields.getInitialValues);

        if (editPath !== null && isRouteApartmentPresent) {
            const apartmentId = editPath.params.apartmentId;
            const apartment = apartments.find(
                (item) => item.id === apartmentId
            );
            initialValues = getInitialValues(apartment);
        }

        if (createPath !== null) {
            const apartment = new Apartment();
            initialValues = getInitialValues(apartment);
        }
    };

    useEffect(updateInitialValuesFromLocation, [
        location,
        isRouteApartmentPresent,
    ]);

    const { t } = useTranslation();

    return (
        <PageCard header={t("apartment.edit")}>
            <InProgress inProgress={apartmentsInProgress} />
            <PageErrorMessage isError={apartmentsErrorMessage}>
                {apartmentsErrorMessage}
            </PageErrorMessage>
            {showApartmentNotFoundVisible && (
                <Alert color="warning">{t("apartment.not_found")}</Alert>
            )}
            {showEditForm && (
                <ApartmentForm
                    apartmentInProgress={"FIXME_PUT_PROGRESS_TYPE_HERE"}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                />
            )}
            <PageNavigationApartmentList />
        </PageCard>
    );
};

export default withApartments(ApartmentEditPage);
