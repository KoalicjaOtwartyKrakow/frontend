import React, { useEffect } from "react";
import GuestList from "components/guests/GuestList";
import { Alert, Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import PageCard from "components/atoms/PageCard";
import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";
import GuestListDescription from "components/guests/GuestListDescription";
import RefreshButton from "components/atoms/RefreshButton";
import { useGetGuests } from "hooks/api/guestsHooks";
import HorizontalLine from "components/atoms/HorizontalLine";

const GuestsPage = () => {
    const { guests, guestsGetInProgress, guestsGetError, retrieveGuests } =
        useGetGuests();
    const { t } = useTranslation(["guests"]);

    const guestCount = guests
        ? `(${t("guests:card.found")}: ${guests.length})`
        : "";

    const pageHeader = `${t("guests:card.title")} ${guestCount}`;

    const shouldFetchGuests =
        !guests && !guestsGetError && !guestsGetInProgress;

    useEffect(() => {
        if (shouldFetchGuests) {
            retrieveGuests();
        }
    }, [retrieveGuests, shouldFetchGuests]);

    return (
        <PageCard header={pageHeader}>
            <Row>
                <Col className="d-flex flex-row-reverse">
                    <RefreshButton
                        disabled={guestsGetInProgress}
                        onClick={() => retrieveGuests()}
                    />
                </Col>
            </Row>
            <HorizontalLine />
            <InProgress inProgress={guestsGetInProgress} />
            <PageErrorMessage error={guestsGetError} />
            {guests && (
                <>
                    <GuestListDescription />
                    {guests.length && <GuestList guests={guests} />}
                    {!guests.length && (
                        <Alert color="warning">
                            {t("guests:card.notAvailable")}
                        </Alert>
                    )}
                </>
            )}
        </PageCard>
    );
};

export default GuestsPage;
