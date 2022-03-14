import React, { useState } from "react";
import { InputGroup, Input, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const SearchInput = ({ onSearch, customSearchList }) => {
    const [value, setValue] = useState("");
    let timeout = null;
    const handleOnKeyUp = () => {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            onSearch(value);
        }, 1000);
    };
    return (
        <>
            <InputGroup>
                <Input
                    placeholder="Search..."
                    onKeyUp={handleOnKeyUp}
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                />
                <Button>
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </InputGroup>
            {customSearchList ? customSearchList : <></>}
        </>
    );
};

export default SearchInput;
