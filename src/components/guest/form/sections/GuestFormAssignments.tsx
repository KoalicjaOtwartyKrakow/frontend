import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSection from "components/molecules/form/FormSection";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/GuestFor... Remove this comment to see the full error message
import GuestFormAccommodationSearchInput from "components/guest/form/GuestFormAccommodationSearchInput";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/fields/G... Remove this comment to see the full error message
import GuestFormVolunteerAssignment from "components/guest/form/fields/GuestFormVolunteerAssignment";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/fields/G... Remove this comment to see the full error message
import GuestFormPriorityStatus from "components/guest/form/fields/GuestFormPriorityStatus";

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
                    <GuestFormAccommodationSearchInput onAccommodationSelected={onAccommodationSelected} />
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={6}>
                    <GuestFormVolunteerAssignment />
                </Col>
                <Col xs={12} md={6}>
                    <GuestFormPriorityStatus />
                </Col>
            </Row>
        </FormSection>
    );
};

export default React.memo(GuestFormAssignments);
