import Chance from "chance";
import moment from "moment-es6";

const chance = new Chance(0xdeadbeef);
const daysFromStartOfWar = moment().diff(moment("2022-02-24"), "days");

const getMockedHoursAndMinutes = () => {
    const randomHour = chance.hour({ twentyfour: true }).toString();
    const randomMinute = chance.minute();
    const mockedMoment = moment({ hour: randomHour, minute: randomMinute });
    return mockedMoment.format("HH:mm");
};

function getRandomItem(items) {
    return items[chance.natural({ min: 0, max: items.length - 1 })];
}

const availableLanguages = Object.freeze([
    { code: "en", code3: "eng", name: "English" },
    { code: "pl", code3: "pol", name: "Polish" },
    { code: "uk", code3: "ukr", name: "Ukrainian" },
    { code: "ru", code3: "rus", name: "Russian" },
]);

export { availableLanguages, chance, daysFromStartOfWar, getMockedHoursAndMinutes, getRandomItem };
