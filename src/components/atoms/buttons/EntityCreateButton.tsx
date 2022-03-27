import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Button } from "reactstrap";

import ProgressIcon from "components/atoms/ProgressIcon";
import classNames from "classnames";

const EntityCreateButton = ({ className, disabled = false, inProgress = false, onClick, label }: any) => {
    const { t } = useTranslation(["common"]);
    const buttonClassName = classNames(className);

    label = label || t("common:buttons.create");

    return (
        <Button color="primary" type="submit" disabled={disabled} className={buttonClassName} onClick={onClick}>
            <ProgressIcon className="me-2" icon={faPlus} inProgress={inProgress} />
            <span className="fw-semibold">{label}</span>
        </Button>
    );
};

export default EntityCreateButton;
