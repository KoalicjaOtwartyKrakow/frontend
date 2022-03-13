import React from "react";
import GuestList from "components/guests/GuestList";
import withGuests from "components/guests/withGuests";
import { Alert } from "reactstrap";
import { useTranslation } from "react-i18next";

import PageCard from "components/atoms/PageCard";
import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";
import GuestListDescription from "components/guests/GuestListDescription";

const GuestsPage = ({
    guests,
    guestsErrorMessage,
    guestsInProgress,
    guestsSuccess,
}) => {
    const { t } = useTranslation(["guests"]);

    const guestCount = guestsSuccess
        ? `(${t("guests:card.found")}: ${guests.length})`
        : "";
    const pageHeader = `${t("guests:card.title")} ${guestCount}`;

    return (
        <PageCard header={pageHeader}>
            <InProgress inProgress={guestsInProgress} />
            <PageErrorMessage isError={guestsErrorMessage}>
                {guestsErrorMessage}
            </PageErrorMessage>
            {guestsSuccess && (
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

export default withGuests(GuestsPage);
