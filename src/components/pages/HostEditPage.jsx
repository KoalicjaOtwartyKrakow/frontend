import React from "react";
import { matchPath, Redirect } from "react-router-dom";
import PageCard from "components/atoms/PageCard";
import compose from "just-compose";
import { Alert } from "reactstrap";
import { withTranslation } from "react-i18next";
import memoize from "lodash-es/memoize";

import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";
import PageNavigationBackToList from "components/atoms/PageNavHome";
import { Routes } from "constants/Routes";
import { classToPlain } from "serializers/Serializer";
import withHosts from "components/hosts/withHosts";
import HostForm from "components/host/HostForm";
import { HostFormFields } from "components/host/HostFormFields";
import Host from "models/Host";
import { updateHost } from "services/Api";
import { toastStyle } from "components/atoms/Toast";
import { withToastManager } from "react-toast-notifications";

const EDITING = 0;
const SENDING = 1;
const SENT = 2;

class HostEditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { status: EDITING };
    }

    beforeSubmit = () => {
        this.setState({ status: SENDING });
    };

    onSubmitSuccess = () => {
        console.log("[HOSTS] update success");
        this.setState({ status: SENT });

        this.props.toastManager.add(
            this.props.t("host:form.message.updateSuccess"),
            toastStyle.toastSuccess
        );
    };

    onSubmitFailure = (onSubmitApiErrors) => (error) => {
        console.log("[HOSTS] update failure: ", error);
        this.setState({ status: EDITING });
        onSubmitApiErrors(error, error.response.status);
        this.props.toastManager.add(
            this.props.t("host:form.message.updateFailure"),
            toastStyle.toastError
        );
    };

    onSubmit = (host, onSubmitApiErrors) => {
        const data = classToPlain(host);

        updateHost(
            data,
            this.beforeSubmit,
            this.onSubmitSuccess,
            this.onSubmitFailure(onSubmitApiErrors)
        );
    };

    initialValuesFromLocation = () => {
        const { hosts, location } = this.props;

        const options = {
            exact: false,
            strict: false,
        };

        const { pathname } = location;

        const editPath = matchPath(pathname, {
            ...options,
            path: Routes.HOST_EDIT,
        });
        const createPath = matchPath(pathname, {
            ...options,
            path: Routes.HOSTS_CREATE,
        });

        const getInitialValues = memoize(HostFormFields.getInitialValues);

        if (editPath !== null && this.isRouteHostPresent()) {
            const hostId = editPath.params.hostId;
            const host = hosts.find((item) => item.id === hostId);
            return getInitialValues(host);
        }

        if (createPath !== null) {
            const host = new Host();
            return getInitialValues(host);
        }
    };

    hasHosts = () => this.props.hostsSuccess && this.props.hosts.length > 0;

    isRouteHostPresent = () =>
        this.props.hosts.some(
            (host) => host.id === this.props.match.params.hostId
        );

    renderForm = () => {
        if (!this.hasHosts()) {
            return null;
        }

        if (this.isRouteHostPresent()) {
            const initialValues = this.initialValuesFromLocation();
            return (
                <HostForm
                    hostInProgress={"FIXME_PUT_PROGRESS_TYPE_HERE"}
                    initialValues={initialValues}
                    onSubmit={this.onSubmit}
                />
            );
        }

        return (
            <Alert color="warning">
                {this.props.t("host:errors.notFound")}
            </Alert>
        );
    };

    render() {
        const { hostsErrorMessage, hostsInProgress, t } = this.props;

        if (this.state.status === SENT) {
            return <Redirect to="/hosts" />;
        }

        return (
            <PageCard header={t("host:card.title.update")}>
                <InProgress inProgress={hostsInProgress} />
                <PageErrorMessage isError={hostsErrorMessage}>
                    {hostsErrorMessage}
                </PageErrorMessage>
                {this.renderForm()}
                <PageNavigationBackToList to={Routes.HOSTS} />
            </PageCard>
        );
    }
}

export default compose(
    withHosts,
    withToastManager,
    withTranslation(["host"])
)(HostEditPage);
