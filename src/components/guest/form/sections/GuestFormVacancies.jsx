import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import FormSection from "components/molecules/form/FormSection";
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
import GuestFormVacanciesTotal from "components/guest/form/fields/GuestFormVacanciesTotal";
import GuestFormVacanciesTaken from "components/guest/form/fields/GuestFormVacanciesTaken";
import GuestFormStatus from "../fields/GuestFormStatus";

const GuestFormVacancies = () => {
    const { t } = useTranslation(["guest"]);
    return (
        <FormSection>
            <FormSectionHeader>
                {t("guest:form.section.availability")}
            </FormSectionHeader>
            <Row>
                <Col xs={6} lg={3} xl={2}>
                    <GuestFormVacanciesTaken />
                </Col>
                <Col xs={6} lg={3} xl={2}>
                    <GuestFormVacanciesTotal />
                </Col>
                <Col xs={12} lg={6} xl={8}>
                    <GuestFormStatus />
                </Col>
            </Row>
        </FormSection>
    );
};

GuestFormVacancies.propTypes = {};

export default React.memo(GuestFormVacancies);
