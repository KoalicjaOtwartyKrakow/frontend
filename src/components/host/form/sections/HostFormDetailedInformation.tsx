import React from "react";
import { useTranslation } from "react-i18next";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSection from "components/molecules/form/FormSection";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSectionHeader from "components/molecules/form/FormSectionHeader";

/**
 * @component
 */
const HostFormDetailedInformation = () => {
    const { t } = useTranslation(["host"]);
    return (
        <FormSection>
            <FormSectionHeader>{t("host:form.section.detailedInformation")}</FormSectionHeader>
        </FormSection>
    );
};

HostFormDetailedInformation.propTypes = {};

export default React.memo(HostFormDetailedInformation);
