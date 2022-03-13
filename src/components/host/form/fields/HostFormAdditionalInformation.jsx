import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import FormCheckbox from "components/atoms/form/FormCheckbox";
import { HostFormFields } from "components/host/HostFormFields";

const additionalInformationCheckbox = ({ name, label }) => {
    return (
        <Field
            id={name}
            key={name}
            name={name}
            type="checkbox"
            label={label}
            component={FormCheckbox}
            inline
        />
    );
};

const HostFormAdditionalInformation = () => {
    const { t } = useTranslation(["host"]);

    const additionalInformationCheckboxes = [
        {
            name: HostFormFields.LGBT_FRIENDLY,
            label: t("host:form.label.lgbtFriendly"),
        },
        {
            name: HostFormFields.ACCEPTS_FROM_ANY_COUNTRY,
            label: t("host:form.label.acceptsFromAnyCountry"),
        },
        {
            name: HostFormFields.ACCEPTS_GUEST_WITH_DISABILITIES,
            label: t("host:form.label.acceptsGuestWithDisabilities"),
        },
    ];

    return (
        <FormGroup tag="fieldset">
            <legend className="form-label">
                {t("host:form.label.hostAdditionalInformation")}
            </legend>
            {additionalInformationCheckboxes.map(additionalInformationCheckbox)}
        </FormGroup>
    );
};

HostFormAdditionalInformation.propTypes = {};

export default HostFormAdditionalInformation;
