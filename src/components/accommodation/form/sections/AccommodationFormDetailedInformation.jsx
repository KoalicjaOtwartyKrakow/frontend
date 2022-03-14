import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import FormSection from "components/molecules/form/FormSection";
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
import AccommodationFormPets from "components/accommodation/form/fields/AccommodationFormPets";
import AccommodationFormAccessibility from "../fields/AccommodationFormAccessibility";

const AccommodationFormDetailedInformation = () => {
    const { t } = useTranslation(["accommodation"]);
    return (
        <FormSection className="mb-0">
            <FormSectionHeader>
                {t("accommodation:form.section.detailedInfo")}
            </FormSectionHeader>
            <Row>
                <Col xs={12} md={4}>
                    <AccommodationFormPets />
                </Col>
                <Col xs={12} md={8}>
                    <AccommodationFormAccessibility />
                </Col>
            </Row>
        </FormSection>
    );
};

AccommodationFormDetailedInformation.propTypes = {};

export default React.memo(AccommodationFormDetailedInformation);
