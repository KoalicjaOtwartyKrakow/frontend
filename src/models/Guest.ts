import {
    BeforeDeserialized,
    JsonConverter,
    JsonElementType,
    JsonObject,
    JsonProperty,
    JsonType,
    JsonWriteonly,
    OnDeserialized,
} from "ta-json";
import MomentSerializer from "serializers/MomentSerializer";
import { nanoid } from "nanoid";
import { GuestStatus } from "models/constants/GuestStatus";
import { GuestPriorityStatus } from "./constants/GuestPriorityStatus";
import GuestAccommodation from "models/GuestAccommodation";
import User from "models/User";
import moment from "moment";
import DurationSerializer from "serializers/DurationSerializer";
import MultiLineStringSerializer from "serializers/MultiLineStringSerializer";
import NullifyId from "serializers/NullifyId";

@JsonObject()
class Guest {
    @JsonProperty()
    @JsonType(GuestAccommodation)
    accommodationUnit: GuestAccommodation | undefined = undefined;

    @JsonConverter(new NullifyId())
    @JsonProperty()
    @JsonType(String)
    accommodationUnitId: string | undefined | null = undefined;

    @JsonProperty("childrenAges")
    @JsonElementType(Number)
    children: number[] = [];

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    @JsonWriteonly()
    claimedAt = undefined;

    @JsonProperty()
    @JsonType(User)
    @JsonWriteonly()
    claimedBy = undefined;

    @JsonProperty()
    @JsonType(String)
    claimedById = undefined;

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    createdAt: moment.Moment | undefined = undefined;

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

    @JsonType(String)
    @JsonProperty("staffComments")
    staffComments = "";

    @JsonConverter(new DurationSerializer())
    @JsonProperty("howLongToStay")
    @JsonType(String)
    durationOfStay: moment.Duration = new DurationSerializer().getDefaultDuration();

    @JsonProperty("guid")
    @JsonType(String)
    id: string | undefined = undefined;

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

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    priorityDate: moment.Moment | undefined = undefined;

    @JsonProperty()
    @JsonType(String)
    priorityStatus = GuestPriorityStatus.IN_KRAKOW;

    @JsonProperty()
    @JsonType(String)
    specialNeeds = "";

    @JsonConverter(MultiLineStringSerializer)
    @JsonProperty()
    @JsonType(String)
    @JsonWriteonly()
    systemComments = "";

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    updatedAt = undefined;

    @JsonProperty()
    @JsonType(String)
    verificationStatus = GuestStatus.CREATED;

    public uuid: string = "";

    get accommodation() {
        // @ts-ignore
        return this.accommodationUnit;
    }

    set accommodation(accommodation: GuestAccommodation) {
        this.accommodationUnit = accommodation;

        this.accommodationUnitId = accommodation?.id;
    }

    static is(item: any) {
        return item instanceof Guest;
    }

    @BeforeDeserialized()
    workaroundBrokenApiData() {
        this.durationOfStay = new DurationSerializer().getDefaultDuration();
        this.priorityDate = undefined;
        this.priorityStatus = GuestPriorityStatus.IN_KRAKOW;
    }

    @OnDeserialized()
    uuidRegenerate() {
        this.uuid = nanoid();
        if (GuestAccommodation.is(this.accommodationUnit)) {
            this.accommodationUnitId = this.accommodationUnit?.id;
        }
    }
}

export default Guest;
