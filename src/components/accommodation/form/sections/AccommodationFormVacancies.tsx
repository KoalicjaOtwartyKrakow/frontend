import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSection from "components/molecules/form/FormSection";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/form/... Remove this comment to see the full error message
import AccommodationFormVacanciesTotal from "components/accommodation/form/fields/AccommodationFormVacanciesTotal";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/form/... Remove this comment to see the full error message
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

AccommodationFormVacancies.propTypes = {};

export default React.memo(AccommodationFormVacancies);
