import React from "react";
import { Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { hostInProgressPropType } from "proptypes/HostFormPropTypes";
import HostFormRemoveButton from "components/host/form/buttons/HostFormRemoveButton";
import HostFormResetButton from "components/host/form/buttons/HostFormResetButton";
import HostFormSubmitButton from "components/host/form/buttons/HostFormSubmitButton";
import HostFormBackToListButton from "components/host/form/buttons/HostFormBackToListButton";

// FIXME!!!
const HOST_PROGRESS_REMOVE = "host-progress-remove";

/**
 * @component
 */
const HostFormButtons = React.memo((props) => {
    const { isSubmitting, onRemove, inProgress, submitDisabled, submitLabel } =
        props;

    const { t } = useTranslation(["host", "common"]);
    return (
        <React.Fragment>
            <hr className="mb-4 mt-4" />
            <Row className="mb-2">
                <Col xs={4}>
                    <HostFormBackToListButton
                        label={t("common:form.button.backToList")}
                        mobileLabel={t("common:form.button.backToList")}
                    />
                </Col>
                <Col xs={8} className="d-flex flex-row-reverse">
                    <HostFormSubmitButton
                        disabled={submitDisabled}
                        isSubmitting={isSubmitting}
                        label={submitLabel}
                    />
                    {onRemove && (
                        <HostFormRemoveButton
                            label={t("host:form.button.remove")}
                            onClick={onRemove}
                            inProgress={inProgress === HOST_PROGRESS_REMOVE}
                        />
                    )}
                    <HostFormResetButton
                        label={t("common:form.button.reset")}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
});

HostFormButtons.propTypes = {
    isSubmitting: PropTypes.bool.isRequired,
    onRemove: PropTypes.func,
    inProgress: hostInProgressPropType,
    submitDisabled: PropTypes.bool.isRequired,
    submitLabel: PropTypes.string.isRequired,
};

export default HostFormButtons;
