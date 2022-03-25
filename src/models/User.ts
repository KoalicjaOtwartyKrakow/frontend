import { JsonObject, JsonProperty, JsonType, OnDeserialized } from "ta-json";
import { nanoid } from "nanoid";

@JsonObject()
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class User {
    @JsonProperty("guid")
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    id = undefined;

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    givenName = "";

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    familyName = "";

    // Not in the API yet
    phoneNumber = "";

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    email = "";

    @JsonProperty("googlePicture")
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    avatar = "";

    get fullName() {
        return `${this.givenName} ${this.familyName}`;
    }

    constructor() {
        this.uuidRegenerate();
    }

    @OnDeserialized()
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    uuidRegenerate() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'uuid' does not exist on type 'User'.
        this.uuid = nanoid();
    }
}

export default User;
