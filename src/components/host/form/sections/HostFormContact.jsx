import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
import HostFormSection from "../HostFormSection";
import HostFormSectionHeader from "../HostFormSectionHeader";
import HostFormEmail from "../fields/HostFormEmail";
import HostFormPhoneNumber from "../fields/HostFormPhoneNumber";
import HostFormCallAfter from "../fields/HostFormCallAfter";
import HostFormCallBefore from "../fields/HostFormCallBefore";
import HostFormFullName from "components/host/form/fields/HostFormFullName";

/**
 * @component
 */
const HostFormContact = () => {
    const { t } = useTranslation(["host"]);
    return (
        <HostFormSection>
            <HostFormSectionHeader>
                {t("host:form.section.contact")}
            </HostFormSectionHeader>
            <Row>
                <Col>
                    <HostFormFullName />

                    <HostFormEmail />
                    <HostFormPhoneNumber />
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
        </HostFormSection>
    );
};

HostFormContact.propTypes = {};

export default React.memo(HostFormContact);
