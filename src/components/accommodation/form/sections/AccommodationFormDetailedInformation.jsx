import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import AccommodationFormSectionHeader from "components/accommodation/form/AccommodationFormSectionHeader";
import AccommodationFormSection from "components/accommodation/form/AccommodationFormSection";
import AccommodationFormVolunteerName from "components/accommodation/form/fields/AccommodationFormVolunteerName";
import AccommodationFormPets from "components/accommodation/form/fields/AccommodationFormPets";
import AccommodationFormAccessibility from "../fields/AccommodationFormAccessibility";

const AccommodationFormDetailedInformation = () => {
    const { t } = useTranslation(["accommodation"]);
    return (
        <AccommodationFormSection className="mb-0">
            <AccommodationFormSectionHeader>
                {t("accommodation:form.section.detailedInfo")}
            </AccommodationFormSectionHeader>
            <Row>
                <Col xs={12} md={4}>
                    <AccommodationFormPets />
                </Col>
                <Col xs={12} md={8}>
                    <AccommodationFormAccessibility />
                </Col>
            </Row>
        </AccommodationFormSection>
    );
};

AccommodationFormDetailedInformation.propTypes = {};

export default React.memo(AccommodationFormDetailedInformation);
