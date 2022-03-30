import { JsonElementType, JsonObject, JsonProperty } from "ta-json";
import type { ApiFieldErrors } from "models/ApiValidationStatus";
// import { GuestFormField } from "components/guest/GuestFormTypes";

@JsonObject()
class GuestFieldErrors {
    @JsonProperty("priorityDate")
    @JsonElementType(String)
    // FIXME: we need something like this; i.e. keeping form field names in sync with GuestFieldErrors and the like
    // [GuestFormField.PRIORITY_DATE]: ApiFieldErrors = [];
    priorityDate: ApiFieldErrors = [];
}

export default GuestFieldErrors;
