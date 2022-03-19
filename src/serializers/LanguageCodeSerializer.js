import Singleton from "singleton-decorator";
import { capitalize } from "lodash-es";

@Singleton
class LanguageCodeSerializer {
    serialize(value) {
        if (typeof value === "string") {
            capitalize(value);
        }
        return value;
    }

    deserialize(property) {
        if (typeof property === "string") {
            property.toLowerCase();
        }
        return property;
    }
}

export default LanguageCodeSerializer;
