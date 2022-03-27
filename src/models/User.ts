import { JsonObject, JsonProperty, JsonType, OnDeserialized } from "ta-json";
import { nanoid } from "nanoid";

@JsonObject()
class User {
    @JsonProperty("guid")
    @JsonType(String)
    id = undefined;

    @JsonProperty()
    @JsonType(String)
    givenName = "";

    @JsonProperty()
    @JsonType(String)
    familyName = "";

    // Not in the API yet
    phoneNumber = "";

    @JsonProperty()
    @JsonType(String)
    email = "";

    @JsonProperty("googlePicture")
    @JsonType(String)
    avatar = "";

    get fullName() {
        return `${this.givenName} ${this.familyName}`;
    }

    constructor() {
        this.uuidRegenerate();
    }

    @OnDeserialized()
    uuidRegenerate() {
        this.uuid = nanoid();
    }
}

export default User;
