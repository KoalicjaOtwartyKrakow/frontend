import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSection from "components/molecules/form/FormSection";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/fields/G... Remove this comment to see the full error message
import GuestFormChildren from "components/guest/form/fields/GuestFormChildren";

const GuestFormGroupChildren = () => {
    const { t } = useTranslation(["guest"]);
    return (
        <FormSection>
            <FormSectionHeader>{t("guest:form.section.groupChildren")}</FormSectionHeader>
            <Row>
                <Col xs={12}>
                    <GuestFormChildren />
                </Col>
            </Row>
        </FormSection>
    );
};

GuestFormGroupChildren.propTypes = {};

export default GuestFormGroupChildren;
