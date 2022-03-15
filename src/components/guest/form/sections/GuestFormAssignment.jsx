import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import FormSection from "components/molecules/form/FormSection";
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
import GuestFormDurationToStay from "../fields/GuestFormDurationToStay";
import GuestFormVerificationStatus from "../fields/GuestFormVerificationStatus";
import GuestFormDesiredDestination from "../fields/GuestFormDesiredDestination";
import GuestFormAccommodationSearchInput from "components/guest/form/GuestFormAccommodationSearchInput";

/**
 * @component
 */
const GuestFormStayInfo = ({ onAccommodationSelected }) => {
    const { t } = useTranslation(["guest"]);
    return (
        <FormSection>
            <FormSectionHeader>
                {t("guest:form.section.assignAccommodation")}
            </FormSectionHeader>
            <Row>
                <Col xs={12}>
                    <GuestFormAccommodationSearchInput
                        onAccommodationSelected={onAccommodationSelected}
                    />
                </Col>
            </Row>
        </FormSection>
    );
};

export default React.memo(GuestFormStayInfo);
