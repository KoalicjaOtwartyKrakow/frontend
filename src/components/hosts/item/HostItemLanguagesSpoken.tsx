import React, { useContext } from "react";
import { HostContext } from "components/host/HostContext";
import { Badge } from "reactstrap";
import ISO6391 from "iso-639-1";

/**
 *
 * @returns {JSX.Element}
 */
const HostItemLanguagesSpoken = () => {
    /**
     *
     * @type {Host}
     */
    const host = useContext(HostContext);
    // const { t } = useTranslation(["host"]);

    const { languagesSpoken } = host;

    const languages = languagesSpoken || [];

    return (
        <>
            {languages.map((language: any) => (
                <Badge className="mb-1 me-1" key={language.code}>
                    {ISO6391.getName(language.code)}
                </Badge>
            ))}
        </>
    );
};

export default HostItemLanguagesSpoken;
