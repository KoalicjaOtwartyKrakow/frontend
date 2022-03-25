import React from "react";
import { FormFeedback, FormGroup, FormText } from "reactstrap";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/host/HostFormFields... Remove this comment to see the full error message
import { HostFormFields } from "components/host/HostFormFields";
import { Token, Typeahead, TypeaheadInputMulti } from "react-bootstrap-typeahead";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormLabe... Remove this comment to see the full error message
import FormLabel from "components/atoms/form/FormLabel";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormikAp... Remove this comment to see the full error message
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Language' or its corres... Remove this comment to see the full error message
import { availableLanguages } from "models/Language";

const HostFormLanguagesSpoken = () => {
    const { t } = useTranslation(["common", "host"]);
    const formikContext = useFormikContext();
    const { setFieldValue, setFieldTouched, getFieldProps } = formikContext;
    const field = getFieldProps(HostFormFields.LANGUAGES_SPOKEN);
    const selectedLanguages = field.value || [];

    /**
     *
     * @param {Language[]} languages
     */
    const setSelectedLanguages = (languages: any) => {
        setFieldValue(HostFormFields.LANGUAGES_SPOKEN, languages, true);
    };

    /**
     *
     * @param {Language} language
     */
    const onRemove = (language: any) => {
        const languages = [...selectedLanguages].filter((item) => item.code !== language.code);
        setFieldTouched(HostFormFields.LANGUAGES_SPOKEN, true);
        setSelectedLanguages(languages);
    };

    /**
     *
     * @param {Language} language
     * @returns {JSX.Element}
     */
    const languageToToken = (language: any) => (
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: any; index: any; key: any; onRem... Remove this comment to see the full error message
        <Token index={language.code} key={language.code} onRemove={onRemove} option={language}>
            {language.name}
        </Token>
    );

    const error = FormikApiErrors.getError(HostFormFields.LANGUAGES_SPOKEN, formikContext);

    const renderInput = (inputProps: any) => {
        return (
            <>
                <TypeaheadInputMulti {...inputProps} selected={selectedLanguages}>
                    {selectedLanguages.map(languageToToken)}
                </TypeaheadInputMulti>
                {error && <FormFeedback className="d-block">{t(error)}</FormFeedback>}
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
            {!error && <FormText>{t("common:form.text.atLeastOneLanguage")}</FormText>}
        </FormGroup>
    );
};

HostFormLanguagesSpoken.propTypes = {};

export default HostFormLanguagesSpoken;
