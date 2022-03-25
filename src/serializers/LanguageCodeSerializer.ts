// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'sing... Remove this comment to see the full error message
import Singleton from "singleton-decorator";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { capitalize } from "lodash-es";

@Singleton
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
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
