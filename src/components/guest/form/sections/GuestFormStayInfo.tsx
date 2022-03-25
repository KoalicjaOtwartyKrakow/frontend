import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSection from "components/molecules/form/FormSection";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
import GuestFormDurationToStay from "../fields/GuestFormDurationToStay";
import GuestFormDesiredDestination from "../fields/GuestFormDesiredDestination";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/fields/G... Remove this comment to see the full error message
import GuestFormPriorityDate from "components/guest/form/fields/GuestFormPriorityDate";

/**
 * @component
 */
const GuestFormStayInfo = () => {
    const { t } = useTranslation(["guest"]);
    return (
        <FormSection>
            <FormSectionHeader>{t("guest:form.section.stayInfo")}</FormSectionHeader>
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
