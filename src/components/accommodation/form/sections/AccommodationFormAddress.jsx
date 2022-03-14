import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import FormSection from "components/molecules/form/FormSection";
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
import AccommodationFormAddressLine from "components/accommodation/form/fields/AccommodationFormAddressLine";
import AccommodationFormZip from "components/accommodation/form/fields/AccommodationFormZip";
import AccommodationFormVoivodeship from "components/accommodation/form/fields/AccommodationFormVoivodeship";
import AccommodationFormCity from "components/accommodation/form/fields/AccommodationFormCity";

/**
 * @component
 */
const AccommodationFormAddress = () => {
    const { t } = useTranslation(["accommodation"]);
    return (
        <FormSection>
            <FormSectionHeader>
                {t("accommodation:form.section.addressData")}
            </FormSectionHeader>
            <Row>
                <Col xs={12} md={8}>
                    <AccommodationFormAddressLine />
                    <AccommodationFormVoivodeship />
                </Col>
                <Col xs={12} md={4}>
                    <Row>
                        <Col xs={6} md={12}>
                            <AccommodationFormCity />
                        </Col>
                        <Col xs={6} md={12}>
                            <AccommodationFormZip />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </FormSection>
    );
};

AccommodationFormAddress.propTypes = {};

export default React.memo(AccommodationFormAddress);
