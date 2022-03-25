import React, { useContext } from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/GuestContext'... Remove this comment to see the full error message
import { GuestContext } from "components/guest/GuestContext";

/**
 *
 * @returns {JSX.Element}
 */
const GuestItemFullName = () => {
    const guest = useContext(GuestContext);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'fullName' does not exist on type 'unknow... Remove this comment to see the full error message
    const { fullName } = guest;
    return (
        <>
            <span className="fw-semibold">{fullName}</span>
        </>
    );
};

export default GuestItemFullName;
