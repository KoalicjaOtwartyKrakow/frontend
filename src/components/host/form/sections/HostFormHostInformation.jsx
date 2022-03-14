import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
import HostFormSection from "../HostFormSection";
import HostFormSectionHeader from "../HostFormSectionHeader";
import HostFormFullName from "../fields/HostFormFullName";
import HostFormLanguagesSpoken from "../fields/HostFormLanguagesSpoken";

/**
 * @component
 */
const HostFormHostInformation = () => {
    const { t } = useTranslation(["host"]);
    return (
        <HostFormSection>
            <HostFormSectionHeader>
                {t("host:form.section.hostInformation")}
            </HostFormSectionHeader>
            <Row>
                <Col>
                    <HostFormFullName />
                    <HostFormLanguagesSpoken />
                </Col>
            </Row>
        </HostFormSection>
    );
};

HostFormHostInformation.propTypes = {};

export default React.memo(HostFormHostInformation);
