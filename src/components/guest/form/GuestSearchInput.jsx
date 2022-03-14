import React, { useState, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { useGetGuests } from "hooks/api/guestsHooks";
import GuestSearchItem from "components/guest/form/GuestSearchItem";
const SearchInput = () => {
    const [caseSensitive] = useState(false);
    const [ignoreDiacritics] = useState(true);
    const [options, setOptions] = useState([]);
    const { guests, retrieveGuests } = useGetGuests();

    useEffect(() => {
        if (guests) {
            setOptions(guests);
        }
    }, [guests]);

    useEffect(() => {
        if (!guests) {
            retrieveGuests();
        }
    }, []);

    return (
        <Typeahead
            caseSensitive={caseSensitive}
            id="guests-search"
            ignoreDiacritics={ignoreDiacritics}
            options={options}
            placeholder="Guests"
            labelKey={"fullName"}
            renderMenuItemChildren={(option) => (
                <GuestSearchItem guest={option} />
            )}
        />
    );
};

export default SearchInput;
