import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import FormSection from "components/molecules/form/FormSection";

import FormSectionHeader from "components/molecules/form/FormSectionHeader";

import GuestFormPeopleTotalCount from "components/guest/form/fields/GuestFormPeopleTotalCount";

import GuestFormPeopleFemaleCount from "components/guest/form/fields/GuestFormPeopleFemaleCount";

import GuestFormPeopleMaleCount from "components/guest/form/fields/GuestFormPeopleMaleCount";

const GuestFormGroupAdults = () => {
    const { t } = useTranslation(["guest"]);
    return (
        <FormSection>
            <FormSectionHeader>{t("guest:form.section.groupAdults")}</FormSectionHeader>
            <Row>
                <Col xs={12} lg={4}>
                    <GuestFormPeopleTotalCount />
                </Col>
                <Col xs={12} lg={4}>
                    <GuestFormPeopleFemaleCount />
                </Col>
                <Col xs={12} lg={4}>
                    <GuestFormPeopleMaleCount />
                </Col>
            </Row>
        </FormSection>
    );
};

export default GuestFormGroupAdults;
