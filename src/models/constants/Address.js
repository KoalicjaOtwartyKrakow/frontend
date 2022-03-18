const polishVoivodeships = Object.freeze([
    { id: "DOLNOSLASKIE", name: "dolnośląskie" },
    { id: "KUJAWSKOPOMORSKIE", name: "kujawsko-pomorskie" },
    { id: "LUBELSKIE", name: "lubelskie" },
    { id: "LUBUSKIE", name: "lubuskie" },
    { id: "LODZKIE", name: "łódzkie" },
    { id: "MALOPOLSKIE", name: "małopolskie" },
    { id: "MAZOWIECKIE", name: "mazowieckie" },
    { id: "OPOLSKIE", name: "opolskie" },
    { id: "PODKARPACKIE", name: "podkarpackie" },
    { id: "PODLASKIE", name: "podlaskie" },
    { id: "POMORSKIE", name: "pomorskie" },
    { id: "SLASKIE", name: "śląskie" },
    { id: "SWIETOKRZYSKIE", name: "świętokrzyskie" },
    { id: "WARMINSKOMAZURSKIE", name: "warmińsko-mazurskie" },
    { id: "WIELKOPOLSKIE", name: "wielkopolskie" },
    { id: "ZACHODNIOPOMORSKIE", name: "zachodniopomorskie" },
]);

const defaultPolishVoivodeshipId = "MALOPOLSKIE";

const getPolishVoivodeshipById = (id) => {
    return polishVoivodeships.find((item) => item.id === id);
};

const getPolishVoivodeshipNameById = (id) => {
    return getPolishVoivodeshipById(id)?.name || "-";
};

export {
    defaultPolishVoivodeshipId,
    getPolishVoivodeshipById,
    getPolishVoivodeshipNameById,
    polishVoivodeships,
};
