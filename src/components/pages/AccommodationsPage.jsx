import React, { useEffect } from "react";
import AccommodationList from "components/accommodations/AccommodationList";
import { Alert, Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import PageCard from "components/atoms/PageCard";
import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";
import AccommodationListDescription from "components/accommodations/AccommodationListDescription";
import RefreshButton from "components/atoms/RefreshButton";
import { useGetAccommodations } from "hooks/api/accommodationsHooks";
import HorizontalLine from "components/atoms/HorizontalLine";

const AccommodationsPage = () => {
    const {
        accommodations,
        accommodationsGetInProgress,
        accommodationsGetError,
        retrieveAccommodations,
    } = useGetAccommodations();
    const { t } = useTranslation(["accommodations"]);

    const accommodationCount = accommodations
        ? `(${t("accommodations:card.found")}: ${accommodations.length})`
        : "";

    const pageHeader = `${t(
        "accommodations:card.title"
    )} ${accommodationCount}`;

    useEffect(() => {
        if (!accommodations) {
            retrieveAccommodations();
        }
    }, []);

    return (
        <PageCard header={pageHeader}>
            <Row>
                <Col className="d-flex flex-row-reverse">
                    <RefreshButton
                        disabled={accommodationsGetInProgress}
                        onClick={() => retrieveAccommodations()}
                    />
                </Col>
            </Row>
            <HorizontalLine />
            <InProgress inProgress={accommodationsGetInProgress} />
            <PageErrorMessage error={accommodationsGetError} />
            {accommodations && (
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

export default AccommodationsPage;
