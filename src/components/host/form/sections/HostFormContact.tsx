import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
import HostFormEmail from "../fields/HostFormEmail";
import HostFormPhoneNumber from "../fields/HostFormPhoneNumber";
import HostFormCallAfter from "../fields/HostFormCallAfter";
import HostFormCallBefore from "../fields/HostFormCallBefore";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/host/form/fields/Ho... Remove this comment to see the full error message
import HostFormFullName from "components/host/form/fields/HostFormFullName";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSection from "components/molecules/form/FormSection";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/host/form/fields/Ho... Remove this comment to see the full error message
import HostFormStatus from "components/host/form/fields/HostFormStatus";

/**
 * @component
 */
const HostFormContact = () => {
    const { t } = useTranslation(["host"]);
    return (
        <FormSection>
            <FormSectionHeader>{t("host:form.section.contact")}</FormSectionHeader>
            <HostFormStatus />
            <Row>
                <Col xs={12} lg={6}>
                    <HostFormFullName />
                </Col>
                <Col xs={12} lg={6}>
                    <HostFormEmail />
                </Col>
            </Row>
            <Row>
                <Col xs={12} lg={6}>
                    <HostFormPhoneNumber />
                </Col>
                <Col xs={12} lg={6}>
                    <Row>
                        <Col>
                            <HostFormCallAfter />
                        </Col>
                        <Col>
                            <HostFormCallBefore />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </FormSection>
    );
};

HostFormContact.propTypes = {};

export default React.memo(HostFormContact);
