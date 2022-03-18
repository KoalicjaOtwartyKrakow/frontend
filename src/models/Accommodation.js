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
import { AccommodationStatus } from "models/constants/AccommodationStatus";
import Host from "models/Host";
import GuestChild from "models/guest/GuestChild";
import Guest from "models/Guest";

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
    createdAt = undefined;

    @JsonProperty()
    @JsonElementType(Guest)
    guests = [];

    @JsonProperty()
    @JsonType(Host)
    host = new Host();

    @JsonProperty()
    @JsonType(String)
    hostId = undefined;

    @JsonProperty()
    @JsonType(String)
    id = undefined;

    @JsonProperty()
    @JsonType(String)
    guid = undefined;

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

    get vacanciesTaken() {
        return this.vacanciesTotal - this.vacanciesFree;
    }

    set vacanciesTaken(value) {
        this.vacanciesFree = this.vacanciesTotal - value;
    }

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

    @OnDeserialized()
    uuidRegenerate() {
        this.uuid = nanoid();
    }
}

export default Accommodation;
