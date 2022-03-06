import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import AccommodationFormSectionHeader from "components/accommodation/form/AccommodationFormSectionHeader";
import AccommodationFormSection from "components/accommodation/form/AccommodationFormSection";
import AccommodationFormVacanciesTaken from "components/accommodation/form/fields/AccommodationFormVacanciesTaken";
import AccommodationFormVacanciesTotal from "components/accommodation/form/fields/AccommodationFormVacanciesTotal";

const AccommodationFormVacancies = () => {
    const { t } = useTranslation();
    return (
        <AccommodationFormSection className="mb-0">
            <AccommodationFormSectionHeader>
                {t("accommodation.availability")}
            </AccommodationFormSectionHeader>
            <Row>
                <Col xs={6} md={6}>
                    <AccommodationFormVacanciesTaken />
                </Col>
                <Col xs={6} md={6}>
                    <AccommodationFormVacanciesTotal />
                </Col>
            </Row>
        </AccommodationFormSection>
    );
};

AccommodationFormVacancies.propTypes = {};

export default React.memo(AccommodationFormVacancies);
