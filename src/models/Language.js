import { JsonObject, JsonProperty, JsonType, OnDeserialized } from "ta-json";
import { nanoid } from "nanoid";

@JsonObject()
class Language {
    @JsonProperty()
    @JsonType(String)
    code2 = 'Pl';

    @JsonProperty()
    @JsonType(String)
    code3 = 'pol';

    @JsonProperty()
    @JsonType(String)
    name = 'Polski';

    constructor() {
        this.uuidRegenerate();
    }

    @OnDeserialized()
    uuidRegenerate() {
        this.uuid = nanoid();
    }
}

export default Language;
