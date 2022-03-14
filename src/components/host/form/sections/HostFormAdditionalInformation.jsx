import React from "react";
import { useTranslation } from "react-i18next";
import HostFormSection from "../HostFormSection";
import HostFormSectionHeader from "../HostFormSectionHeader";
import HostFormComments from "../fields/HostFormComments";
import HostFormLanguagesSpoken from "components/host/form/fields/HostFormLanguagesSpoken";

/**
 * @component
 */
const HostFormAdditionalInformation = () => {
    const { t } = useTranslation(["host"]);
    return (
        <HostFormSection>
            <HostFormSectionHeader>
                {t("host:form.section.additionalInformation")}
            </HostFormSectionHeader>
            <HostFormComments />
            <HostFormLanguagesSpoken />
        </HostFormSection>
    );
};

HostFormAdditionalInformation.propTypes = {};

export default React.memo(HostFormAdditionalInformation);
