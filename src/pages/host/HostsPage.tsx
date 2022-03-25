import React, { useEffect } from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/hosts/HostList' or ... Remove this comment to see the full error message
import HostList from "components/hosts/HostList";
import { Alert, Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/PageCard' or ... Remove this comment to see the full error message
import PageCard from "components/atoms/PageCard";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/InProgress' o... Remove this comment to see the full error message
import InProgress from "components/atoms/InProgress";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/PageErrorMess... Remove this comment to see the full error message
import PageErrorMessage from "components/atoms/PageErrorMessage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/hosts/HostListDescr... Remove this comment to see the full error message
import HostListDescription from "components/hosts/HostListDescription";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/RefreshButton... Remove this comment to see the full error message
import RefreshButton from "components/atoms/RefreshButton";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'hooks/api/hostsHooks' or its c... Remove this comment to see the full error message
import { useGetHosts } from "hooks/api/hostsHooks";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/HorizontalLin... Remove this comment to see the full error message
import HorizontalLine from "components/atoms/HorizontalLine";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/buttons/Entit... Remove this comment to see the full error message
import EntityCreateButton from "components/atoms/buttons/EntityCreateButton";
import { useNavigate } from "react-router-dom";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/AppRoutes' or its co... Remove this comment to see the full error message
import { AppRoutes } from "constants/AppRoutes";

const HostsPage = () => {
    const { hosts, hostsGetInProgress, hostsGetError, retrieveHosts } = useGetHosts();
    const { t } = useTranslation(["hosts"]);
    const navigate = useNavigate();

    const hostCount = hosts ? `(${t("hosts:card.found")}: ${hosts.length})` : "";

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
                    <RefreshButton disabled={hostsGetInProgress} onClick={() => retrieveHosts()} />
                </Col>
            </Row>
            <HorizontalLine />
            <InProgress inProgress={hostsGetInProgress} />
            <PageErrorMessage error={hostsGetError} />
            {hosts && (
                <>
                    <HostListDescription />
                    {hosts.length && <HostList hosts={hosts} />}
                    {!hosts.length && <Alert color="warning">{t("hosts:card.notAvailable")}</Alert>}
                </>
            )}
        </PageCard>
    );
};

export default HostsPage;
