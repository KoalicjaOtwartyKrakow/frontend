import React, { useState } from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import FormCheckbox from "components/atoms/form/FormCheckbox";
import { HostFormFields } from "components/host/HostFormFields";
import ISO6391 from "iso-639-1";
import {
    Token,
    Typeahead,
    TypeaheadInputMulti,
} from "react-bootstrap-typeahead";
import GuestFormAccommodationSearchItem from "components/guest/form/GuestFormAccommodationSearchItem";

// const languagesSpokenCheckbox = ({ value, label }) => {
//     return (
//         <Field
//             id={value}
//             key={value}
//             name={HostFormFields.LANGUAGES_SPOKEN}
//             value={value}
//             type="checkbox"
//             label={label}
//             component={FormCheckbox}
//             inline
//         />
//     );
// };

const HostFormLanguagesSpoken = () => {
    const { t } = useTranslation(["host"]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    const availableLanguages = ISO6391.getLanguages(ISO6391.getAllCodes());

    // const languagesSpokenCheckboxes = availableLanguages.map((language) => ({
    //     value: language.code2,
    //     label: ISO6391.getName(language.code2.toLowerCase()),
    // }));

    return (
        <FormGroup tag="fieldset">
            <legend className="form-label">
                {t("host:form.label.languagesSpoken")}
                {":"}
            </legend>
            <Typeahead
                multiple
                caseSensitive={false}
                id="language-search"
                ignoreDiacritics={true}
                options={availableLanguages}
                placeholder={t("host:form.label.languagesSpokenPlaceholder")}
                labelKey={"name"}
                filterBy={["code", "name"]}
                onChange={setSelectedLanguages}
                renderMenuItemChildren={(language) => (
                    <span>{language.name}</span>
                )}
                renderInput={(inputProps, props) => (
                    <TypeaheadInputMulti
                        {...inputProps}
                        selected={selectedLanguages}
                    >
                        {selectedLanguages.map((language, idx) => (
                            <Token
                                index={idx}
                                key={language.code}
                                onRemove={props.onRemove}
                                option={language}
                            >
                                {language.name}
                            </Token>
                        ))}
                    </TypeaheadInputMulti>
                )}
            />

            {/*{languagesSpokenCheckboxes.map(languagesSpokenCheckbox)}*/}
        </FormGroup>
    );
};

HostFormLanguagesSpoken.propTypes = {};

export default HostFormLanguagesSpoken;
