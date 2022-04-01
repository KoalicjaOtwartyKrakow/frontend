import React from "react";
import { useTranslation } from "react-i18next";
import HostFormComments from "../fields/HostFormComments";
import HostFormLanguagesSpoken from "components/host/form/fields/HostFormLanguagesSpoken";
import FormSection from "components/molecules/form/FormSection";
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
import FormFieldSystemComments from "components/shared/form/fields/FormFieldSystemComments";
import { HostFormFields } from "components/host/HostFormFields";

/**
 * @component
 */
const HostFormAdditionalInformation = () => {
    const { t } = useTranslation(["host"]);
    return (
        <FormSection>
            <FormSectionHeader>{t("host:form.section.additionalInformation")}</FormSectionHeader>
            <FormFieldSystemComments fieldId={HostFormFields.SYSTEM_COMMENTS} />
            <HostFormComments />
            <HostFormLanguagesSpoken />
        </FormSection>
    );
};

export default React.memo(HostFormAdditionalInformation);
