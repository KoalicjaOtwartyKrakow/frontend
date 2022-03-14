import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRotate } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import ProgressIcon from "components/atoms/ProgressIcon";
import classNames from "classnames";

const RefreshButton = ({ className, disabled, inProgress, onClick }) => {
    const { t } = useTranslation(["common"]);
    const label = t("common:data.refresh");
    const buttonClassName = classNames(className);

    return (
        <Button
            color="primary"
            outline
            type="submit"
            disabled={disabled}
            className={buttonClassName}
            onClick={onClick}
        >
            <ProgressIcon
                className="me-2"
                icon={faRotate}
                inProgress={inProgress}
            />
            <span className="fw-semibold">{label}</span>
        </Button>
    );
};

RefreshButton.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    inProgress: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

export default RefreshButton;
