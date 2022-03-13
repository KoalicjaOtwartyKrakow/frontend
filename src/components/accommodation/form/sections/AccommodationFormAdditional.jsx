import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import AccommodationFormSectionHeader from "components/accommodation/form/AccommodationFormSectionHeader";
import AccommodationFormSection from "components/accommodation/form/AccommodationFormSection";
import AccommodationFormStaffComments from "components/accommodation/form/fields/AccommodationFormStaffComments";
import AccommodationFormOwnerComments from "components/accommodation/form/fields/AccommodationFormOwnerComments";

const AccommodationFormAdditional = () => {
    const { t } = useTranslation(["accommodation"]);
    return (
        <AccommodationFormSection className="mb-0">
            <AccommodationFormSectionHeader>
                {t("accommodation:form.section.additionalInfo")}
            </AccommodationFormSectionHeader>
            <Row>
                <Col xs={12}>
                    <AccommodationFormStaffComments />
                    <AccommodationFormOwnerComments />
                </Col>
            </Row>
        </AccommodationFormSection>
    );
};

AccommodationFormAdditional.propTypes = {};

export default React.memo(AccommodationFormAdditional);
