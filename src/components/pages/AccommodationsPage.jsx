import React, { useEffect } from "react";
import AccommodationList from "components/accommodations/AccommodationList";
import { Alert, Button, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import PageCard from "components/atoms/PageCard";
import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";
import AccommodationListDescription from "components/accommodations/AccommodationListDescription";
import RefreshButton from "components/atoms/RefreshButton";
import { useGetAccommodations } from "hooks/api/accommodationsHooks";
import HorizontalLine from "components/atoms/HorizontalLine";
import { Routes } from "constants/Routes";

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
    }, [retrieveAccommodations, accommodations]);

    return (
        <PageCard header={pageHeader}>
            <Row>
                <Col className="d-flex flex-row-reverse">
                    <Button
                        size="lg"
                        tag={Link}
                        to={Routes.ACCOMMODATIONS_CREATE}
                    >
                        {t("accommodations:button.createAccommodation")}
                    </Button>
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
