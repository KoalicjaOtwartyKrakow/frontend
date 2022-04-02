import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
import FormSection from "components/molecules/form/FormSection";
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
import AccommodationFormVacanciesTotal from "components/accommodation/form/fields/AccommodationFormVacanciesTotal";
import AccommodationFormVacanciesTaken from "components/accommodation/form/fields/AccommodationFormVacanciesTaken";
import AccommodationFormVerificationStatus from "components/accommodation/form/fields/AccommodationFormVerificationStatus";
import AccommodationFormStayDuration from "components/accommodation/form/fields/AccommodationFormStayDuration";

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
                    <AccommodationFormStayDuration />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <AccommodationFormVerificationStatus />
                </Col>
            </Row>
        </FormSection>
    );
};

export default React.memo(AccommodationFormVacancies);
