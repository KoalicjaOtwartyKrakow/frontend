import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
import FormSection from "components/molecules/form/FormSection";
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
import GuestFormAccommodationSearchInput from "components/guest/form/GuestFormAccommodationSearchInput";
import GuestFormVolunteerAssignment from "components/guest/form/fields/GuestFormVolunteerAssignment";
import GuestFormPriorityStatus from "components/guest/form/fields/GuestFormPriorityStatus";
import GuestFormStaffComments from "components/guest/form/fields/GuestFormStaffComments";
import GuestFormAccommodationIdInput from "../GuestFormAccommodationIdInput";

/**
 * @component
 */
const GuestFormAssignments = ({ onAccommodationSelected }: any) => {
    const { t } = useTranslation(["guest"]);
    return (
        <FormSection>
            <FormSectionHeader>{t("guest:form.section.assignAccommodation")}</FormSectionHeader>
            <Row>
                <Col xs={12}>
                    {/* <GuestFormAccommodationSearchInput onAccommodationSelected={onAccommodationSelected} /> */}
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <GuestFormAccommodationIdInput onAccommodationSelected={onAccommodationSelected} />
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={6}>
                    <GuestFormVolunteerAssignment />
                    <GuestFormPriorityStatus />
                </Col>
                <Col xs={12} md={6}>
                    <GuestFormStaffComments />
                </Col>
            </Row>
        </FormSection>
    );
};

export default React.memo(GuestFormAssignments);
