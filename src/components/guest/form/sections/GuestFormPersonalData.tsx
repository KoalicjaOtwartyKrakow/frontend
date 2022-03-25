import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSection from "components/molecules/form/FormSection";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/fields/G... Remove this comment to see the full error message
import GuestFormFullName from "components/guest/form/fields/GuestFormFullName";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/fields/G... Remove this comment to see the full error message
import GuestFormEmail from "components/guest/form/fields/GuestFormEmail";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/fields/G... Remove this comment to see the full error message
import GuestFormPhoneNumber from "components/guest/form/fields/GuestFormPhoneNumber";

/**
 * @component
 */
const GuestFormPersonalData = () => {
    const { t } = useTranslation(["guest"]);
    return (
        <FormSection>
            <FormSectionHeader>{t("guest:form.section.personalData")}</FormSectionHeader>
            <Row>
                <Col xs={12} md={12}>
                    <GuestFormFullName />
                </Col>
                <Col xs={12} md={6}>
                    <GuestFormEmail />
                </Col>
                <Col xs={12} md={6}>
                    <GuestFormPhoneNumber />
                </Col>
            </Row>
        </FormSection>
    );
};

export default React.memo(GuestFormPersonalData);
