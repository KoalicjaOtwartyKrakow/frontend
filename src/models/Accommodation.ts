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
import { AccommodationStatus } from "models/constants/AccommodationStatus";
import Host from "models/Host";
import Guest from "models/Guest";
import moment from "moment";
import MultiLineStringSerializer from "serializers/MultiLineStringSerializer";
import DurationSerializer from "../serializers/DurationSerializer";

@JsonObject()
class Accommodation {
    @JsonProperty("city")
    @JsonType(String)
    addressCity = "";

    @JsonProperty()
    @JsonType(String)
    addressLine = "";

    @JsonProperty("voivodeship")
    @JsonType(String)
    addressVoivodeship = "";

    @JsonType(String)
    @JsonProperty("zip")
    addressZip = "";

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    createdAt: moment.Moment | undefined = undefined;

    @JsonConverter(new DurationSerializer())
    @JsonProperty("forHowLong")
    @JsonType(String)
    forHowLong: moment.Duration = new DurationSerializer().getDefaultDuration();

    @JsonProperty()
    @JsonElementType(Guest)
    guests = [];

    @JsonProperty()
    @JsonType(Host)
    host = new Host();

    @JsonProperty()
    @JsonType(String)
    hostId = undefined;

    @JsonProperty("guid")
    @JsonType(String)
    id: string | undefined = undefined;

    @JsonType(String)
    @JsonProperty()
    ownerComments = "";

    @JsonProperty("petsAccepted")
    @JsonType(Boolean)
    petsAllowed = true;

    @JsonProperty()
    @JsonType(Boolean)
    petsPresent = true;

    @JsonType(String)
    @JsonProperty()
    staffComments = "";

    @JsonProperty("verificationStatus")
    @JsonType(String)
    status = AccommodationStatus.CREATED;

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    updatedAt: moment.Moment | undefined = undefined;

    @JsonProperty()
    @JsonType(Number)
    vacanciesFree = 1;

    @JsonProperty()
    @JsonType(Number)
    vacanciesTotal = 1;

    @JsonProperty()
    @JsonType(Boolean)
    lgbtFriendly = false;

    @JsonProperty()
    @JsonType(Boolean)
    disabledPeopleFriendly = false;

    @JsonProperty()
    @JsonType(Boolean)
    parkingPlaceAvailable = false;

    @JsonProperty()
    @JsonType(Boolean)
    easyAmbulanceAccess = false;

    @JsonConverter(MultiLineStringSerializer)
    @JsonProperty()
    @JsonType(String)
    @JsonWriteonly()
    systemComments = "";

    public uuid: string = "";

    constructor() {
        this.uuidRegenerate();
    }

    get vacanciesTaken() {
        return this.vacanciesTotal - this.vacanciesFree;
    }

    set vacanciesTaken(value) {
        this.vacanciesFree = this.vacanciesTotal - value;
    }

    @BeforeDeserialized()
    workaroundBrokenApiData() {
        this.disabledPeopleFriendly = false;
        this.easyAmbulanceAccess = false;
        // forHowLong: null [? - Argasek]
        this.lgbtFriendly = false;
        this.parkingPlaceAvailable = false;
        this.petsAllowed = false;
        this.petsPresent = false;
        this.staffComments = "";
        this.vacanciesFree = 0;
        this.addressVoivodeship = "";
    }

    @OnDeserialized()
    uuidRegenerate() {
        if (this.vacanciesTotal === undefined) {
            this.vacanciesTotal = 0;
        }
        if (this.vacanciesFree === undefined) {
            this.vacanciesFree = this.vacanciesTotal;
        }
        this.uuid = nanoid();
    }

    static is(item: any) {
        return item instanceof Accommodation;
    }
}

export default Accommodation;
