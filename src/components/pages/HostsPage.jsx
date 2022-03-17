import React, { useEffect } from "react";
import HostList from "components/hosts/HostList";
import { Alert, Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import PageCard from "components/atoms/PageCard";
import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";
import HostListDescription from "components/hosts/HostListDescription";
import RefreshButton from "components/atoms/RefreshButton";
import { useGetHosts } from "hooks/api/hostsHooks";
import HorizontalLine from "components/atoms/HorizontalLine";
import EntityCreateButton from "components/atoms/buttons/EntityCreateButton";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "constants/AppRoutes";

const HostsPage = () => {
    const { hosts, hostsGetInProgress, hostsGetError, retrieveHosts } =
        useGetHosts();
    const { t } = useTranslation(["hosts"]);
    const navigate = useNavigate();

    const hostCount = hosts
        ? `(${t("hosts:card.found")}: ${hosts.length})`
        : "";

    const pageHeader = `${t("hosts:card.title")} ${hostCount}`;

    const shouldFetchHosts = !hosts && !hostsGetError && !hostsGetInProgress;

    useEffect(() => {
        if (shouldFetchHosts) {
            retrieveHosts();
        }
    }, [retrieveHosts, shouldFetchHosts]);

    const navigateToCreatePage = () => {
        navigate(AppRoutes.HOST_CREATE);
    };

    return (
        <PageCard header={pageHeader}>
            <Row>
                <Col className="d-flex flex-row-reverse">
                    <EntityCreateButton
                        onClick={navigateToCreatePage}
                        label={t("hosts:button.create")}
                        className="ms-2"
                    />
                    <RefreshButton
                        disabled={hostsGetInProgress}
                        onClick={() => retrieveHosts()}
                    />
                </Col>
            </Row>
            <HorizontalLine />
            <InProgress inProgress={hostsGetInProgress} />
            <PageErrorMessage error={hostsGetError} />
            {hosts && (
                <>
                    <HostListDescription />
                    {hosts.length && <HostList hosts={hosts} />}
                    {!hosts.length && (
                        <Alert color="warning">
                            {t("hosts:card.notAvailable")}
                        </Alert>
                    )}
                </>
            )}
        </PageCard>
    );
};

export default HostsPage;
