import {
    JsonConverter,
    JsonObject,
    JsonProperty,
    JsonType,
    OnDeserialized,
} from "ta-json";
import MomentSerializer from "serializers/MomentSerializer";
import { nanoid } from "nanoid";
import { AccommodationStatus } from "models/constants/AccomodationStatus";
import Host from "models/Host";

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

    @JsonProperty()
    @JsonType(String)
    staffComments = "";

    @JsonConverter(new MomentSerializer())
    @JsonProperty()
    @JsonType(String)
    createdAt = undefined;

    // @JsonProperty()
    // @JsonType(String)
    // description = "";

    @JsonProperty()
    @JsonType(Host)
    host = new Host();

    @JsonProperty()
    @JsonType(String)
    hostId = undefined;

    @JsonProperty()
    @JsonType(String)
    id = undefined;

    //@JsonProperty("acceptsPets")
    //@JsonType(String)
    @JsonProperty()
    @JsonType(Boolean)
    petsAllowed = true;

    //@JsonProperty("havePets")
    //@JsonType(String)
    @JsonProperty()
    @JsonType(Boolean)
    petsPresent = true;

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
        this.host.id = this.hostId;
    }
}

export default Accommodation;
