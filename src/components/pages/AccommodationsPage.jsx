import React from "react";
import AccommodationList from "components/accommodations/AccommodationList";
import withAccommodation from "components/accommodations/withAccommodation";
import { Alert } from "reactstrap";
import { useTranslation } from "react-i18next";

import PageCard from "components/atoms/PageCard";
import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";

const AccommodationsPage = ({
    accommodations,
    accommodationsErrorMessage,
    accommodationsInProgress,
    accommodationsSuccess,
}) => {
    const { t } = useTranslation();

    const accommodationCount = accommodationsSuccess
        ? `(${t("accommodations.found")}: ${accommodations.length})`
        : "";
    const pageHeader = `${t("accommodations.list")} ${accommodationCount}`;

    return (
        <PageCard header={pageHeader}>
            <InProgress inProgress={accommodationsInProgress} />
            <PageErrorMessage isError={accommodationsErrorMessage}>
                {accommodationsErrorMessage}
            </PageErrorMessage>
            {accommodationsSuccess && (
                <>
                    {accommodations.length && (
                        <AccommodationList accommodations={accommodations} />
                    )}
                    {!accommodations.length && (
                        <Alert color="warning">
                            {t("accommodations.not_found")}
                        </Alert>
                    )}
                </>
            )}
        </PageCard>
    );
};

export default withAccommodation(AccommodationsPage);
