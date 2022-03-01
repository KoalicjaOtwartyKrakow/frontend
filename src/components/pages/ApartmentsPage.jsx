import React from "react";
import ApartmentList from "components/apartments/ApartmentList";
import withApartments from "components/apartments/Apartments";
import { Alert } from "reactstrap";
import { useTranslation } from "react-i18next";

import PageCard from "components/atoms/PageCard";
import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";

const ApartmentsPage = ({
    apartments,
    apartmentsErrorMessage,
    apartmentsInProgress,
    apartmentsSuccess,
}) => {
    const { t } = useTranslation();

    const apartmentCount = apartmentsSuccess
        ? `(${t("apartments.found")}: ${apartments.length})`
        : "";
    const pageHeader = `${t("apartments.list")} ${apartmentCount}`;

    return (
        <PageCard header={pageHeader}>
            <InProgress inProgress={apartmentsInProgress} />
            <PageErrorMessage isError={apartmentsErrorMessage}>
                {apartmentsErrorMessage}
            </PageErrorMessage>
            {apartmentsSuccess && (
                <>
                    {apartments.length && (
                        <ApartmentList apartments={apartments} />
                    )}
                    {!apartments.length && (
                        <Alert color="warning">
                            {t("apartments.not_found")}
                        </Alert>
                    )}
                </>
            )}
        </PageCard>
    );
};

export default withApartments(ApartmentsPage);
