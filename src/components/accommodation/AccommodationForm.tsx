// import Effect from 'components/atoms/form/Effect';
import { accommodationFormFields as formFields } from "components/accommodation/AccommodationFormFields";
import React from "react";
import { Form, Formik } from "formik";
import { Col, Row } from "reactstrap";
import { formikFormApplyYupTransforms as yupTransform } from "formik-yup";
import { useTranslation } from "react-i18next";
import {
    accommodationFormCreateSchema,
    accommodationFormUpdateSchema,
} from "components/accommodation/AccommodationFormSchemas";
import AccommodationFormAccommodationData from "components/accommodation/form/sections/AccommodationFormAccommodationData";
import AccommodationFormAdditional from "components/accommodation/form/sections/AccommodationFormAdditional";
import AccommodationFormVacancies from "components/accommodation/form/sections/AccommodationFormVacancies";
import AccommodationFormDetailedInformation from "components/accommodation/form/sections/AccommodationFormDetailedInformation";
import EntityFormButtons from "components/molecules/form/EntityFormButtons";
import { ApiErrors } from "services/Api/types";

const AccommodationForm = (props: any) => {
    const { initialValues, onRemove, crudInProgressState } = props;

    const initialStatus = formFields.getInitialStatus();

    const key = initialValues.uuid;

    const isCreateMode = !initialValues.id;
    const isUpdateMode = !!initialValues.id;

    const validateOnMount = isUpdateMode;

    const validationSchema = isUpdateMode ? accommodationFormUpdateSchema : accommodationFormCreateSchema;

    const onSubmitError = (apiErrors: ApiErrors, values: any, resetForm: any) => {
        const status = formFields.getStatusFromApi(apiErrors);
        resetForm({ values, status });
    };

    /**
     *
     * @param values
     * @param formikBag
     * @returns {Promise<*>}
     */
    const onSubmit = async (values: any, formikBag: any) => {
        console.info("[Accommodation] AccommodationForm onSubmit()");

        const [formattedValues, hasErrors] = await yupTransform(values, formikBag, validationSchema);

        if (hasErrors) {
            return;
        }
        const { resetForm } = formikBag;

        const onSubmitApiErrors = (apiErrors: ApiErrors) => onSubmitError(apiErrors, values, resetForm);

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

    const { t } = useTranslation(["accommodation"]);

    const submitLabel = isCreateMode ? t("accommodation:form.button.create") : t("accommodation:form.button.update");

    return (
        <Formik {...formikProps}>
            <Form noValidate>
                {/*<Effect onChange={ onChange } />*/}
                <Row>
                    <Col xs={12} lg={6}>
                        <AccommodationFormAccommodationData />
                        <AccommodationFormVacancies />
                    </Col>
                    <Col xs={12} lg={6}>
                        <AccommodationFormAdditional />
                    </Col>
                </Row>
                <AccommodationFormDetailedInformation />
                <EntityFormButtons
                    submitLabel={submitLabel}
                    onRemove={onRemove}
                    crudInProgressState={crudInProgressState}
                />
            </Form>
        </Formik>
    );
};

export default AccommodationForm;
