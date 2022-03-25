import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSection from "components/molecules/form/FormSection";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/fields/G... Remove this comment to see the full error message
import GuestFormDietaryRequirements from "components/guest/form/fields/GuestFormDietaryRequirements";
import GuestFormFoodAllergies from "../fields/GuestFormFoodAllergies";
import GuestFormSpecialNeeds from "../fields/GuestFormSpecialNeeds";

const GuestFormDetailedInformation = () => {
    const { t } = useTranslation(["guest"]);
    return (
        <FormSection className="mb-0">
            <FormSectionHeader>{t("guest:form.section.detailedInfo")}</FormSectionHeader>
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
