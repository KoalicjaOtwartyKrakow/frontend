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
                <Col xs={6} lg={3} xl={2}>
                    <AccommodationFormVacanciesTaken />
                </Col>
                <Col xs={6} lg={3} xl={2}>
                    <AccommodationFormVacanciesTotal />
                </Col>
                <Col xs={12} lg={6} xl={8}>
                    <AccommodationFormStatus />
                </Col>
            </Row>
        </AccommodationFormSection>
    );
};

AccommodationFormVacancies.propTypes = {};

export default React.memo(AccommodationFormVacancies);
