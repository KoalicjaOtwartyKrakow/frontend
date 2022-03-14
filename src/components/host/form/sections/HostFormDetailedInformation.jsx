import React from "react";
import { useTranslation } from "react-i18next";
import HostFormExtendedInformation from "../fields/HostFormExtendedInformation";
import HostFormSection from "../HostFormSection";
import HostFormSectionHeader from "../HostFormSectionHeader";

/**
 * @component
 */
const HostFormDetailedInformation = () => {
    const { t } = useTranslation(["host"]);
    return (
        <HostFormSection>
            <HostFormSectionHeader>
                {t("host:form.section.detailedInformation")}
            </HostFormSectionHeader>
        </HostFormSection>
    );
};

HostFormDetailedInformation.propTypes = {};

export default React.memo(HostFormDetailedInformation);
