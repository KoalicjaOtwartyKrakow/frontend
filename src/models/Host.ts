import { JsonConverter, JsonElementType, JsonObject, JsonProperty, JsonType, OnDeserialized } from "ta-json";
import { nanoid } from "nanoid";

import MomentSerializer from "serializers/MomentSerializer";

import { HostStatus } from "models/constants/HostStatus";

import Language from "models/Language";

@JsonObject()
class Host {
    @JsonProperty("guid")
    @JsonType(String)
    id: string | undefined = undefined;

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
    @JsonElementType(Language)
    languagesSpoken = [new Language()];

    @JsonProperty()
    @JsonType(String)
    status = HostStatus.CREATED;

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    updatedAt = undefined;

    private uuid: string;

    constructor() {
        this.uuid = nanoid();
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
