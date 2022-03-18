import React, { useContext } from "react";
import { HostContext } from "components/host/HostContext";
import { Badge } from "reactstrap";
import ISO6391 from "iso-639-1";
import ReactCountryFlag from "react-country-flag"


const iso631_to_iso3166 = code => {
    const mapping = {
        'En': 'GB',
        'Pl': 'PL',
        'Ru': 'RU',
        'Uk': 'UA'
    }
    return mapping[code] || code
}

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
                <ReactCountryFlag
                    className="mb-1 me-1"
                    key={code.code2}
                    countryCode={iso631_to_iso3166(code.code2)}
                    svg
                    title={ISO6391.getName(code.code2.toLowerCase())}
                />
            ))}
        </>
    );
};

export default HostItemLanguagesSpoken;
