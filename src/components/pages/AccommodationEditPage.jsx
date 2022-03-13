import React, { useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import PageCard from "components/atoms/PageCard";
import { useTranslation } from "react-i18next";
import { useToasts } from "react-toast-notifications";

import InProgress from "components/atoms/InProgress";
import PageErrorMessage from "components/atoms/PageErrorMessage";
import PageNavigationAccommodationList from "components/atoms/PageNavHome";
import AccommodationForm from "components/accommodation/AccommodationForm";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import { useGetAccommodation } from "hooks/api/accommodationHooks";

//     onSubmitSuccess = () => {
//         console.log("[ACCOMMODATIONS] update success");
//         this.setState({ status: SENT });
//
//         const toast = new Toast(this.props.toastManager);
//         toast.info(this.props.t("accommodation:form.message.updateSuccess"));
//     };
//
//     onSubmitFailure = (onSubmitApiErrors) => (error) => {
//         console.log("[ACCOMMODATIONS] update failure: ", error);
//         this.setState({ status: EDITING });
//         const toast = new Toast(this.props.toastManager);
//         onSubmitApiErrors(error, error.response.status);
//         toast.info(this.props.t("accommodation:form.message.updateFailure"));
//     };
//
//     onSubmit = (formValues, onSubmitApiErrors) => {
//         const data = AccommodationFormFields.formToModel(formValues);
//
//         updateAccommodation(
//             data,
//             this.beforeSubmit,
//             this.onSubmitSuccess,
//             this.onSubmitFailure(onSubmitApiErrors)
//         );
//     };
//
//     fetchAccommodationSuccess = ({ data }) => {
//         this.setState({
//             status: FETCH_OK,
//             fetchedAccommodation: data,
//         });
//         console.log(
//             "AccommodationEditPage fetched accommodation model = ",
//             this.state.fetchedAccommodation
//         );
//     };
//     fetchAccommodationFailure = () => {
//         this.setState({ status: FETCH_ERR });
//     };
//
//     initialFormValues = () => {
//         if (this.state.form === FORM_UPDATE) {
//             if (this.state.status === FETCH_OK) {
//                 return toForm(this.state.fetchedAccommodation);
//             }
//         }
//
//         // Return empty on initialized or on create form case
//         return toForm(new Accommodation());
//     };
//
//     renderForm = () => {
//         const initialValues = this.initialFormValues();
//         console.log("AccommodationEditPage form values", initialValues);
//         return (
//             <AccommodationForm
//                 accommodationInProgress={"FIXME_PUT_PROGRESS_TYPE_HERE"}
//                 initialValues={initialValues}
//                 onSubmit={this.onSubmit}
//             />
//         );
//     };
//
//     render() {
//         const { accommodationsErrorMessage, accommodationsInProgress, t } =
//             this.props;
//
//         if (this.state.status === SENT) {
//             return <Redirect to="/accommodations" />;
//         }
//
//         if (this.state.status === FETCHING) {
//             return <p>Fetching accommodation...</p>;
//         }
//
//         if (this.state.status === FETCH_ERR) {
//             return <p>Accommodation not found!</p>;
//         }
//
//         return (
//             <PageCard header={t("accommodation:card.title.update")}>
//                 <InProgress inProgress={accommodationsInProgress} />
//                 <PageErrorMessage isError={accommodationsErrorMessage}>
//                     {accommodationsErrorMessage}
//                 </PageErrorMessage>
//                 {this.renderForm()}
//                 <PageNavigationAccommodationList />
//             </PageCard>
//         );
//     }
// }
//
// export default compose(
//     withToastManager,
//     withTranslation(["accommodation"])
// )(AccommodationEditPage);

const AccommodationEditPage = () => {
    const { t } = useTranslation(["accommodation"]);
    const toasts = useToasts();
    const params = useParams();

    const {
        accommodation,
        accommodationGetInProgress,
        accommodationGetError,
        fetchAccommodation,
    } = useGetAccommodation();

    const formFields = new AccommodationFormFields();
    const initialValues = formFields.modelToForm(accommodation);

    const accommodationErrorMessage = accommodationGetError?.toString();
    const inProgress = accommodationGetInProgress;

    useEffect(() => {
        const { accommodationId } = params;
        fetchAccommodation({ accommodationId });
    }, [params]);

    const onSubmit = (values) => {
        console.log(
            "[AccommodationEditPage] Invoked onSubmit() with values:",
            values
        );
    };

    console.log("[AccommodationEditPage] Invoked render():", {
        accommodation,
        initialValues,
    });

    return (
        <PageCard header={t("accommodation:card.title.update")}>
            <InProgress inProgress={inProgress} />
            <PageErrorMessage isError={!!accommodationGetError}>
                {accommodationErrorMessage}
            </PageErrorMessage>

            {initialValues && (
                <AccommodationForm
                    accommodationInProgress={"FIXME_PUT_PROGRESS_TYPE_HERE"}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                />
            )}

            {!initialValues && <PageNavigationAccommodationList />}
        </PageCard>
    );
};

export default AccommodationEditPage;
