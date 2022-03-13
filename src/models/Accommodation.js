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

    @JsonProperty()
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
        this.host.id = this.hostId;
    }
}

export default Accommodation;

// const a = {
//     addressLine: "string",
//     city: "string",
//     createdAt: "2022-03-13T20:23:45.485Z",
//     disabledPeopleFriendly: true,
//     easyAmbulanceAccess: true,
//     hostId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     lgbtFriendly: true,
//     ownerComments: "string",
//     parkingPlaceAvailable: true,
//     petsAccepted: true,
//     petsPresent: true,
//     staffComments: "string",
//     status: "created",
//     updatedAt: "2022-03-13T20:23:45.485Z",
//     vacanciesFree: 0,
//     vacanciesTotal: 0,
//     voivodeship: "DOLNOŚLĄSKIE",
//     zip: "string",
// };
