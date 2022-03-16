import { TaJson } from "ta-json";
import camelcaseKeys from "camelcase-keys";
import snakeCaseKeys from "snakecase-keys";

const plainToClass = function (className, plain, convertCase = false) {
    const camelCasePlain = convertCase ? camelcaseKeys(plain) : plain;
    return TaJson.deserialize(camelCasePlain, className);
};

const classToPlain = function (object, convertCase = false) {
    const camelCasePlain = TaJson.serialize(object);
    return convertCase ? snakeCaseKeys(camelCasePlain) : camelCasePlain;
};

export { classToPlain, plainToClass };
