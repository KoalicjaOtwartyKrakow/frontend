import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import AccommodationFormSection from "components/accommodation/form/AccommodationFormSection";
import AccommodationFormSectionHeader from "components/accommodation/form/AccommodationFormSectionHeader";
import AccommodationFormAddressLine from "components/accommodation/form/fields/AccommodationFormAddressLine";
import AccommodationFormZip from "components/accommodation/form/fields/AccommodationFormZip";
import AccommodationFormAddressState from "components/accommodation/form/fields/AccommodationFormProvince";
import AccommodationFormCity from "components/accommodation/form/fields/AccommodationFormCity";

/**
 * @component
 */
const AccommodationFormAddress = () => {
    const { t } = useTranslation(["accommodation"]);
    return (
        <AccommodationFormSection>
            <AccommodationFormSectionHeader>
                {t("accommodation:form.section.addressData")}
            </AccommodationFormSectionHeader>
            <Row>
                <Col xs={12} md={8}>
                    <AccommodationFormAddressLine />
                </Col>
                <Col xs={4}>
                    <AccommodationFormCity />
                </Col>
                <Col xs={12} md={8}>
                    <AccommodationFormAddressState />
                </Col>
                <Col xs={4}>
                    <AccommodationFormZip />
                </Col>
            </Row>
            <Row>
                <Col xs={12}></Col>
            </Row>
        </AccommodationFormSection>
    );
};

AccommodationFormAddress.propTypes = {};

export default React.memo(AccommodationFormAddress);
