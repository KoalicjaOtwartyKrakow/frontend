import { JsonConverter, JsonElementType, JsonObject, JsonProperty, JsonType, OnDeserialized } from "ta-json";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'serializers/MomentSerializer' ... Remove this comment to see the full error message
import MomentSerializer from "serializers/MomentSerializer";
import { nanoid } from "nanoid";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/constants/Accommodation... Remove this comment to see the full error message
import { AccommodationStatus } from "models/constants/AccommodationStatus";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Host' or its correspond... Remove this comment to see the full error message
import Host from "models/Host";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Guest' or its correspon... Remove this comment to see the full error message
import Guest from "models/Guest";

@JsonObject()
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class Accommodation {
    @JsonProperty("city")
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    addressCity = "";

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    addressLine = "";

    @JsonProperty("voivodeship")
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    addressVoivodeship = "";

    @JsonType(String)
    @JsonProperty("zip")
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    addressZip = "";

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    createdAt = undefined;

    @JsonProperty()
    @JsonElementType(Guest)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    guests = [];

    @JsonProperty()
    @JsonType(Host)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    host = new Host();

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    hostId = undefined;

    @JsonProperty("guid")
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    id = undefined;

    @JsonType(String)
    @JsonProperty()
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    ownerComments = "";

    @JsonProperty("petsAccepted")
    @JsonType(Boolean)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    petsAllowed = true;

    @JsonProperty()
    @JsonType(Boolean)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    petsPresent = true;

    @JsonType(String)
    @JsonProperty()
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    staffComments = "";

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    status = AccommodationStatus.CREATED;

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    uuid = "";

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    updatedAt = undefined;

    @JsonProperty()
    @JsonType(Number)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    vacanciesFree = 1;

    @JsonProperty()
    @JsonType(Number)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    vacanciesTotal = 1;

    @JsonProperty()
    @JsonType(Boolean)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    lgbtFriendly = false;

    @JsonProperty()
    @JsonType(Boolean)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    disabledPeopleFriendly = false;

    @JsonProperty()
    @JsonType(Boolean)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    parkingPlaceAvailable = false;

    @JsonProperty()
    @JsonType(Boolean)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    easyAmbulanceAccess = false;

    constructor() {
        this.uuidRegenerate();
    }

    get vacanciesTaken() {
        return this.vacanciesTotal - this.vacanciesFree;
    }

    set vacanciesTaken(value) {
        this.vacanciesFree = this.vacanciesTotal - value;
    }

    @OnDeserialized()
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    uuidRegenerate() {
        this.uuid = nanoid();
    }

    static is(item: any) {
        return item instanceof Accommodation;
    }
}

export default Accommodation;
