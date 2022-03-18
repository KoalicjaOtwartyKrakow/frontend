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

    return (
        <>
            {languagesSpoken.map((code) => (
                <Badge className="mb-1 me-1" key={code.code2}>
                    {ISO6391.getName(code.code2.toLowerCase())}
                </Badge>
            ))}
        </>
    );
};

export default HostItemLanguagesSpoken;
