import React from "react";
import { FormFeedback, FormGroup, FormText, Input } from "reactstrap";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { HostFormFields } from "components/host/HostFormFields";
import ISO6391 from "iso-639-1";
import {
    Token,
    Typeahead,
    TypeaheadInputMulti,
} from "react-bootstrap-typeahead";
import FormLabel from "components/atoms/form/FormLabel";
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import { sortBy } from "lodash-es";

const HostFormLanguagesSpoken = () => {
    const { t } = useTranslation(["common", "host"]);
    const formikContext = useFormikContext();
    const { setFieldValue, setFieldTouched, getFieldProps } = formikContext;
    const field = getFieldProps(HostFormFields.LANGUAGES_SPOKEN);
    const selectedLanguages = field.value || [];

    const availableLanguages = sortBy(
        ISO6391.getLanguages(ISO6391.getAllCodes()),
        ["name"]
    );

    const setSelectedLanguages = (languages) => {
        setFieldValue(HostFormFields.LANGUAGES_SPOKEN, languages);
    };

    const onRemove = (language) => {
        const languages = [...selectedLanguages].filter(
            (item) => item.code !== language.code
        );
        setSelectedLanguages(languages);
        setFieldTouched(HostFormFields.LANGUAGES_SPOKEN, true);
    };

    const renderInput = (inputProps) => {
        const error = FormikApiErrors.getError(
            HostFormFields.LANGUAGES_SPOKEN,
            formikContext
        );
        // FIXME: There is some issue with validation logic, it kicks in but then clears out
        // console.log(error);

        return (
            <>
                <TypeaheadInputMulti
                    {...inputProps}
                    selected={selectedLanguages}
                >
                    {selectedLanguages.map((language, idx) => (
                        <Token
                            index={idx}
                            key={language.code}
                            onRemove={onRemove}
                            option={language}
                        >
                            {language.name}
                        </Token>
                    ))}
                </TypeaheadInputMulti>
                {error && <FormFeedback>{t(error)}</FormFeedback>}
            </>
        );
    };

    return (
        <FormGroup tag="fieldset">
            <FormLabel className="form-label" required={true}>
                {t("host:form.label.languagesSpoken")}
            </FormLabel>
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
                renderInput={renderInput}
            />
            <FormText>{t("common:form.text.atLeastOneLanguage")}</FormText>
        </FormGroup>
    );
};

HostFormLanguagesSpoken.propTypes = {};

export default HostFormLanguagesSpoken;
