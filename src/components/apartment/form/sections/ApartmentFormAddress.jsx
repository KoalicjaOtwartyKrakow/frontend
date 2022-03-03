import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import ApartmentFormSection from "components/apartment/form/ApartmentFormSection";
import ApartmentFormSectionHeader from "components/apartment/form/ApartmentFormSectionHeader";
import ApartmentFormStreetName from "components/apartment/form/fields/ApartmentFormStreetName";
import ApartmentFormStreetNumber from "components/apartment/form/fields/ApartmentFormStreetNumber";
import ApartmentFormFlatNumber from "components/apartment/form/fields/ApartmentFormFlatNumber";
import ApartmentFormZip from "components/apartment/form/fields/ApartmentFormZip";
import ApartmentFormAddressState from "components/apartment/form/fields/ApartmentFormState";

/**
 * @component
 */
const ApartmentFormAddress = () => {
    const { t } = useTranslation();
    return (
        <ApartmentFormSection>
            <ApartmentFormSectionHeader>
                {t("apartment.address_data")}
            </ApartmentFormSectionHeader>
            <Row>
                <Col xs={12}>
                    <ApartmentFormStreetName />
                </Col>
                <Col xs={4}>
                    <ApartmentFormStreetNumber />
                </Col>
                <Col xs={4}>
                    <ApartmentFormFlatNumber />
                </Col>
                <Col xs={4}>
                    <ApartmentFormZip />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <ApartmentFormAddressState />
                </Col>
            </Row>
        </ApartmentFormSection>
    );
};

ApartmentFormAddress.propTypes = {};

export default React.memo(ApartmentFormAddress);
