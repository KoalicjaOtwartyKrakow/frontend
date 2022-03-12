import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

const RefreshButton = ({ className, disabled, onClick }) => {
    const { t } = useTranslation(["common"]);
    const label = t("common:data.refresh");

    return (
        <Button
            className={className}
            color="primary"
            disabled={disabled}
            onClick={onClick}
        >
            <span>
                {label} <FontAwesomeIcon icon={faRotate} />
            </span>
        </Button>
    );
};

RefreshButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default RefreshButton;
