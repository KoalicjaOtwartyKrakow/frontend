import React from "react";
import { useTranslation } from "react-i18next";
import HostFormComments from "../fields/HostFormComments";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/host/form/fields/Ho... Remove this comment to see the full error message
import HostFormLanguagesSpoken from "components/host/form/fields/HostFormLanguagesSpoken";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSection from "components/molecules/form/FormSection";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
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
