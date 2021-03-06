import React from "react";
import { FormFeedback, FormGroup, FormText } from "reactstrap";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { HostFormFields } from "components/host/HostFormFields";
import { Token, Typeahead, TypeaheadInputMulti } from "react-bootstrap-typeahead";
import FormLabel from "components/atoms/form/FormLabel";
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import Language, { availableLanguages } from "models/Language";
import FormErrorsFeedback from "components/atoms/form/FormErrorsFeedback";

const HostFormLanguagesSpoken = () => {
    const { t } = useTranslation(["common", "host"]);
    const formikContext = useFormikContext();
    const { setFieldValue, setFieldTouched, getFieldProps } = formikContext;
    const fieldName = HostFormFields.LANGUAGES_SPOKEN;
    const field = getFieldProps(fieldName);
    const selectedLanguages = field.value || [];

    /**
     *
     * @param {Language[]} languages
     */
    const setSelectedLanguages = (languages: any) => {
        setFieldValue(fieldName, languages, true);
    };

    /**
     *
     * @param {Language} language
     */
    const onRemove = (language: any) => {
        const languages = [...selectedLanguages].filter((item) => item.code !== language.code);
        setFieldTouched(fieldName, true);
        setSelectedLanguages(languages);
    };

    /**
     *
     * @param {Language} language
     * @returns {JSX.Element}
     */
    const languageToToken = (language: Language) => (
        <Token key={language.code} onRemove={onRemove} option={language}>
            {language.name}
        </Token>
    );

    const errors = FormikApiErrors.getErrors(fieldName, formikContext);

    const renderInput = (inputProps: any) => {
        return (
            <>
                <TypeaheadInputMulti {...inputProps} selected={selectedLanguages}>
                    {selectedLanguages.map(languageToToken)}
                </TypeaheadInputMulti>
                <FormErrorsFeedback name={fieldName} />
            </>
        );
    };

    const renderMenuItemChildren = (language: any) => <span>{language.name}</span>;

    return (
        <FormGroup tag="fieldset">
            <FormLabel className="form-label" required={true}>
                {t("host:form.label.languagesSpoken")}
            </FormLabel>
            <Typeahead
                caseSensitive={false}
                filterBy={["code", "name"]}
                id="language-search"
                ignoreDiacritics={true}
                labelKey={"name"}
                multiple
                onChange={setSelectedLanguages}
                options={availableLanguages}
                placeholder={t("host:form.label.languagesSpokenPlaceholder")}
                renderInput={renderInput}
                renderMenuItemChildren={renderMenuItemChildren}
                selected={selectedLanguages}
            />
            {!errors.length && <FormText>{t("common:form.text.atLeastOneLanguage")}</FormText>}
        </FormGroup>
    );
};

export default HostFormLanguagesSpoken;
