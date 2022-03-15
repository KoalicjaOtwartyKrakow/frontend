import React from "react";
import "components/guests/GuestListItem.sass";
import { GuestContext } from "components/guest/GuestContext";
import GuestItemFullName from "components/guests/item/GuestItemFullName";
import GuestItemPhone from "components/guests/item/GuestItemPhone";

const GuestSearchItem = ({ guest }) => {
    return (
        <GuestContext.Provider value={guest}>
            <GuestItemFullName />
            <GuestItemPhone />
        </GuestContext.Provider>
    );
};

export default GuestSearchItem;
