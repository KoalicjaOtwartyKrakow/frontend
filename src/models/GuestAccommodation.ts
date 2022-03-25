import { JsonConverter, JsonObject, JsonProperty, JsonType, OnDeserialized } from "ta-json";
import MomentSerializer from "serializers/MomentSerializer";
import { nanoid } from "nanoid";
import { AccommodationStatus } from "models/constants/AccommodationStatus";
import Host from "models/Host";

@JsonObject()
class GuestAccommodation {
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
    createdAt = undefined;

    @JsonProperty()
    @JsonType(Host)
    host = new Host();

    @JsonProperty()
    @JsonType(String)
    hostId = undefined;

    @JsonProperty("guid")
    @JsonType(String)
    id = undefined;

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

    @JsonProperty()
    @JsonType(String)
    status = AccommodationStatus.CREATED;

    @JsonProperty()
    @JsonType(String)
    uuid = "";

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    updatedAt = undefined;

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
    uuidRegenerate() {
        this.uuid = nanoid();
    }

    static is(item) {
        return item instanceof GuestAccommodation;
    }
}

export default GuestAccommodation;
