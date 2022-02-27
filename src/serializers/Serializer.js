import { TaJson } from 'ta-json';
import camelcaseKeys from 'camelcase-keys';
import snakeCaseKeys from 'snakecase-keys';

const plainToClass = function (className, plain, convertCase = false) {
  const camelCasePlain = convertCase ? camelcaseKeys(plain) : plain;
  const object = TaJson.deserialize(camelCasePlain, className);
  return object;
};

const classToPlain = function (object, convertCase = false) {
  const camelCasePlain = TaJson.serialize(object);
  const plain = convertCase ? snakeCaseKeys(camelCasePlain) : camelCasePlain;
  return plain;
};

export {
  classToPlain,
  plainToClass,
};