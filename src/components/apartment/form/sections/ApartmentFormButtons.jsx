import React from "react";
import { Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { apartmentInProgressPropType } from "proptypes/ApartmentFormPropTypes";
import ApartmentFormRemoveButton from "components/apartment/form/buttons/ApartmentFormRemoveButton";
import ApartmentFormResetButton from "components/apartment/form/buttons/ApartmentFormResetButton";
import ApartmentFormSubmitButton from "components/apartment/form/buttons/ApartmentFormSubmitButton";
import ApartmentFormBackToListButton from "components/apartment/form/buttons/ApartmentFormBackToListButton";

// FIXME!!!
const APARTMENT_PROGRESS_REMOVE = "apartment-progress-remove";

/**
 * @component
 */
const ApartmentFormButtons = React.memo((props) => {
    const {
        isSubmitting,
        onRemove,
        apartmentInProgress,
        submitDisabled,
        submitLabel,
    } = props;

    const { t } = useTranslation();
    return (
        <React.Fragment>
            <hr className="mb-4 mt-4" />
            <Row form className="mb-2">
                <Col xs={4}>
                    <ApartmentFormBackToListButton
                        label={t("apartment.back")}
                        mobileLabel={t("apartment.back")}
                    />
                </Col>
                <Col xs={8} className="mb-0 d-flex flex-row-reverse">
                    <ApartmentFormSubmitButton
                        disabled={submitDisabled}
                        isSubmitting={isSubmitting}
                        label={submitLabel}
                    />
                    {onRemove && (
                        <ApartmentFormRemoveButton
                            label={t("apartment.delete")}
                            onClick={onRemove}
                            inProgress={
                                apartmentInProgress ===
                                APARTMENT_PROGRESS_REMOVE
                            }
                        />
                    )}
                    <ApartmentFormResetButton label={t("apartment.reset")} />
                </Col>
            </Row>
        </React.Fragment>
    );
});

ApartmentFormButtons.propTypes = {
    isSubmitting: PropTypes.bool.isRequired,
    onRemove: PropTypes.func,
    apartmentInProgress: apartmentInProgressPropType,
    submitDisabled: PropTypes.bool.isRequired,
    submitLabel: PropTypes.string.isRequired,
};

export default ApartmentFormButtons;
