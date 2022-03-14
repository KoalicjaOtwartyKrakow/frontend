import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import FormSection from "components/molecules/form/FormSection";
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
import AccommodationFormStaffComments from "components/accommodation/form/fields/AccommodationFormStaffComments";
import AccommodationFormOwnerComments from "components/accommodation/form/fields/AccommodationFormOwnerComments";

const AccommodationFormAdditional = () => {
    const { t } = useTranslation(["accommodation"]);
    return (
        <FormSection>
            <FormSectionHeader>
                {t("accommodation:form.section.additionalInfo")}
            </FormSectionHeader>
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
