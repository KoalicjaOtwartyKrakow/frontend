import { JsonConverter, JsonObject, JsonProperty, JsonType, JsonWriteonly, OnDeserialized } from 'ta-json';
import MomentSerializer from 'serializers/MomentSerializer';
import { nanoid } from 'nanoid';

// {
//     'ZIP': '30-392',
//     'CITY': 'Krak\u00f3w',
//     'DESCRIPTION': 'Puste mieszkanie na 2 osoby',
//     'LANDLORD_PHONE': '\'+48111111111',
//     'ApartmentId': '33ae637c-5f42-48ef-80b6-b5e1c4256df1',
//     'LANDLORD_EMAIL': 'random@email.com',
//     'PLACES_NUM': 2,
//     'LANDLORD_NAME': 'Karol Nowak',
//     'CNT_NAME': 'Ma\u0142opolskie',
//     'APT_NUM': 45,
//     'ST_NAME': 'Czerwone Maki',
//     'VOLUNTEER_NAME': '',
//     'CreationTime': '26/02/2022 19:36:53',
//     'PLACES_BUSY': 0,
//     'ST_NUM': 45,
//     'IS_VERIFIED': false
// }

@JsonObject()
class Apartment {

    @JsonType(String)
    @JsonProperty('CNT_NAME')
    addressCountyName = '';

    @JsonType(String)
    @JsonProperty()
    addressCity = '';

    @JsonType(String)
    @JsonProperty()
    addressFlatNumber = '';

    @JsonType(String)
    @JsonProperty()
    addressStreetNumber = '' ;

    @JsonType(String)
    @JsonProperty()
    addressStreetName = '' ;

    @JsonType(String)
    @JsonProperty()
    addressZip = '';

    @JsonProperty()
    @JsonConverter(new MomentSerializer())
    @JsonType(String)
    createdAt = undefined;

    @JsonType(String)
    @JsonProperty()
    id = undefined;

    @JsonType(Number)
    @JsonProperty()
    peopleCount = 0;

    @JsonType(Number)
    @JsonProperty()
    peopleCountTaken = 0; // PLACES_BUSY = 0

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
