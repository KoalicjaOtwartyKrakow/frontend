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

@JsonObject()
class Accommodation {
    @JsonProperty("city")
    @JsonType(String)
    addressCity = "";

    @JsonProperty
    @JsonType(String)
    addressLine = "";

    @JsonProperty("voivodeship")
    @JsonType(String)
    addressVoivodeship = "";

    @JsonType(String)
    @JsonProperty("zip")
    addressZip = "";

    @JsonProperty
    @JsonType(String)
    comments = "";

    @JsonConverter(new MomentSerializer())
    @JsonProperty
    @JsonType(String)
    createdAt = undefined;

    @JsonProperty
    @JsonType(String)
    hostId = undefined;

    @JsonProperty
    @JsonType(String)
    id = undefined;

    @JsonProperty("acceptsPets")
    @JsonType(String)
    petsAllowed = true;

    @JsonProperty("havePets")
    @JsonType(String)
    petsPresent = false;

    @JsonProperty
    @JsonType(String)
    status = AccommodationStatus.CREATED;

    @JsonConverter(new MomentSerializer())
    @JsonProperty
    @JsonType(String)
    updatedAt = undefined;

    @JsonProperty
    @JsonType(Number)
    vacanciesFree = 1;

    @JsonProperty
    @JsonType(Number)
    vacanciesTotal = 1;

    get vacanciesTaken() {
        return this.vacanciesTotal - this.vacanciesFree;
    }

    @OnDeserialized()
    uuidRegenerate() {
        this.uuid = nanoid();
    }
}

export default Accommodation;
