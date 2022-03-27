import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const ProgressIcon = ({ className = "mr-sm-2", icon, inProgress, ...rest }: any) => (
    <FontAwesomeIcon className={className} icon={inProgress ? faCircleNotch : icon} spin={inProgress} {...rest} />
);

export default ProgressIcon;
