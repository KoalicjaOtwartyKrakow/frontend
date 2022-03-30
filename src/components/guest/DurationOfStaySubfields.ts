import { TimeUnit } from "models/constants/TimeUnit";

export class DurationOfStaySubfields {
    private static separator = " ";

    constructor(public dimensionlessValue: number, public unit: TimeUnit) { }

    static fromJoinedField(str: string) {
        return new DurationOfStaySubfields(parseInt(str), str.split(this.separator)[1] as TimeUnit);
    }

    toJoinedField() {
        return `${this.dimensionlessValue}${DurationOfStaySubfields.separator}${this.unit}`;
    }
}
