import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import FormSection from "components/molecules/form/FormSection";
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
import GuestFormPeopleTotalCount from "components/guest/form/fields/GuestFormPeopleTotalCount";
import GuestFormPeopleFemaleCount from "components/guest/form/fields/GuestFormPeopleFemaleCount";
import GuestFormPeopleMaleCount from "components/guest/form/fields/GuestFormPeopleMaleCount";
import GuestFormChildren from "components/guest/form/fields/GuestFormChildren";

const GuestFormGroupChildren = () => {
    const { t } = useTranslation(["guest"]);
    return (
        <FormSection>
            <FormSectionHeader>
                {t("guest:form.section.groupChildren")}
            </FormSectionHeader>
            <Row>
                <Col xs={12}>
                    <GuestFormChildren />
                </Col>
            </Row>
        </FormSection>
    );
};

GuestFormGroupChildren.propTypes = {};

export default GuestFormGroupChildren;
