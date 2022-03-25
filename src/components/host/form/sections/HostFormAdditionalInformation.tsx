import React from "react";
import { useTranslation } from "react-i18next";
import HostFormComments from "../fields/HostFormComments";
import HostFormLanguagesSpoken from "components/host/form/fields/HostFormLanguagesSpoken";
import FormSection from "components/molecules/form/FormSection";
import FormSectionHeader from "components/molecules/form/FormSectionHeader";

/**
 * @component
 */
const HostFormAdditionalInformation = () => {
    const { t } = useTranslation(["host"]);
    return (
        <FormSection>
            <FormSectionHeader>{t("host:form.section.additionalInformation")}</FormSectionHeader>
            <HostFormComments />
            <HostFormLanguagesSpoken />
        </FormSection>
    );
};

HostFormAdditionalInformation.propTypes = {};

export default React.memo(HostFormAdditionalInformation);
