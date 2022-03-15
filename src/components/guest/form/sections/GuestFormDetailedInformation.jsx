import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import FormSection from "components/molecules/form/FormSection";
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
import GuestFormDietaryRequirements from "components/guest/form/fields/GuestFormDietaryRequirements";
import GuestFormFoodAllergies from "../fields/GuestFormFoodAllergies";
import GuestFormSpecialNeeds from "../fields/GuestFormSpecialNeeds";
import GuestFormFinanceStatus from "../fields/GuestFormFinanceStatus";
import GuestFormDurationToStay from "../fields/GuestFormDurationToStay";
import GuestFormDesiredDestination from "../fields/GuestFormDesiredDestination";
import GuestFormVerificationStatus from "../fields/GuestFormVerificationStatus";

const GuestFormDetailedInformation = () => {
    const { t } = useTranslation(["guest"]);
    return (
        <FormSection className="mb-0">
            <FormSectionHeader>
                {t("guest:form.section.detailedInfo")}
            </FormSectionHeader>
            <Row>
                <Col xs={12} md={12}>
                    <GuestFormSpecialNeeds />
                </Col>
                <Col xs={12} md={12}>
                    <GuestFormDietaryRequirements />
                    <GuestFormFoodAllergies />
                </Col>
            </Row>
        </FormSection>
    );
};

GuestFormDetailedInformation.propTypes = {};

export default React.memo(GuestFormDetailedInformation);
