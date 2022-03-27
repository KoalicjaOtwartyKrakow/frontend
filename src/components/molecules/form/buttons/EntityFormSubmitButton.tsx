import React from "react";
import { Button } from "reactstrap";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import ProgressIcon from "components/atoms/ProgressIcon";
import { useTranslation } from "react-i18next";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

type Props = {
    disabled: boolean;
    isSubmitting: boolean;
    label: string;
    icon?: IconDefinition;
    usePleaseWaitLabel?: boolean;
};

const EntityFormSubmitButton = ({
    disabled,
    isSubmitting,
    label,
    icon = faCheck,
    usePleaseWaitLabel = false,
}: Props) => {
    const { t } = useTranslation(["common"]);
    const buttonLabel = isSubmitting && usePleaseWaitLabel ? t("common:data.pleaseWait") : label;
    return (
        <Button color="primary" type="submit" disabled={disabled} className="ms-2">
            <ProgressIcon className="me-2" icon={icon} inProgress={isSubmitting} />
            <span className="fw-semibold">{buttonLabel}</span>
        </Button>
    );
};

export default EntityFormSubmitButton;
