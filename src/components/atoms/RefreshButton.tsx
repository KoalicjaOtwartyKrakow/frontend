import React from "react";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/ProgressIcon'... Remove this comment to see the full error message
import ProgressIcon from "components/atoms/ProgressIcon";
import classNames from "classnames";

const RefreshButton = ({ className, disabled, inProgress, onClick }: any) => {
    const { t } = useTranslation(["common"]);
    const label = t("common:buttons.refresh");
    const buttonClassName = classNames(className);

    return (
        <Button color="primary" outline type="submit" disabled={disabled} className={buttonClassName} onClick={onClick}>
            <ProgressIcon className="me-2" icon={faRotate} inProgress={inProgress} />
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
