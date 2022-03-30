import moment, { unitOfTime } from "moment";
import Singleton from "singleton-decorator";
import type { IPropertyConverter } from "ta-json";

const defaultValue = "0";
const defaultUnit = "days";

type Duration = { value: string; unit: string };

@Singleton
class DurationSerializer implements IPropertyConverter {
    serialize(duration?: moment.Duration): string {
        if (moment.isDuration(duration)) {
            const units = ["m", "w", "d"];
            const { value, unit } = this.getValueAndUnitFromDuration(duration, units);
            return `${value}${unit}`;
        }
        return `${defaultValue}${defaultUnit}`;
    }

    deserialize(property: string) {
        if (!property?.length) {
            return this.getDefaultDuration();
        }

        const { value, unit }: Duration = this.getValueAndUnitFromString(property);

        const unitToMomentUnitMap: { [key: string]: unitOfTime.DurationConstructor } = {
            m: "months",
            w: "weeks",
            d: "days",
            // Deprecated units
            month: "months",
            week: "weeks",
            day: "days",
        } as const;

        if (Object.keys(unitToMomentUnitMap).includes(unit)) {
            return moment.duration(value, unitToMomentUnitMap[unit]);
        }

        return moment.duration(value, unit as unitOfTime.DurationConstructor);
    }

    /**
     * For given moment.Duration, finds first non-zero integer value amongst duration
     * lengths expressed as fractional number of months, weeks and days.
     *
     * @example
     *
     * moment.duration(2, "months");
     * // {value: '2', unit: 'm'}
     * moment.duration(17, "days");
     * // {value: '17', unit: 'd'}
     * moment.duration(5, "weeks");
     * // {value: '5', unit: 'w'}
     *
     */
    getValueAndUnitFromDuration(duration: moment.Duration, units: string[]): Duration {
        const values = [duration.asMonths(), duration.asWeeks(), duration.asDays()];
        const index = values.findIndex((value) => Number.isInteger(value) && value > 0);
        if (index !== -1) {
            const value = values[index].toString();
            const unit = units[index];
            return { value, unit };
        }
        return { value: defaultValue, unit: defaultUnit };
    }

    getValueAndUnitFromString(property: string): Duration {
        const [, value, unit] = property.match(/(\d+)\s*(\w+)/) || ["", defaultValue, defaultUnit];
        return { value, unit };
    }

    getDefaultDuration(): moment.Duration {
        return moment.duration(defaultValue, defaultUnit);
    }
}

export default DurationSerializer;
export type { Duration };
