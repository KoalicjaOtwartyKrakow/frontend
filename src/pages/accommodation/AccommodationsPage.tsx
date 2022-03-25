import React, { useEffect } from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodations/Acco... Remove this comment to see the full error message
import AccommodationList from "components/accommodations/AccommodationList";
import { Alert, Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/PageCard' or ... Remove this comment to see the full error message
import PageCard from "components/atoms/PageCard";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/InProgress' o... Remove this comment to see the full error message
import InProgress from "components/atoms/InProgress";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/PageErrorMess... Remove this comment to see the full error message
import PageErrorMessage from "components/atoms/PageErrorMessage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodations/Acco... Remove this comment to see the full error message
import AccommodationListDescription from "components/accommodations/AccommodationListDescription";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/RefreshButton... Remove this comment to see the full error message
import RefreshButton from "components/atoms/RefreshButton";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'hooks/api/accommodationsHooks'... Remove this comment to see the full error message
import { useGetAccommodations } from "hooks/api/accommodationsHooks";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/HorizontalLin... Remove this comment to see the full error message
import HorizontalLine from "components/atoms/HorizontalLine";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/buttons/Entit... Remove this comment to see the full error message
import EntityCreateButton from "components/atoms/buttons/EntityCreateButton";
import { useNavigate } from "react-router-dom";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/AppRoutes' or its co... Remove this comment to see the full error message
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
                    {accommodations.length && <AccommodationList accommodations={accommodations} />}
                    {!accommodations.length && <Alert color="warning">{t("accommodations:card.notAvailable")}</Alert>}
                </>
            )}
        </PageCard>
    );
};

export default AccommodationsPage;
