import {
    JsonConverter,
    JsonElementType,
    JsonObject,
    JsonProperty,
    JsonType,
    OnDeserialized,
} from "ta-json";
import MomentSerializer from "serializers/MomentSerializer";
import { nanoid } from "nanoid";
import GuestChild from "models/guest/GuestChild";
import { GuestStatus } from "models/constants/GuestStatus";
import { GuestPriorityStatus } from "./constants/GuestPriorityStatus";

@JsonObject()
class Guest {
    @JsonProperty()
    @JsonElementType(GuestChild)
    children = [];

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    createdAt = undefined;

    @JsonProperty()
    @JsonType(String)
    desiredDestination = "";

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

    @JsonProperty()
    @JsonType(String)
    howLongToStay = "";

    @JsonProperty()
    @JsonType(String)
    id = undefined;

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

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    priorityDate = undefined;

    @JsonProperty()
    @JsonType(String)
    priorityStatus = GuestPriorityStatus.IN_CRISIS_POINT;

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

    // constructor() {
    //     this.uuidRegenerate();
    // }

    @OnDeserialized()
    uuidRegenerate() {
        this.uuid = nanoid();
    }
}

export default Guest;
