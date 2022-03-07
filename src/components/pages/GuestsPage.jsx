import React from "react";
import GuestList from "components/guests/GuestList";
import withGuests from "components/guests/withGuests";
import { Alert } from "reactstrap";
import { useTranslation } from "react-i18next";

import PageCard from "components/atoms/PageCard";
import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";

const GuestsPage = ({
    guests,
    guestsErrorMessage,
    guestsInProgress,
    guestsSuccess,
}) => {
    const { t } = useTranslation();

    const guestCount = guestsSuccess
        ? `(${t("guests.found")}: ${guests.length})`
        : "";
    const pageHeader = `${t("guests.list")} ${guestCount}`;

    return (
        <PageCard header={pageHeader}>
            <InProgress inProgress={guestsInProgress} />
            <PageErrorMessage isError={guestsErrorMessage}>
                {guestsErrorMessage}
            </PageErrorMessage>
            {guestsSuccess && (
                <>
                    {guests.length && <GuestList guests={guests} />}
                    {!guests.length && (
                        <Alert color="warning">{t("guests.not_found")}</Alert>
                    )}
                </>
            )}
        </PageCard>
    );
};

export default withGuests(GuestsPage);
