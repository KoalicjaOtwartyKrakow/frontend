import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import AccommodationFormSection from "components/accommodation/form/AccommodationFormSection";
import AccommodationFormSectionHeader from "components/accommodation/form/AccommodationFormSectionHeader";
import AccommodationFormStreetName from "components/accommodation/form/fields/AccommodationFormStreetName";
import AccommodationFormStreetNumber from "components/accommodation/form/fields/AccommodationFormStreetNumber";
import AccommodationFormFlatNumber from "components/accommodation/form/fields/AccommodationFormFlatNumber";
import AccommodationFormZip from "components/accommodation/form/fields/AccommodationFormZip";
import AccommodationFormAddressState from "components/accommodation/form/fields/AccommodationFormState";

/**
 * @component
 */
const AccommodationFormAddress = () => {
    const { t } = useTranslation();
    return (
        <AccommodationFormSection>
            <AccommodationFormSectionHeader>
                {t("accommodation.address_data")}
            </AccommodationFormSectionHeader>
            <Row>
                <Col xs={12}>
                    <AccommodationFormStreetName />
                </Col>
                <Col xs={4}>
                    <AccommodationFormStreetNumber />
                </Col>
                <Col xs={4}>
                    <AccommodationFormFlatNumber />
                </Col>
                <Col xs={4}>
                    <AccommodationFormZip />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <AccommodationFormAddressState />
                </Col>
            </Row>
        </AccommodationFormSection>
    );
};

AccommodationFormAddress.propTypes = {};

export default React.memo(AccommodationFormAddress);
