import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import AccommodationFormSectionHeader from "components/accommodation/form/AccommodationFormSectionHeader";
import AccommodationFormSection from "components/accommodation/form/AccommodationFormSection";
import AccommodationFormVacanciesTotal from "components/accommodation/form/fields/AccommodationFormVacanciesTotal";
import AccommodationFormVacanciesTaken from "components/accommodation/form/fields/AccommodationFormVacanciesTaken";
import AccommodationFormStatus from "../fields/AccommodationFormStatus";

const AccommodationFormVacancies = () => {
    const { t } = useTranslation(["accommodation"]);
    return (
        <AccommodationFormSection className="mb-0">
            <AccommodationFormSectionHeader>
                {t("accommodation:form.section.availability")}
            </AccommodationFormSectionHeader>
            <Row>
                <Col xs={12} md={4}>
                    <AccommodationFormStatus />
                </Col>
                <Col xs={12} md={4}>
                    <AccommodationFormVacanciesTaken />
                </Col>
                <Col xs={12} md={4}>
                    <AccommodationFormVacanciesTotal />
                </Col>
            </Row>
        </AccommodationFormSection>
    );
};

AccommodationFormVacancies.propTypes = {};

export default React.memo(AccommodationFormVacancies);
