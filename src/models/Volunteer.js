import { JsonObject, JsonProperty, JsonType, OnDeserialized } from "ta-json";
import { nanoid } from "nanoid";

@JsonObject()
class Volunteer {
    @JsonProperty()
    @JsonType(String)
    id = undefined;

    @JsonProperty()
    @JsonType(String)
    fullName = "";

    @JsonProperty()
    @JsonType(String)
    phoneNumber = "";

    constructor() {
        this.uuidRegenerate();
    }

    @OnDeserialized()
    uuidRegenerate() {
        this.uuid = nanoid();
    }
}

export default Volunteer;
