import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSection from "components/molecules/form/FormSection";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/form/... Remove this comment to see the full error message
import AccommodationFormStaffComments from "components/accommodation/form/fields/AccommodationFormStaffComments";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/form/... Remove this comment to see the full error message
import AccommodationFormOwnerComments from "components/accommodation/form/fields/AccommodationFormOwnerComments";

const AccommodationFormAdditional = () => {
    const { t } = useTranslation(["accommodation"]);
    return (
        <FormSection>
            <FormSectionHeader>{t("accommodation:form.section.additionalInfo")}</FormSectionHeader>
            <Row>
                <Col xs={12}>
                    <AccommodationFormStaffComments />
                    <AccommodationFormOwnerComments />
                </Col>
            </Row>
        </FormSection>
    );
};

AccommodationFormAdditional.propTypes = {};

export default React.memo(AccommodationFormAdditional);
