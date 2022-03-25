import { JsonConverter, JsonObject, JsonProperty, JsonType } from "ta-json";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'serializers/LanguageCodeSerial... Remove this comment to see the full error message
import LanguageCodeSerializer from "serializers/LanguageCodeSerializer";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { invert, sortBy } from "lodash-es";
import ISO6391 from "iso-639-1";
import { iso6393To1 } from "iso-639-3";

const ISO6391To3 = invert(iso6393To1);

@JsonObject()
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class Language {
    @JsonConverter(new LanguageCodeSerializer())
    @JsonProperty("code2")
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    code = "pl";

    @JsonConverter(new LanguageCodeSerializer())
    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    code3 = "pol";

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    name = "Polish";
}

const availableLanguages = sortBy(ISO6391.getLanguages(ISO6391.getAllCodes()), ["name"]).map((item: any) => {
    const language = new Language();
    language.code = item.code;
    language.code3 = ISO6391To3[item.code] || "";
    language.name = item.name;
    return language;
});

export { availableLanguages };
export default Language;
