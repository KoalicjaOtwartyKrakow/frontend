import Singleton from "singleton-decorator";

import { capitalize } from "lodash-es";

@Singleton
class LanguageCodeSerializer {
    serialize(value: any) {
        if (typeof value === "string") {
            capitalize(value);
        }
        return value;
    }

    deserialize(property: any) {
        if (typeof property === "string") {
            property.toLowerCase();
        }
        return property;
    }
}

export default LanguageCodeSerializer;
