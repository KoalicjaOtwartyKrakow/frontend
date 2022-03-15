import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import FormSection from "components/molecules/form/FormSection";
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
import GuestFormDurationToStay from "../fields/GuestFormDurationToStay";
import GuestFormDesiredDestination from "../fields/GuestFormDesiredDestination";
import GuestFormPriorityDate from "components/guest/form/fields/GuestFormPriorityDate";

/**
 * @component
 */
const GuestFormStayInfo = () => {
    const { t } = useTranslation(["guest"]);
    return (
        <FormSection>
            <FormSectionHeader>
                {t("guest:form.section.stayInfo")}
            </FormSectionHeader>
            <Row>
                <Col xs={12} md={6}>
                    <GuestFormPriorityDate />
                </Col>
                <Col xs={12} md={6}>
                    <GuestFormDurationToStay />
                </Col>
            </Row>
            <Row>
                <Col>
                    <GuestFormDesiredDestination />
                </Col>
            </Row>
        </FormSection>
    );
};

export default React.memo(GuestFormStayInfo);
