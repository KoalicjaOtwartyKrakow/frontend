import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
import FormSection from "components/molecules/form/FormSection";
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
import GuestFormFullName from "components/guest/form/fields/GuestFormFullName";
import GuestFormEmail from "components/guest/form/fields/GuestFormEmail";
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
