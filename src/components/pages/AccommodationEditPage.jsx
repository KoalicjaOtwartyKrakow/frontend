import React from "react";
import { matchPath, Redirect } from "react-router-dom";
import withAccommodations from "components/accommodations/withAccommodations";
import PageCard from "components/atoms/PageCard";
import compose from "just-compose";
import { Alert } from "reactstrap";
import { withTranslation } from "react-i18next";
import memoize from "lodash-es/memoize";
import { withToastManager } from "react-toast-notifications";

import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";
import PageNavigationAccommodationList from "components/atoms/PageNavHome";
import AccommodationForm from "components/accommodation/AccommodationForm";
import { Routes } from "constants/Routes";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import Accommodation from "models/Accommodation";
import { classToPlain } from "serializers/Serializer";
import { Toast } from "components/atoms/Toast";
import { updateAccommodation } from "services/Api";

const EDITING = 0;
const SENDING = 1;
const SENT = 2;

class AccommodationEditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { status: EDITING };
    }

    beforeSubmit = () => {
        this.setState({ status: SENDING });
    };

    onSubmitSuccess = () => {
        console.log("[ACCOMMODATIONS] update success");
        this.setState({ status: SENT });

        const toast = new Toast(this.props.toastManager);
        toast.info(this.props.t("accommodation:form.message.updateSuccess"));
    };

    onSubmitFailure = (onSubmitApiErrors) => (error) => {
        console.log("[ACCOMMODATIONS] update failure: ", error);
        this.setState({ status: EDITING });
        const toast = new Toast(this.props.toastManager);
        onSubmitApiErrors(error, error.response.status);
        toast.info(this.props.t("accommodation:form.message.updateFailure"));
    };

    onSubmit = (accommodation, onSubmitApiErrors) => {
        const data = classToPlain(accommodation);

        updateAccommodation(
            data,
            this.beforeSubmit,
            this.onSubmitSuccess,
            this.onSubmitFailure(onSubmitApiErrors)
        );
    };

    initialValuesFromLocation = () => {
        const { accommodations, location } = this.props;

        const options = {
            exact: false,
            strict: false,
        };

        const { pathname } = location;

        const editPath = matchPath(pathname, {
            ...options,
            path: Routes.ACCOMMODATION_EDIT,
        });
        const createPath = matchPath(pathname, {
            ...options,
            path: Routes.ACCOMMODATIONS_CREATE,
        });

        const getInitialValues = memoize(
            AccommodationFormFields.getInitialValues
        );

        if (editPath !== null && this.isRouteAccommodationPresent()) {
            const accommodationId = editPath.params.accommodationId;
            const accommodation = accommodations.find(
                (item) => item.id === accommodationId
            );
            return getInitialValues(accommodation);
        }

        if (createPath !== null) {
            const accommodation = new Accommodation();
            return getInitialValues(accommodation);
        }
    };

    hasAccommodations = () =>
        this.props.accommodationsSuccess &&
        this.props.accommodations.length > 0;

    isRouteAccommodationPresent = () =>
        this.props.accommodations.some(
            (accommodation) =>
                accommodation.id === this.props.match.params.accommodationId
        );

    renderForm = () => {
        if (!this.hasAccommodations()) {
            return null;
        }

        if (this.isRouteAccommodationPresent()) {
            const initialValues = this.initialValuesFromLocation();
            return (
                <AccommodationForm
                    accommodationInProgress={"FIXME_PUT_PROGRESS_TYPE_HERE"}
                    initialValues={initialValues}
                    onSubmit={this.onSubmit}
                />
            );
        }

        return (
            <Alert color="warning">
                {this.props.t("accommodation:errors.notFound")}
            </Alert>
        );
    };

    render() {
        const { accommodationsErrorMessage, accommodationsInProgress, t } =
            this.props;

        if (this.state.status === SENT) {
            return <Redirect to="/accommodations" />;
        }

        return (
            <PageCard header={t("accommodation:card.title.update")}>
                <InProgress inProgress={accommodationsInProgress} />
                <PageErrorMessage isError={accommodationsErrorMessage}>
                    {accommodationsErrorMessage}
                </PageErrorMessage>
                {this.renderForm()}
                <PageNavigationAccommodationList />
            </PageCard>
        );
    }
}

export default compose(
    withAccommodations,
    withToastManager,
    withTranslation(["accommodation"])
)(AccommodationEditPage);
