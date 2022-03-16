import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import FormSection from "components/molecules/form/FormSection";
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
import GuestFormPetsPresence from "components/guest/form/fields/GuestFormPetsPresence";
import GuestFormPetsDescription from "components/guest/form/fields/GuestFormPetsDescription";
import GuestFormFinancialStatus from "components/guest/form/fields/GuestFormFinancialStatus";

const GuestFormAdditional = () => {
    const { t } = useTranslation(["guest"]);
    return (
        <FormSection>
            <FormSectionHeader>
                {t("guest:form.section.additionalInfo")}
            </FormSectionHeader>
            <Row>
                <Col xs={12}>
                    <GuestFormPetsPresence />
                    <GuestFormPetsDescription />
                    <GuestFormFinancialStatus />
                </Col>
            </Row>
        </FormSection>
    );
};

GuestFormAdditional.propTypes = {};

export default React.memo(GuestFormAdditional);
