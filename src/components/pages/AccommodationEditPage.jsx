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
import { Toast } from "components/atoms/Toast";
import { updateAccommodation, fetchAccommodation } from "services/Api";

const toForm = memoize(AccommodationFormFields.toForm);

const EDITING = 0;
const SENDING = 1;
const SENT = 2;
const FETCHING = 3;
const FETCH_OK = 4;
const FETCH_ERR = 5;

const FORM_UPDATE = 0;
const FORM_CREATE = 1;

// TODO: refactor to functional component, the use effects
class AccommodationEditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: EDITING,
            form: null,
            fetchCalled: false,
            fetchFinished: false,
            fetchedAccommodation: {},
        };
    }

    initializeUpdateForm = (accommodationId) => {
        this.setState({ form: FORM_UPDATE });

        // Call fetch
        if (!this.state.status !== FETCHING) {
            fetchAccommodation(
                accommodationId,
                () => {},
                this.fetchAccommodationSuccess,
                this.fetchAccommodationFailure,
                () => {}
            );
            this.setState({ status: FETCHING });
        }
    };

    initializeCreateForm = () => {
        this.setState({ form: FORM_CREATE });
    };

    componentDidMount = () => {
        const { location } = this.props;

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

        if (editPath !== null && editPath.params.accommodationId) {
            this.initializeUpdateForm(editPath.params.accommodationId);
        } else if (createPath !== null) {
            this.initializeCreateForm();
        }
    };

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

    fetchAccommodationSuccess = ({ data }) => {
        this.setState({
            status: FETCH_OK,
            fetchedAccommodation: data,
        });
        console.log(
            "AccommodationEditPage fetched accommodation model = ",
            this.state.fetchedAccommodation
        );
    };
    fetchAccommodationFailure = () => {
        this.setState({ status: FETCH_ERR });
    };

    initialFormValues = () => {
        if (this.state.form === FORM_UPDATE) {
            if (this.state.status === FETCH_OK) {
                return toForm(this.state.fetchedAccommodation);
            }
        }

        // Return empty on initialized or on create form case
        return toForm(new Accommodation());
    };

    renderForm = () => {
        const initialValues = this.initialFormValues();
        console.log("AccommodationEditPage form values", initialValues);
        return (
            <AccommodationForm
                accommodationInProgress={"FIXME_PUT_PROGRESS_TYPE_HERE"}
                initialValues={initialValues}
                onSubmit={this.onSubmit}
            />
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

        if (this.state.status === FETCH_ERR) {
            return <p>Accommodation not found!</p>;
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
