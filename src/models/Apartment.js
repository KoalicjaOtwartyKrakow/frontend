import { JsonConverter, JsonObject, JsonProperty, JsonType, JsonWriteonly, OnDeserialized } from 'ta-json';
import MomentSerializer from 'serializers/MomentSerializer';
import { nanoid } from 'nanoid';


@JsonObject()
class Apartment {
    @JsonType(String)
    @JsonProperty('cntName')
    addressCountyName = '';

    @JsonType(String)
    @JsonProperty('city')
    addressCity = '';

    @JsonType(String)
    @JsonProperty('aptNum')
    addressFlatNumber = '';

    @JsonType(String)
    @JsonProperty('stNum')
    addressStreetNumber = '' ;

    @JsonType(String)
    @JsonProperty('stName')
    addressStreetName = '' ;

    @JsonType(String)
    @JsonProperty('zip')
    addressZip = '';

    @JsonProperty('creationTime')
    @JsonConverter(new MomentSerializer())
    @JsonType(String)
    createdAt = undefined;

    @JsonType(String)
    @JsonProperty('apartmentId')
    id = undefined;

    @JsonType(Number)
    @JsonProperty('placesNum')
    peopleCount = 0;

    @JsonType(Number)
    @JsonProperty('placesBusy')
    peopleCountTaken = 0;

    @JsonType(String)
    @JsonProperty()
    description = '';

    @JsonType(Boolean)
    @JsonProperty()
    isVerified = false;

    @JsonType(String)
    @JsonProperty()
    landlordEmail = '' ;

    @JsonType(String)
    @JsonProperty()
    landlordName = '' ;

    @JsonType(String)
    @JsonProperty()
    landlordPhone = '' ;

    @JsonType(String)
    @JsonProperty()
    volunteerName = '' ;

    constructor() {
        this.uuidRegenerate();
    }

    @OnDeserialized()
    uuidRegenerate() {
        this.uuid = nanoid();
    }

}

export default Apartment;
