import React from "react";
import HostList from "components/hosts/HostList";
import withHosts from "components/hosts/withHosts";
import { Alert } from "reactstrap";
import { useTranslation } from "react-i18next";

import PageCard from "components/atoms/PageCard";
import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";
import RefreshButton from "components/atoms/RefreshButton";

const HostsPage = ({
    hosts,
    hostsErrorMessage,
    hostsInProgress,
    hostsSuccess,
    fetchHosts,
}) => {
    const { t } = useTranslation(["host"]);

    const hostCount = hostsSuccess
        ? `(${t("hosts.found")}: ${hosts.length})`
        : "";
    const pageHeader = `${t("hosts.list")} ${hostCount}`;

    return (
        <PageCard header={pageHeader}>
            <RefreshButton
                className="mb-3"
                disabled={hostsInProgress}
                onClick={() => fetchHosts()}
            />
            <InProgress inProgress={hostsInProgress} />
            <PageErrorMessage error={hostsErrorMessage}>
                {hostsErrorMessage}
            </PageErrorMessage>
            {hostsSuccess && (
                <>
                    {hosts.length && <HostList hosts={hosts} />}
                    {!hosts.length && (
                        <Alert color="warning">{t("hosts.not_found")}</Alert>
                    )}
                </>
            )}
        </PageCard>
    );
};

export default withHosts(HostsPage);
