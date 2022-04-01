import Singleton from "singleton-decorator";
import type { IPropertyConverter } from "ta-json";

@Singleton
class MultiLineStringSerializer implements IPropertyConverter {
    serialize(value?: string): string {
        if (typeof value !== "string") {
            return "";
        }
        return value;
    }

    deserialize(property: string) {
        if (!property || property.length === 0) {
            return "";
        }
        const decodedLineEndings = property.replace(/\\n/g, "\n");
        return decodedLineEndings;
    }
}

export default MultiLineStringSerializer;
