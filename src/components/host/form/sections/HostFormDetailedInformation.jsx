import React from "react";
import { useTranslation } from "react-i18next";
import FormSection from "components/molecules/form/FormSection";
import FormSectionHeader from "components/molecules/form/FormSectionHeader";

/**
 * @component
 */
const HostFormDetailedInformation = () => {
    const { t } = useTranslation(["host"]);
    return (
        <FormSection>
            <FormSectionHeader>
                {t("host:form.section.detailedInformation")}
            </FormSectionHeader>
        </FormSection>
    );
};

HostFormDetailedInformation.propTypes = {};

export default React.memo(HostFormDetailedInformation);
