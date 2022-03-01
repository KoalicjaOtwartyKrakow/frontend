import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import ApartmentFormSectionHeader from "components/apartment/form/ApartmentFormSectionHeader";
import ApartmentFormSection from "components/apartment/form/ApartmentFormSection";
import ApartmentFormVacanciesTaken from "components/apartment/form/fields/ApartmentFormVacanciesTaken";
import ApartmentFormVacanciesTotal from "components/apartment/form/fields/ApartmentFormVacanciesTotal";

const ApartmentFormVacancies = () => {
    const { t } = useTranslation();
    return (
        <ApartmentFormSection className="mb-0">
            <ApartmentFormSectionHeader>
                {t("apartment.availability")}
            </ApartmentFormSectionHeader>
            <Row>
                <Col xs={6} md={6}>
                    <ApartmentFormVacanciesTaken />
                </Col>
                <Col xs={6} md={6}>
                    <ApartmentFormVacanciesTotal />
                </Col>
            </Row>
        </ApartmentFormSection>
    );
};

ApartmentFormVacancies.propTypes = {};

export default React.memo(ApartmentFormVacancies);
