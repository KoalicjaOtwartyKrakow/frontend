import React from "react";
import AccommodationList from "components/accommodations/AccommodationList";
import withAccommodations from "components/accommodations/withAccommodations";
import { Alert } from "reactstrap";
import { useTranslation } from "react-i18next";

import PageCard from "components/atoms/PageCard";
import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";
import AccommodationListDescription from "components/accommodations/AccommodationListDescription";

const AccommodationsPage = ({
    accommodations,
    accommodationsErrorMessage,
    accommodationsInProgress,
    accommodationsSuccess,
}) => {
    const { t } = useTranslation(["accommodations"]);

    const accommodationCount = accommodationsSuccess
        ? `(${t("accommodations:card.found")}: ${accommodations.length})`
        : "";

    const pageHeader = `${t(
        "accommodations:card.title"
    )} ${accommodationCount}`;

    return (
        <PageCard header={pageHeader}>
            <InProgress inProgress={accommodationsInProgress} />
            <PageErrorMessage isError={accommodationsErrorMessage}>
                {accommodationsErrorMessage}
            </PageErrorMessage>
            {accommodationsSuccess && (
                <>
                    <AccommodationListDescription />
                    {accommodations.length && (
                        <AccommodationList accommodations={accommodations} />
                    )}
                    {!accommodations.length && (
                        <Alert color="warning">
                            {t("accommodations:card.notAvailable")}
                        </Alert>
                    )}
                </>
            )}
        </PageCard>
    );
};

export default withAccommodations(AccommodationsPage);
