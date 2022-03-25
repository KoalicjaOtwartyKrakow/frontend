import { JsonConverter, JsonElementType, JsonObject, JsonProperty, JsonType, OnDeserialized } from "ta-json";
import { nanoid } from "nanoid";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'serializers/MomentSerializer' ... Remove this comment to see the full error message
import MomentSerializer from "serializers/MomentSerializer";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/constants/HostStatus' o... Remove this comment to see the full error message
import { HostStatus } from "models/constants/HostStatus";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Language' or its corres... Remove this comment to see the full error message
import Language from "models/Language";

@JsonObject()
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class Host {
    @JsonProperty("guid")
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    id = undefined;

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    fullName = "";

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    email = "";

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    phoneNumber = "";

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    callAfter = "";

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    callBefore = "";

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    comments = "";

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    createdAt = undefined;

    @JsonProperty()
    @JsonElementType(Language)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    languagesSpoken = [new Language()];

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    status = HostStatus.CREATED;

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    updatedAt = undefined;

    constructor() {
        this.uuidRegenerate();
    }

    @OnDeserialized()
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    uuidRegenerate() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'uuid' does not exist on type 'Host'.
        this.uuid = nanoid();
    }

    canPickPhoneCalls() {
        console.warn("[Host] TODO canPickPhoneCalls() always returns true!");
        return true;
    }
}

export default Host;
