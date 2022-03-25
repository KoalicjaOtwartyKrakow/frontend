import { JsonObject, JsonProperty, JsonType, OnDeserialized } from "ta-json";
import { nanoid } from "nanoid";

@JsonObject()
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class GuestChild {
    @JsonProperty()
    @JsonType(Number)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    age = 1;

    constructor() {
        this.uuidRegenerate();
    }

    @OnDeserialized()
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    uuidRegenerate() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'uuid' does not exist on type 'GuestChild... Remove this comment to see the full error message
        this.uuid = nanoid();
    }
}

export default GuestChild;
