import Singleton from "singleton-decorator";
import type { IPropertyConverter } from "ta-json";

@Singleton
class NullifyId implements IPropertyConverter {
    serialize(value?: string): string | null {
        if (typeof value === "string" && value.trim() === "") {
            return null;
        }
        if (typeof value === "undefined") {
            return null;
        }
        return value;
    }

    deserialize(property: string) {
        return property;
    }
}

export default NullifyId;
