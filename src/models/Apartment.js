import {
    BeforeDeserialized,
    JsonConverter,
    JsonElementType,
    JsonObject,
    JsonProperty,
    JsonType,
    JsonWriteonly,
    OnDeserialized
} from 'ta-json';
import MomentSerializer from 'serializers/MomentSerializer';
import { nanoid } from 'nanoid';

@JsonObject()
class Apartment {

    @JsonType(String)
    @JsonProperty('CNT_NAME')
    addressCountyName = '';

    @JsonType(String)
    @JsonProperty('CITY')
    addressCity = '';

    @JsonType(String)
    @JsonProperty('APT_NUM')
    addressFlatNumber = '';

    @JsonType(String)
    @JsonProperty('ST_NUM')
    addressStreetNumber = '' ;

    @JsonType(String)
    @JsonProperty('ST_NAME')
    addressStreetName = '' ;

    @JsonType(String)
    @JsonProperty('ZIP')
    addressZip = '';

    @JsonProperty('CreationTime')
    @JsonConverter(new MomentSerializer())
    @JsonType(String)
    createdAt = undefined;

    @JsonType(String)
    @JsonProperty('DESCRIPTION')
    description = '';

    @JsonType(String)
    @JsonProperty('ApartmentId')
    id = undefined;

    @JsonType(Boolean)
    @JsonProperty('IS_VERIFIED')
    isVerified = false;

    @JsonType(String)
    @JsonProperty('LANDLORD_EMAIL')
    landlordEmail = '' ;

    @JsonType(String)
    @JsonProperty('LANDLORD_NAME')
    landlordName = '' ;

    @JsonType(String)
    @JsonProperty('LANDLORD_PHONE')
    landlordPhone = '' ;

    @JsonType(Number)
    @JsonProperty('PLACES_NUM')
    peopleCountMax = 0;

    @JsonType(Number)
    @JsonProperty('PLACES_BUSY')
    peopleCountAllocated = 0;

    @JsonType(String)
    @JsonProperty('VOLUNTEER_NAME')
    volunteerName = '' ;

    constructor() {
        this.uuidRegenerate();
    }

    @BeforeDeserialized()
    setDefaults() {
        this.peopleCountAllocated = 0;
    }

    @OnDeserialized()
    uuidRegenerate() {
        this.uuid = nanoid();
    }

}

export default Apartment;
