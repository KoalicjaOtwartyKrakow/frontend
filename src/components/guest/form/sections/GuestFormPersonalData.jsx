import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import FormSection from "components/molecules/form/FormSection";
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
import GuestFormFullName from "components/guest/form/fields/GuestFormFullName";
import GuestFormEmail from "components/guest/form/fields/GuestFormEmail";
import GuestFormPhoneNumber from "components/guest/form/fields/GuestFormPhoneNumber";
import GuestFormPriorityStatus from "components/guest/form/fields/GuestFormPriorityStatus";

/**
 * @component
 */
const GuestFormPersonalData = () => {
    const { t } = useTranslation(["guest"]);
    return (
        <FormSection>
            <FormSectionHeader>
                {t("guest:form.section.personalData")}
            </FormSectionHeader>
            <Row>
                <Col xs={12} md={6}>
                    <GuestFormPriorityStatus />
                    <GuestFormFullName />
                    <GuestFormEmail />
                    <GuestFormPhoneNumber />
                </Col>
                <Col xs={12} md={4}>
                    <Row>
                        <Col xs={6} md={12}></Col>
                        <Col xs={6} md={12}></Col>
                    </Row>
                </Col>
            </Row>
        </FormSection>
    );
};

export default React.memo(GuestFormPersonalData);
