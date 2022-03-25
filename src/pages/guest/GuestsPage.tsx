import React, { useEffect } from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guests/GuestList' o... Remove this comment to see the full error message
import GuestList from "components/guests/GuestList";
import { Alert, Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/PageCard' or ... Remove this comment to see the full error message
import PageCard from "components/atoms/PageCard";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/InProgress' o... Remove this comment to see the full error message
import InProgress from "components/atoms/InProgress";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/PageErrorMess... Remove this comment to see the full error message
import PageErrorMessage from "components/atoms/PageErrorMessage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guests/GuestListDes... Remove this comment to see the full error message
import GuestListDescription from "components/guests/GuestListDescription";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/RefreshButton... Remove this comment to see the full error message
import RefreshButton from "components/atoms/RefreshButton";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'hooks/api/guestsHooks' or its ... Remove this comment to see the full error message
import { useGetGuests } from "hooks/api/guestsHooks";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/HorizontalLin... Remove this comment to see the full error message
import HorizontalLine from "components/atoms/HorizontalLine";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/buttons/Entit... Remove this comment to see the full error message
import EntityCreateButton from "components/atoms/buttons/EntityCreateButton";
import { useNavigate } from "react-router-dom";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/AppRoutes' or its co... Remove this comment to see the full error message
import { AppRoutes } from "constants/AppRoutes";

const GuestsPage = () => {
    const { guests, guestsGetInProgress, guestsGetError, retrieveGuests } = useGetGuests();
    const { t } = useTranslation(["guests"]);
    const navigate = useNavigate();

    const guestCount = guests ? `(${t("guests:card.found")}: ${guests.length})` : "";

    const pageHeader = `${t("guests:card.title")} ${guestCount}`;

    const shouldFetchGuests = !guests && !guestsGetError && !guestsGetInProgress;

    useEffect(() => {
        if (shouldFetchGuests) {
            retrieveGuests();
        }
    }, [retrieveGuests, shouldFetchGuests]);

    const navigateToCreatePage = () => {
        navigate(AppRoutes.GUEST_CREATE);
    };

    return (
        <PageCard header={pageHeader}>
            <Row>
                <Col className="d-flex flex-row-reverse">
                    <EntityCreateButton
                        onClick={navigateToCreatePage}
                        label={t("guests:button.create")}
                        className="ms-2"
                    />
                    <RefreshButton disabled={guestsGetInProgress} onClick={() => retrieveGuests()} />
                </Col>
            </Row>
            <HorizontalLine />
            <InProgress inProgress={guestsGetInProgress} />
            <PageErrorMessage error={guestsGetError} />
            {guests && (
                <>
                    <GuestListDescription />
                    {guests.length && <GuestList guests={guests} />}
                    {!guests.length && <Alert color="warning">{t("guests:card.notAvailable")}</Alert>}
                </>
            )}
        </PageCard>
    );
};

export default GuestsPage;
