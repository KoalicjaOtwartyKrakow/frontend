import React from "react";
import { Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import EntityFormRemoveButton from "components/molecules/form/buttons/EntityFormRemoveButton";
import EntityFormResetButton from "components/molecules/form/buttons/EntityFormResetButton";
import EntityFormSubmitButton from "components/molecules/form/buttons/EntityFormSubmitButton";
import EntityFormBackToListButton from "components/molecules/form/buttons/EntityFormBackToListButton";
import HorizontalLine from "components/atoms/HorizontalLine";

/**
 * @component
 */
const EntityFormButtons = React.memo((props) => {
    const {
        onRemove,
        removeInProgress,
        submitDisabled,
        submitInProgress,
        submitLabel,
    } = props;

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
                    <EntityFormResetButton
                        label={t("common:form.button.reset")}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
});

EntityFormButtons.propTypes = {
    onRemove: PropTypes.func,
    removeInProgress: PropTypes.bool.isRequired,
    submitDisabled: PropTypes.bool.isRequired,
    submitInProgress: PropTypes.bool.isRequired,
    submitLabel: PropTypes.string.isRequired,
};

export default EntityFormButtons;
