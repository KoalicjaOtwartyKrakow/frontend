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
// import { classToPlain } from "serializers/Serializer";
import { Toast } from "components/atoms/Toast";
import { updateAccommodation, fetchAccommodation } from "services/Api";

const EDITING = 0;
const SENDING = 1;
const SENT = 2;
const FETCHING = 3;
const FETCH_DONE = 4;
const FETCH_FAILED = 5;

// TODO: refactor to functional component, the use effects
class AccommodationEditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: EDITING,
            fetchCalled: false,
            fetchFinished: false,
            fetchedAccommodation: {},
        };
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

    onSubmit = (formValues, onSubmitApiErrors) => {
        const data = AccommodationFormFields.formToModel(formValues);

        updateAccommodation(
            data,
            this.beforeSubmit,
            this.onSubmitSuccess,
            this.onSubmitFailure(onSubmitApiErrors)
        );
    };

    fetchAccommodationBefore = () => {
        this.setState({ status: FETCHING });
    };
    fetchAccommodationSuccess = ({ data }) => {
        this.setState({
            status: FETCH_DONE,
            fetchFinished: true,
            fetchedAccommodation: data,
        });
    };
    fetchAccommodationFailure = () => {
        this.setState({ status: FETCH_FAILED });
    };
    fetchAccommodationFinally = () => {};

    // TODO: get accomodation from API, add my own effect: https://reactjs.org/docs/hooks-effect.html
    // get initial values from id (id is read from url)
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

        // What does this do?
        const getInitialValues = memoize(AccommodationFormFields.toForm);

        // Update
        if (editPath !== null && this.isRouteAccommodationPresent()) {
            const accommodationId = editPath.params.accommodationId;

            // Call fetch
            if (!this.state.fetchCalled) {
                const fetchPromise = fetchAccommodation(
                    accommodationId,
                    this.fetchAccommodationBefore,
                    this.fetchAccommodationSuccess,
                    this.fetchAccommodationFailure,
                    this.fetchAccommodationFinally
                );
                this.setState({ fetchCalled: true });
            }

            if (this.state.fetchFinished) {
                console.log(
                    "AccomodationEditPage, accommodation model = ",
                    this.state.fetchedAccommodation
                );
                return getInitialValues(this.state.fetchedAccommodation);
            }

            // const accommodation = accommodations.find(
            //     (item) => item.id === accommodationId
            // );

            // Waiting for fetch...
            return {};
        }

        // Create
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
            console.log(
                "AccommodationEditPage - accommodation from values = ",
                initialValues
            );
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

        if (this.state.status === FETCHING) {
            return <p>Fetching accommodation...</p>;
        }

        if (this.state.status === FETCH_FAILED) {
            return <p>Accommondation not found!</p>;
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
