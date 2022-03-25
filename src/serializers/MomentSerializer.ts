import moment from "moment-es6";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'sing... Remove this comment to see the full error message
import Singleton from "singleton-decorator";

@Singleton
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class MomentSerializer {
    serialize(value: any) {
        if (moment.isMoment(value)) {
            return value.format();
        }
        return value;
    }

    deserialize(property: any) {
        if (typeof property === "string" && property.length > 0) {
            // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
            return moment(property);
        }
        return property;
    }

    /**
     * @param {Date|*} value
     * @param {*} [emptyValue]
     * @returns {moment.Moment|*}
     */
    fromDate(value: any, emptyValue = undefined) {
        // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
        return value instanceof Date ? moment(value) : emptyValue;
    }

    /**
     * @param {moment.Moment|*} value
     * @param {*} [emptyValue]
     * @returns {Date|*}
     */
    toDate(value: any, emptyValue = undefined) {
        return moment.isMoment(value) ? value.toDate() : emptyValue;
    }

    fromInputDate(value: any, emptyValue = undefined) {
        // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
        return value ? moment(value, "YYYY-MM-DD") : emptyValue;
    }

    toInputDate(value: any, emptyValue = undefined) {
        return moment.isMoment(value) ? value.format("YYYY-MM-DD") : emptyValue;
    }
}

export default MomentSerializer;
