import {
    JsonConverter,
    JsonElementType,
    JsonObject,
    JsonProperty,
    JsonType,
    OnDeserialized,
} from "ta-json";
import { nanoid } from "nanoid";
import MomentSerializer from "serializers/MomentSerializer";
import { HostStatus } from "models/constants/HostStatus";

@JsonObject()
class Host {
    @JsonProperty()
    @JsonType(String)
    id = undefined;

    @JsonProperty()
    @JsonType(String)
    fullName = "";

    @JsonProperty()
    @JsonType(String)
    email = "";

    @JsonProperty()
    @JsonType(String)
    phoneNumber = "";

    @JsonProperty()
    @JsonType(String)
    callAfter = "";

    @JsonProperty()
    @JsonType(String)
    callBefore = "";

    @JsonProperty()
    @JsonType(String)
    comments = "";

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    createdAt = undefined;

    @JsonProperty()
    @JsonElementType(Array)
    languagesSpoken = ["pl"];

    @JsonProperty()
    @JsonType(String)
    status = HostStatus.CREATED;

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    updatedAt = undefined;

    constructor() {
        this.uuidRegenerate();
    }

    @OnDeserialized()
    uuidRegenerate() {
        this.uuid = nanoid();
    }

    canPickPhoneCalls() {
        console.warn("[Host] TODO canPickPhoneCalls() always returns true!");
        return true;
    }
}

export default Host;
