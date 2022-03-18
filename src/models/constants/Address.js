// TODO(mlazowik): the reason to use `guid` as the key here is that `FormSelect` assumes that all objects passed
//  to it have the key field of the same name. Domain objects from backend use `guid` for that, so we have to have
//  the same here.

const polishVoivodeships = Object.freeze([
    { guid: "DOLNOSLASKIE", name: "dolnośląskie" },
    { guid: "KUJAWSKOPOMORSKIE", name: "kujawsko-pomorskie" },
    { guid: "LUBELSKIE", name: "lubelskie" },
    { guid: "LUBUSKIE", name: "lubuskie" },
    { guid: "LODZKIE", name: "łódzkie" },
    { guid: "MALOPOLSKIE", name: "małopolskie" },
    { guid: "MAZOWIECKIE", name: "mazowieckie" },
    { guid: "OPOLSKIE", name: "opolskie" },
    { guid: "PODKARPACKIE", name: "podkarpackie" },
    { guid: "PODLASKIE", name: "podlaskie" },
    { guid: "POMORSKIE", name: "pomorskie" },
    { guid: "SLASKIE", name: "śląskie" },
    { guid: "SWIETOKRZYSKIE", name: "świętokrzyskie" },
    { guid: "WARMINSKOMAZURSKIE", name: "warmińsko-mazurskie" },
    { guid: "WIELKOPOLSKIE", name: "wielkopolskie" },
    { guid: "ZACHODNIOPOMORSKIE", name: "zachodniopomorskie" },
]);

const defaultPolishVoivodeshipId = "MALOPOLSKIE";

const getPolishVoivodeshipById = (guid) => {
    return polishVoivodeships.find((item) => item.guid === guid);
};

const getPolishVoivodeshipNameById = (guid) => {
    return getPolishVoivodeshipById(guid)?.name || "-";
};

export {
    defaultPolishVoivodeshipId,
    getPolishVoivodeshipById,
    getPolishVoivodeshipNameById,
    polishVoivodeships,
};
