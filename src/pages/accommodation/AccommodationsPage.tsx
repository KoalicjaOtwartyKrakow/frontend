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
import EntityCreateButton from "components/atoms/buttons/EntityCreateButton";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "constants/AppRoutes";

const AccommodationsPage = () => {
    const { accommodations, accommodationsGetInProgress, accommodationsGetError, retrieveAccommodations } =
        useGetAccommodations();
    const { t } = useTranslation(["accommodations"]);
    const navigate = useNavigate();

    const accommodationCount = accommodations ? `(${t("accommodations:card.found")}: ${accommodations.length})` : "";

    const pageHeader = `${t("accommodations:card.title")} ${accommodationCount}`;

    const shouldFetchAccommodations = !accommodations && !accommodationsGetError && !accommodationsGetInProgress;

    useEffect(() => {
        if (shouldFetchAccommodations) {
            retrieveAccommodations();
        }
    }, [retrieveAccommodations, shouldFetchAccommodations]);

    const navigateToCreatePage = () => {
        navigate(AppRoutes.ACCOMMODATION_CREATE);
    };

    return (
        <PageCard header={pageHeader}>
            <Row>
                <Col className="d-flex flex-row-reverse">
                    <EntityCreateButton
                        onClick={navigateToCreatePage}
                        label={t("accommodations:button.create")}
                        className="ms-2"
                    />
                    <RefreshButton disabled={accommodationsGetInProgress} onClick={() => retrieveAccommodations()} />
                </Col>
            </Row>
            <HorizontalLine />
            <InProgress inProgress={accommodationsGetInProgress} />
            <PageErrorMessage error={accommodationsGetError} />
            {accommodations && (
                <>
                    <AccommodationListDescription />
                    {accommodations.length > 0 && <AccommodationList accommodations={accommodations} />}
                    {!accommodations.length && <Alert color="warning">{t("accommodations:card.notAvailable")}</Alert>}
                </>
            )}
        </PageCard>
    );
};

export default AccommodationsPage;
