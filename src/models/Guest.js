import {
    BeforeDeserialized,
    JsonConverter,
    JsonObject,
    JsonProperty,
    JsonType,
    OnDeserialized,
} from "ta-json";
import MomentSerializer from "serializers/MomentSerializer";
import { nanoid } from "nanoid";

@JsonObject()
class Guest {
    @JsonProperty("created_at")
    @JsonConverter(new MomentSerializer())
    @JsonType(String)
    createdAt = undefined;

    @JsonType(String)
    @JsonProperty("id")
    id = undefined;

    constructor() {
        this.uuidRegenerate();
    }

    @BeforeDeserialized()
    setDefaults() {
        this.vacanciesTaken = 0;
    }

    @OnDeserialized()
    uuidRegenerate() {
        this.uuid = nanoid();
    }
}

export default Guest;
