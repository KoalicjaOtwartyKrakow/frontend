import { JsonObject, JsonProperty, JsonType, OnDeserialized } from "ta-json";
import { nanoid } from "nanoid";

@JsonObject()
class GuestChild {
    @JsonProperty
    @JsonType(Number)
    age = 1;

    constructor() {
        this.uuidRegenerate();
    }

    @OnDeserialized()
    uuidRegenerate() {
        this.uuid = nanoid();
    }
}

export default GuestChild;
