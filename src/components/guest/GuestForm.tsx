import React from "react";
import { Col, Row } from "reactstrap";
import { Form, Formik } from "formik";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { formikFormApplyYupTransforms as yupTransform } from "formik-yup";
import { useToasts } from "react-toast-notifications";
import { useTranslation } from "react-i18next";

import EntityFormButtons from "components/molecules/form/EntityFormButtons";

import GuestAccommodation from "models/GuestAccommodation";
import GuestFormAdditional from "components/guest/form/sections/GuestFormAdditional";
import GuestFormAssignments from "components/guest/form/sections/GuestFormAssignments";
import GuestFormDetailedInformation from "components/guest/form/sections/GuestFormDetailedInformation";
import GuestFormGroupAdults from "components/guest/form/sections/GuestFormGroupAdults";
import GuestFormGroupChildren from "components/guest/form/sections/GuestFormGroupChildren";
import GuestFormPersonalData from "components/guest/form/sections/GuestFormPersonalData";
import GuestFormStayInfo from "./form/sections/GuestFormStayInfo";

import { guestFormCreateSchema, guestFormUpdateSchema } from "components/guest/GuestFormSchemas";
import { guestFormFields as formFields } from "components/guest/GuestFormFields";

const GuestForm = (props: any) => {
    const { addToast } = useToasts();
    const { initialValues, onRemove } = props;

    const initialStatus = formFields.getInitialStatus();

    const key = initialValues.uuid;

    const isCreateMode = !initialValues.id;
    const isUpdateMode = !!initialValues.id;

    const validateOnMount = isCreateMode;

    const validationSchema = isUpdateMode ? guestFormUpdateSchema : guestFormCreateSchema;

    /**
     *
     * @param {GuestAccommodation} accommodation
     */
    const onAccommodationSelected = (accommodation: any) => {
        console.log("[onAccommodationSelected] Selected guest accommodation: ", accommodation);
        if (!GuestAccommodation.is(accommodation)) {
            addToast(t("guest:form.message.removeGuestFromAccommodationWarning"), {
                appearance: "warning",
            });
        }
    };

    const onSubmitError = (response: any, values: any, resetForm: any) => {
        const status = formFields.getStatusFromApi(response);
        resetForm({ values, status });
    };

    /**
     *
     * @param values
     * @param formikBag
     * @returns {Promise<*>}
     */
    const onSubmit = async (values: any, formikBag: any) => {
        console.log("[Guest] GuestForm onSubmit()");

        const [formattedValues, hasErrors] = await yupTransform(values, formikBag, validationSchema);

        if (hasErrors) {
            return;
        }
        const { resetForm } = formikBag;

        const onSubmitApiErrors = (response: any) => onSubmitError(response, values, resetForm);

        return props.onSubmit(formattedValues, onSubmitApiErrors);
    };

    const formikProps = {
        key,
        initialValues,
        initialStatus,
        validateOnMount,
        onSubmit,
        validationSchema,
    };

    const { t } = useTranslation(["guest"]);

    const submitLabel = isCreateMode ? t("guest:form.button.create") : t("guest:form.button.update");
    const submitIcon = isCreateMode ? faPlus : faCheck;

    return (
        <Formik {...formikProps}>
            <Form noValidate>
                <GuestFormAssignments onAccommodationSelected={onAccommodationSelected} />
                <Row>
                    <Col xs={12} lg={6}>
                        <GuestFormPersonalData />
                        <GuestFormStayInfo />
                        <GuestFormGroupAdults />
                        <GuestFormGroupChildren />
                    </Col>
                    <Col xs={12} lg={6}>
                        <GuestFormAdditional />
                        <GuestFormDetailedInformation />
                    </Col>
                </Row>
                <EntityFormButtons onRemove={onRemove} submitIcon={submitIcon} submitLabel={submitLabel} />
            </Form>
        </Formik>
    );
};

export default GuestForm;
