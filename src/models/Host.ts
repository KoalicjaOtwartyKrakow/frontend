import {
    JsonConverter,
    JsonElementType,
    JsonObject,
    JsonProperty,
    JsonType,
    JsonWriteonly,
    OnDeserialized,
} from "ta-json";
import { nanoid } from "nanoid";
import MomentSerializer from "serializers/MomentSerializer";
import { HostStatus } from "models/constants/HostStatus";
import Language from "models/Language";
import MultiLineStringSerializer from "serializers/MultiLineStringSerializer";

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
    createdAt: moment.Moment | undefined = undefined;

    @JsonProperty()
    @JsonElementType(Language)
    languagesSpoken = [new Language()];

    @JsonProperty()
    @JsonType(String)
    status = HostStatus.CREATED;

    @JsonConverter(MultiLineStringSerializer)
    @JsonProperty()
    @JsonType(String)
    @JsonWriteonly()
    systemComments = "";

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    updatedAt = undefined;

    public uuid: string = "";

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
