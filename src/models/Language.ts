import { JsonConverter, JsonObject, JsonProperty, JsonType } from "ta-json";
import LanguageCodeSerializer from "serializers/LanguageCodeSerializer";
import { invert, sortBy } from "lodash-es";
import ISO6391 from "iso-639-1";
import { iso6393To1 } from "iso-639-3";

const ISO6391To3 = invert(iso6393To1);

@JsonObject()
class Language {
    @JsonConverter(new LanguageCodeSerializer())
    @JsonProperty("code2")
    @JsonType(String)
    code = "pl";

    @JsonConverter(new LanguageCodeSerializer())
    @JsonProperty()
    @JsonType(String)
    code3 = "pol";

    @JsonProperty()
    @JsonType(String)
    name = "Polish";
}

const availableLanguages = sortBy(ISO6391.getLanguages(ISO6391.getAllCodes()), ["name"]).map((item) => {
    const language = new Language();
    language.code = item.code;
    language.code3 = ISO6391To3[item.code] || "";
    language.name = item.name;
    return language;
});

export { availableLanguages };
export default Language;
