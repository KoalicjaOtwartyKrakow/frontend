import { JsonConverter, JsonObject, JsonProperty, JsonType } from "ta-json";
import LanguageCodeSerializer from "serializers/LanguageCodeSerializer";

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

export default Language;
