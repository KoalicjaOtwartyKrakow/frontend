// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/GuestFormFiel... Remove this comment to see the full error message
import { guestFormFields as formFields } from "components/guest/GuestFormFields";
import React from "react";
import { Form, Formik } from "formik";
import { formikFormApplyYupTransforms as yupTransform } from "formik-yup";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/GuestFormSche... Remove this comment to see the full error message
import { guestFormCreateSchema, guestFormUpdateSchema } from "components/guest/GuestFormSchemas";
import { Col, Row } from "reactstrap";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/sections... Remove this comment to see the full error message
import GuestFormPersonalData from "components/guest/form/sections/GuestFormPersonalData";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/sections... Remove this comment to see the full error message
import GuestFormAdditional from "components/guest/form/sections/GuestFormAdditional";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/sections... Remove this comment to see the full error message
import GuestFormGroupAdults from "components/guest/form/sections/GuestFormGroupAdults";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/sections... Remove this comment to see the full error message
import GuestFormGroupChildren from "components/guest/form/sections/GuestFormGroupChildren";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/sections... Remove this comment to see the full error message
import GuestFormDetailedInformation from "components/guest/form/sections/GuestFormDetailedInformation";
import GuestFormStayInfo from "./form/sections/GuestFormStayInfo";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/sections... Remove this comment to see the full error message
import GuestFormAssignments from "components/guest/form/sections/GuestFormAssignments";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/GuestAccommodation' or ... Remove this comment to see the full error message
import GuestAccommodation from "models/GuestAccommodation";
import { useToasts } from "react-toast-notifications";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Enti... Remove this comment to see the full error message
import EntityFormButtons from "components/molecules/form/EntityFormButtons";

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

    const submitDisabled = (isValid: any, isSubmitting: any) => !isValid || isSubmitting;

    const { t } = useTranslation(["guest"]);

    const submitLabel = isCreateMode ? t("guest:form.button.create") : t("guest:form.button.update");
    const submitIcon = isCreateMode ? faPlus : faCheck;

    return (
        <Formik {...formikProps}>
            {({ isSubmitting, isValid }) => (
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
                    <EntityFormButtons
                        onRemove={onRemove}
                        removeInProgress={false}
                        submitDisabled={submitDisabled(isValid, isSubmitting)}
                        submitIcon={submitIcon}
                        submitInProgress={isSubmitting}
                        submitLabel={submitLabel}
                    />
                </Form>
            )}
        </Formik>
    );
};

// GuestForm.propTypes = guestFormPropTypes;

export default GuestForm;
