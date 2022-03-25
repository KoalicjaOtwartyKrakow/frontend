import {
    JsonConverter,
    JsonElementType,
    JsonObject,
    JsonProperty,
    JsonReadonly,
    JsonType,
    JsonWriteonly,
    OnDeserialized,
} from "ta-json";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'serializers/MomentSerializer' ... Remove this comment to see the full error message
import MomentSerializer from "serializers/MomentSerializer";
import { nanoid } from "nanoid";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/constants/GuestStatus' ... Remove this comment to see the full error message
import { GuestStatus } from "models/constants/GuestStatus";
import { GuestPriorityStatus } from "./constants/GuestPriorityStatus";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/GuestAccommodation' or ... Remove this comment to see the full error message
import GuestAccommodation from "models/GuestAccommodation";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/User' or its correspond... Remove this comment to see the full error message
import User from "models/User";

@JsonObject()
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class Guest {
    @JsonProperty()
    @JsonType(GuestAccommodation)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    accommodationUnit = undefined;

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    accommodationUnitId = undefined;

    @JsonProperty("childrenAges")
    @JsonElementType(Number)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    children = [];

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    @JsonWriteonly()
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    claimedAt = undefined;

    @JsonProperty()
    @JsonType(User)
    @JsonWriteonly()
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    claimedBy = undefined;

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    claimedById = undefined;

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    createdAt = undefined;

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    desiredDestination = "";

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    documentNumber = "";

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    email = "";

    @JsonProperty("financeStatus")
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    financialStatus = "";

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    foodAllergies = "";

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    fullName = "";

    @JsonProperty()
    @JsonType(Boolean)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    glutenFreeDiet = false;

    @JsonProperty("howLongToStay")
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    durationOfStay = "";

    @JsonProperty("guid")
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    id = undefined;

    @JsonProperty()
    @JsonType(Boolean)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    isAgent = false;

    @JsonProperty()
    @JsonType(Boolean)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    lactoseFreeDiet = false;

    @JsonProperty()
    @JsonType(Boolean)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    meatFreeDiet = false;

    @JsonProperty("peopleInGroup")
    @JsonType(Number)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    peopleTotalCount = 1;

    @JsonProperty("adultFemaleCount")
    @JsonType(Number)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    peopleFemaleCount = 1;

    @JsonProperty("adultMaleCount")
    @JsonType(Number)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    peopleMaleCount = 0;

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    petsDescription = "";

    @JsonProperty("havePets")
    @JsonType(Number)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    petsPresent = false;

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    phoneNumber = "";

    /**
     * @type {moment.Moment}
     */
    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    priorityDate = undefined;

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    priorityStatus = GuestPriorityStatus.AT_R3;

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    specialNeeds = "";

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    updatedAt = undefined;

    @JsonProperty()
    @JsonType(String)
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    verificationStatus = GuestStatus.CREATED;

    constructor() {
        this.uuidRegenerate();
    }

    get accommodation() {
        return this.accommodationUnit;
    }

    set accommodation(accommodation) {
        this.accommodationUnit = accommodation;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'never'.
        this.accommodationUnitId = accommodation?.id;
    }

    static is(item: any) {
        return item instanceof Guest;
    }

    @OnDeserialized()
    // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
    uuidRegenerate() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'uuid' does not exist on type 'Guest'.
        this.uuid = nanoid();
        if (GuestAccommodation.is(this.accommodationUnit)) {
            // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
            this.accommodationUnitId = this.accommodationUnit.id;
        }
    }
}

export default Guest;
