import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSection from "components/molecules/form/FormSection";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/fields/G... Remove this comment to see the full error message
import GuestFormPeopleTotalCount from "components/guest/form/fields/GuestFormPeopleTotalCount";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/fields/G... Remove this comment to see the full error message
import GuestFormPeopleFemaleCount from "components/guest/form/fields/GuestFormPeopleFemaleCount";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/fields/G... Remove this comment to see the full error message
import GuestFormPeopleMaleCount from "components/guest/form/fields/GuestFormPeopleMaleCount";

const GuestFormGroupAdults = () => {
    const { t } = useTranslation(["guest"]);
    return (
        <FormSection>
            <FormSectionHeader>{t("guest:form.section.groupAdults")}</FormSectionHeader>
            <Row>
                <Col xs={12} lg={4}>
                    <GuestFormPeopleTotalCount />
                </Col>
                <Col xs={12} lg={4}>
                    <GuestFormPeopleFemaleCount />
                </Col>
                <Col xs={12} lg={4}>
                    <GuestFormPeopleMaleCount />
                </Col>
            </Row>
        </FormSection>
    );
};

GuestFormGroupAdults.propTypes = {};

export default GuestFormGroupAdults;
