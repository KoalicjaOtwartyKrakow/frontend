import React from "react";
import { matchPath, Redirect } from "react-router-dom";
import withApartments from "components/apartments/withApartments";
import PageCard from "components/atoms/PageCard";
import compose from "just-compose";
import { Alert } from "reactstrap";
import { withTranslation } from "react-i18next";
import memoize from "lodash-es/memoize";
import { withToastManager } from "react-toast-notifications";

import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";
import PageNavigationApartmentList from "components/atoms/PageNavHome";
import ApartmentForm from "components/apartment/ApartmentForm";
import Routes from "constants/Routes";
import { ApartmentFormFields } from "components/apartment/ApartmentFormFields";
import Apartment from "models/Apartment";
import { classToPlain } from "serializers/Serializer";
import { Toast } from "components/atoms/Toast";
import { updateApartment } from "services/Api";

const EDITING = 0;
const SENDING = 1;
const SENT = 2;

class ApartmentEditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { status: EDITING };
    }

    beforeSubmit = () => {
        this.setState({ status: SENDING });
    };

    onSubmitSuccess = () => {
        console.log("[APARTMENTS] update success");
        this.setState({ status: SENT });

        const toast = new Toast(this.props.toastManager);
        toast.info(this.props.t("apartment.success"));
    };

    onSubmitFailure = (onSubmitApiErrors) => (error) => {
        console.log("[APARTMENTS] update failure: ", error);
        this.setState({ status: EDITING });
        const toast = new Toast(this.props.toastManager);
        onSubmitApiErrors(error, error.response.status);
        toast.info(this.props.t("apartment.failure"));
    };

    onSubmit = (apartment, onSubmitApiErrors) => {
        const data = classToPlain(apartment);

        updateApartment(
            data,
            this.beforeSubmit,
            this.onSubmitSuccess,
            this.onSubmitFailure(onSubmitApiErrors)
        );
    };

    initialValuesFromLocation = () => {
        const { apartments, location } = this.props;

        const options = {
            exact: false,
            strict: false,
        };

        const { pathname } = location;

        const editPath = matchPath(pathname, {
            ...options,
            path: Routes.APARTMENTS_EDIT,
        });
        const createPath = matchPath(pathname, {
            ...options,
            path: Routes.APARTMENTS_CREATE,
        });

        const getInitialValues = memoize(ApartmentFormFields.getInitialValues);

        if (editPath !== null && this.isRouteApartmentPresent()) {
            const apartmentId = editPath.params.apartmentId;
            const apartment = apartments.find(
                (item) => item.id === apartmentId
            );
            return getInitialValues(apartment);
        }

        if (createPath !== null) {
            const apartment = new Apartment();
            return getInitialValues(apartment);
        }
    };

    hasApartments = () =>
        this.props.apartmentsSuccess && this.props.apartments.length > 0;

    isRouteApartmentPresent = () =>
        this.props.apartments.some(
            (apartment) => apartment.id === this.props.match.params.apartmentId
        );

    renderForm = () => {
        if (this.hasApartments()) {
            if (this.isRouteApartmentPresent()) {
                const initialValues = this.initialValuesFromLocation();
                return (
                    <ApartmentForm
                        apartmentInProgress={"FIXME_PUT_PROGRESS_TYPE_HERE"}
                        initialValues={initialValues}
                        onSubmit={this.onSubmit}
                    />
                );
            }

            return (
                <Alert color="warning">
                    {this.props.t("apartment.not_found")}
                </Alert>
            );
        }
        return null;
    };

    render() {
        const { apartmentsErrorMessage, apartmentsInProgress, t } = this.props;

        if (this.state.status === SENT) {
            return <Redirect to="/apartments" />;
        }

        return (
            <PageCard header={t("apartment.edit")}>
                <InProgress inProgress={apartmentsInProgress} />
                <PageErrorMessage isError={apartmentsErrorMessage}>
                    {apartmentsErrorMessage}
                </PageErrorMessage>
                {this.renderForm()}
                <PageNavigationApartmentList />
            </PageCard>
        );
    }
}

export default compose(
    withApartments,
    withToastManager,
    withTranslation(),
)(ApartmentEditPage);
