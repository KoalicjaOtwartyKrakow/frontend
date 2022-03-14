import React, { useContext } from "react";
import { HostContext } from "components/host/HostContext";
import { useTranslation } from "react-i18next";
import { Badge } from "reactstrap";

/**
 *
 * @returns {JSX.Element}
 */
const HostItemStatus = () => {
    /**
     *
     * @type {Host}
     */
    const host = useContext(HostContext);
    const { t } = useTranslation(["host"]);

    const { languagesSpoken } = host;

    return (
        <div>
            {languagesSpoken.map((language) => (
                <Badge key={language}>{language}</Badge>
            ))}
        </div>
    );
};

export default HostItemStatus;
