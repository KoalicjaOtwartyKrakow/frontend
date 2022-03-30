import moment from "moment-es6";
import Singleton from "singleton-decorator";

@Singleton
class DurationSerializer {
    serialize(value) {
        if (moment.isDuration(value)) {
            const values = [value.duration().months(), value.duration().weeks(), value.duration().days()];
            const units = ["m", "w", "d"];
            units.forEach((unit, index) => {
                const value = values[index];
                if (value > 0) {
                    return `${value}${unit}`;
                }
            });
        }
        return "";
    }

    deserialize(property) {
        if (typeof property === "string" && property.length > 0) {
            return moment(property);
        }
        return property;
    }
}

export default MomentSerializer;
