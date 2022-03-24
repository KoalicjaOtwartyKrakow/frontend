import { JsonConverter, JsonElementType, JsonObject, JsonProperty, JsonType, OnDeserialized } from "ta-json";
import MomentSerializer from "serializers/MomentSerializer";
import { nanoid } from "nanoid";
import { GuestStatus } from "models/constants/GuestStatus";
import { GuestPriorityStatus } from "./constants/GuestPriorityStatus";
import GuestAccommodation from "models/GuestAccommodation";
import User from "models/User";

@JsonObject()
class Guest {
    @JsonProperty()
    @JsonType(GuestAccommodation)
    accommodationUnit = undefined;

    @JsonProperty()
    @JsonType(String)
    accommodationUnitId = undefined;

    @JsonProperty("childrenAges")
    @JsonElementType(Number)
    children = [];

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    claimedAt = undefined;

    @JsonProperty()
    @JsonType(User)
    claimedBy = undefined;

    @JsonProperty()
    @JsonType(String)
    claimedById = undefined;

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    createdAt = undefined;

    @JsonProperty()
    @JsonType(String)
    desiredDestination = "";

    @JsonProperty()
    @JsonType(String)
    documentNumber = "";

    @JsonProperty()
    @JsonType(String)
    email = "";

    @JsonProperty("financeStatus")
    @JsonType(String)
    financialStatus = "";

    @JsonProperty()
    @JsonType(String)
    foodAllergies = "";

    @JsonProperty()
    @JsonType(String)
    fullName = "";

    @JsonProperty()
    @JsonType(Boolean)
    glutenFreeDiet = false;

    @JsonProperty("howLongToStay")
    @JsonType(String)
    durationOfStay = "";

    @JsonProperty("guid")
    @JsonType(String)
    id = undefined;

    @JsonProperty()
    @JsonType(Boolean)
    isAgent = false;

    @JsonProperty()
    @JsonType(Boolean)
    lactoseFreeDiet = false;

    @JsonProperty()
    @JsonType(Boolean)
    meatFreeDiet = false;

    @JsonProperty("peopleInGroup")
    @JsonType(Number)
    peopleTotalCount = 1;

    @JsonProperty("adultFemaleCount")
    @JsonType(Number)
    peopleFemaleCount = 1;

    @JsonProperty("adultMaleCount")
    @JsonType(Number)
    peopleMaleCount = 0;

    @JsonProperty()
    @JsonType(String)
    petsDescription = "";

    @JsonProperty("havePets")
    @JsonType(Number)
    petsPresent = false;

    @JsonProperty()
    @JsonType(String)
    phoneNumber = "";

    /**
     * @type {moment.Moment}
     */
    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    priorityDate = undefined;

    @JsonProperty()
    @JsonType(String)
    priorityStatus = GuestPriorityStatus.AT_R3;

    @JsonProperty()
    @JsonType(String)
    specialNeeds = "";

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    updatedAt = undefined;

    @JsonProperty()
    @JsonType(String)
    verificationStatus = GuestStatus.CREATED;

    constructor() {
        this.uuidRegenerate();
    }

    get accommodation() {
        return this.accommodationUnit;
    }

    set accommodation(accommodation) {
        this.accommodationUnit = accommodation;
        this.accommodationUnitId = accommodation?.id;
    }

    static is(item) {
        return item instanceof Guest;
    }

    @OnDeserialized()
    uuidRegenerate() {
        this.uuid = nanoid();
        if (GuestAccommodation.is(this.accommodationUnit)) {
            this.accommodationUnitId = this.accommodationUnit.id;
        }
    }
}

export default Guest;
