import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import AccommodationFormSectionHeader from "components/accommodation/form/AccommodationFormSectionHeader";
import AccommodationFormSection from "components/accommodation/form/AccommodationFormSection";
import AccommodationFormVolunteerName from "components/accommodation/form/fields/AccommodationFormVolunteerName";

const AccommodationFormAdditional = () => {
    const { t } = useTranslation();
    return (
        <AccommodationFormSection className="mb-0">
            <AccommodationFormSectionHeader>
                {t("accommodation.additional_info")}
            </AccommodationFormSectionHeader>
            <Row>
                <Col xs={12} md={6} lg={3} xl={2}>
                    <AccommodationFormVolunteerName />
                </Col>
                <Col xs={12} md={6} lg={3} xl={2}>
                    TODO
                </Col>
                <Col xs={12} md={6} lg={3} xl={4}>
                    TODO
                </Col>
                <Col xs={12} md={6} lg={3} xl={4}>
                    TODO
                </Col>
            </Row>
        </AccommodationFormSection>
    );
};

AccommodationFormAdditional.propTypes = {};

export default React.memo(AccommodationFormAdditional);
