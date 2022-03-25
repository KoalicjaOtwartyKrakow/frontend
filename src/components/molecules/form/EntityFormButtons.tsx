import React from "react";
import { Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/butt... Remove this comment to see the full error message
import EntityFormRemoveButton from "components/molecules/form/buttons/EntityFormRemoveButton";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/butt... Remove this comment to see the full error message
import EntityFormResetButton from "components/molecules/form/buttons/EntityFormResetButton";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/butt... Remove this comment to see the full error message
import EntityFormSubmitButton from "components/molecules/form/buttons/EntityFormSubmitButton";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/butt... Remove this comment to see the full error message
import EntityFormBackToListButton from "components/molecules/form/buttons/EntityFormBackToListButton";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/HorizontalLin... Remove this comment to see the full error message
import HorizontalLine from "components/atoms/HorizontalLine";

/**
 * @component
 */
const EntityFormButtons = React.memo((props) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onRemove' does not exist on type '{ chil... Remove this comment to see the full error message
    const { onRemove, removeInProgress, submitDisabled, submitIcon, submitInProgress, submitLabel } = props;

    const { t } = useTranslation(["common"]);
    return (
        <React.Fragment>
            <HorizontalLine className="mb-4 mt-4" />
            <Row className="mb-2">
                <Col xs={4}>
                    <EntityFormBackToListButton
                        label={t("common:form.button.backToList")}
                        mobileLabel={t("common:form.button.backToList")}
                    />
                </Col>
                <Col xs={8} className="d-flex flex-row-reverse">
                    <EntityFormSubmitButton
                        disabled={submitDisabled}
                        icon={submitIcon}
                        isSubmitting={submitInProgress}
                        label={submitLabel}
                    />
                    {onRemove && (
                        <EntityFormRemoveButton
                            label={t("common:form.button.remove")}
                            onClick={onRemove}
                            inProgress={removeInProgress}
                        />
                    )}
                    <EntityFormResetButton label={t("common:form.button.reset")} disabled={submitDisabled} />
                </Col>
            </Row>
        </React.Fragment>
    );
});

// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'Named... Remove this comment to see the full error message
EntityFormButtons.propTypes = {
    onRemove: PropTypes.func,
    removeInProgress: PropTypes.bool.isRequired,
    submitDisabled: PropTypes.bool.isRequired,
    submitInProgress: PropTypes.bool.isRequired,
    submitLabel: PropTypes.string.isRequired,
    submitIcon: PropTypes.string,
};

export default EntityFormButtons;
