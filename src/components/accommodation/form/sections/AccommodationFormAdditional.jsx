import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import AccommodationFormSectionHeader from "components/accommodation/form/AccommodationFormSectionHeader";
import AccommodationFormSection from "components/accommodation/form/AccommodationFormSection";
import AccommodationFormVolunteerName from "components/accommodation/form/fields/AccommodationFormVolunteerName";
import AccommodationFormPets from "components/accommodation/form/fields/AccommodationFormPets";
import AccommodationFormDescription from "components/accommodation/form/fields/AccommodationFormDescription";
import AccommodationFormComments from "components/accommodation/form/fields/AccommodationFormComments";

const AccommodationFormAdditional = () => {
    const { t } = useTranslation(["accommodation"]);
    return (
        <AccommodationFormSection className="mb-0">
            <AccommodationFormSectionHeader>
                {t("accommodation:form.section.additionalInfo")}
            </AccommodationFormSectionHeader>
            <Row>
                <Col xs={12}>
                    {/*<AccommodationFormDescription />*/}
                    <AccommodationFormComments />
                </Col>
            </Row>
        </AccommodationFormSection>
    );
};

AccommodationFormAdditional.propTypes = {};

export default React.memo(AccommodationFormAdditional);
