import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import ProgressIcon from "components/atoms/ProgressIcon";
import { useTranslation } from "react-i18next";

const EntityFormSubmitButton = ({ disabled, isSubmitting, label, icon = faCheck, usePleaseWaitLabel = false }) => {
    const { t } = useTranslation(["common"]);
    const buttonLabel = isSubmitting && usePleaseWaitLabel ? t("common:data.pleaseWait") : label;
    return (
        <Button color="primary" type="submit" disabled={disabled} className="ms-2">
            <ProgressIcon className="me-2" icon={icon} inProgress={isSubmitting} />
            <span className="fw-semibold">{buttonLabel}</span>
        </Button>
    );
};

EntityFormSubmitButton.propTypes = {
    disabled: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
};

export default EntityFormSubmitButton;
