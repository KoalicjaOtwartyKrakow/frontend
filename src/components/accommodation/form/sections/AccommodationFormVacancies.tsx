import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import FormSection from "components/molecules/form/FormSection";
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
import AccommodationFormVacanciesTotal from "components/accommodation/form/fields/AccommodationFormVacanciesTotal";
import AccommodationFormVacanciesTaken from "components/accommodation/form/fields/AccommodationFormVacanciesTaken";
import AccommodationFormStatus from "../fields/AccommodationFormStatus";

const AccommodationFormVacancies = () => {
    const { t } = useTranslation(["accommodation"]);
    return (
        <FormSection>
            <FormSectionHeader>{t("accommodation:form.section.availability")}</FormSectionHeader>
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
        </FormSection>
    );
};

export default React.memo(AccommodationFormVacancies);
