import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import { FormItemsHostStatus } from "components/molecules/form/FormItemsHostStatus";

const AccommodationFormHostStatus = (props) => {
    const fieldId = AccommodationFormFields.HOST_STATUS;
    const { t } = useTranslation(["host"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("host:form.label.hostStatus")}
            </Label>
            <Field
                component={FormItemsHostStatus}
                id={fieldId}
                name={fieldId}
            />
        </FormGroup>
    );
};

AccommodationFormHostStatus.propTypes = {};

export default AccommodationFormHostStatus;
