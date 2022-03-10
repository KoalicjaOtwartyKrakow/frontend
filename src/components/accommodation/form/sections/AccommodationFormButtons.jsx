import React from "react";
import { Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { accommodationInProgressPropType } from "proptypes/AccommodationFormPropTypes";
import AccommodationFormRemoveButton from "components/accommodation/form/buttons/AccommodationFormRemoveButton";
import AccommodationFormResetButton from "components/accommodation/form/buttons/AccommodationFormResetButton";
import AccommodationFormSubmitButton from "components/accommodation/form/buttons/AccommodationFormSubmitButton";
import AccommodationFormBackToListButton from "components/accommodation/form/buttons/AccommodationFormBackToListButton";

// FIXME!!!
const ACCOMMODATION_PROGRESS_REMOVE = "accommodation-progress-remove";

/**
 * @component
 */
const AccommodationFormButtons = React.memo((props) => {
    const { isSubmitting, onRemove, inProgress, submitDisabled, submitLabel } =
        props;

    const { t } = useTranslation(["accommodation", "common"]);
    return (
        <React.Fragment>
            <hr className="mb-4 mt-4" />
            <Row className="mb-2">
                <Col xs={4}>
                    <AccommodationFormBackToListButton
                        label={t("common:form.button.backToList")}
                        mobileLabel={t("common:form.button.backToList")}
                    />
                </Col>
                <Col xs={8} className="d-flex flex-row-reverse">
                    <AccommodationFormSubmitButton
                        disabled={submitDisabled}
                        isSubmitting={isSubmitting}
                        label={submitLabel}
                    />
                    {onRemove && (
                        <AccommodationFormRemoveButton
                            label={t("accommodation:form.button.remove")}
                            onClick={onRemove}
                            inProgress={
                                inProgress === ACCOMMODATION_PROGRESS_REMOVE
                            }
                        />
                    )}
                    <AccommodationFormResetButton
                        label={t("common:form.button.reset")}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
});

AccommodationFormButtons.propTypes = {
    isSubmitting: PropTypes.bool.isRequired,
    onRemove: PropTypes.func,
    inProgress: accommodationInProgressPropType,
    submitDisabled: PropTypes.bool.isRequired,
    submitLabel: PropTypes.string.isRequired,
};

export default AccommodationFormButtons;
