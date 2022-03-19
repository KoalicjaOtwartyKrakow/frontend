import {
    JsonConverter,
    JsonObject,
    JsonProperty,
    JsonType,
    OnDeserialized,
} from "ta-json";
import { nanoid } from "nanoid";
import LanguageCodeSerializer from "serializers/LanguageCodeSerializer";

@JsonObject()
class Language {
    @JsonConverter(new LanguageCodeSerializer())
    @JsonProperty()
    @JsonType(String)
    code2 = "pl";

    @JsonConverter(new LanguageCodeSerializer())
    @JsonProperty()
    @JsonType(String)
    code3 = "pol";

    @JsonConverter(new LanguageCodeSerializer())
    @JsonProperty()
    @JsonType(String)
    name = "polish";
}

export default Language;
