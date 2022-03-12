import Chance from "chance";
import Accommodation from "models/Accommodation";
import Guest from "models/Guest";
import Host from "models/Host";
import { polishVoivodeships } from "models/constants/Address";
import { AccommodationStatus } from "models/constants/AccomodationStatus";
import { HostStatus } from "models/constants/HostStatus";
import { GuestPriorityStatus } from "models/constants/GuestPriorityStatus";
import moment from "moment-es6";
import GuestChild from "models/guest/GuestChild";

const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
};

export function generateAllMocks() {
    const chance = new Chance(0xdeadbeef);

    const mockedGuests = Array.from({ length: 30 }, () => {
        const guest = new Guest();
        guest.id = chance.guid({ version: 5 });
        guest.fullName = chance.name();
        guest.verificationStatus = chance.pickone(Object.values(HostStatus));
        guest.email = chance.email();
        guest.phoneNumber = chance.phone();
        guest.children = Array.from(
            { length: chance.natural({ min: 0, max: 3 }) },
            () => {
                const guestChild = new GuestChild();
                guestChild.age = chance.age({ type: "child" });
                return guestChild;
            }
        );
        const stayDuration = moment.duration({
            months: chance.natural({ min: 0, max: 3 }),
            days: chance.natural({ min: 1, max: 28 }),
        });
        guest.durationOfStay = stayDuration.humanize();
        guest.peopleFemaleCount = chance.natural({ min: 1, max: 2 });
        guest.peopleMaleCount = chance.natural({ min: 0, max: 3 });
        guest.peopleTotalCount =
            guest.peopleFemaleCount +
            guest.peopleMaleCount +
            guest.children.length;
        guest.financialStatus = chance.sentence();
        guest.petsPresent = chance.bool();
        guest.petsDescription = "3";

        const foodAllergies = ["Chocolate", "Nuts", "Strawberry"];
        const foodAllergiesQuantity = chance.natural({
            min: 0,
            max: Math.min(foodAllergies.length, 2),
        });

        guest.foodAllergies = chance
            .pickset(foodAllergies, foodAllergiesQuantity)
            .join(", ");

        guest.meatFreeDiet = chance.bool();
        guest.glutenFreeDiet = chance.bool();
        guest.lactoseFreeDiet = chance.bool();
        guest.desiredDestination = chance.address();
        guest.priorityStatus = chance.pickone(
            Object.values(GuestPriorityStatus)
        );

        const daysFromStartOfWar = moment().diff(moment("2022-02-24"), "days");
        guest.priorityDate = moment().subtract(
            chance.natural({ min: 0, max: daysFromStartOfWar }),
            "days"
        );

        return guest;
    });

    const mockedHosts = Array.from({ length: 30 }, () => {
        const host = new Host();
        host.id = chance.guid({ version: 5 });
        host.fullName = chance.name();
        host.email = chance.email();
        host.phoneNumber = chance.phone();
        host.status = chance.pickone(Object.values(HostStatus));
        host.comments = chance.paragraph();
        host.languagesSpoken = Array.from(
            { length: chance.integer({ min: 0, max: 2 }) },
            () => chance.locale()
        )
            .concat(["pl"])
            .filter(onlyUnique);
        return host;
    });

    const mockedAccommodations = Array.from({ length: 15 }, () => {
        const accommodation = new Accommodation();
        accommodation.id = chance.guid({ version: 5 });
        accommodation.addressLine = chance.address();
        accommodation.addressVoivodeship =
            polishVoivodeships[
                chance.natural({ min: 0, max: polishVoivodeships.length - 1 })
            ].id;
        accommodation.addressCity = chance.city();
        const zip = chance.zip().split("");
        zip.splice(2, 0, "-");
        accommodation.addressZip = zip.join("");

        accommodation.status = chance.pickone(
            Object.values(AccommodationStatus)
        );

        accommodation.vacanciesTotal = chance.natural({ min: 1, max: 8 });
        switch (accommodation.status) {
            case AccommodationStatus.CREATED:
                accommodation.vacanciesFree = accommodation.vacanciesTotal;
                break;
            case AccommodationStatus.REJECTED:
                accommodation.vacanciesFree = 0;
                break;
            case AccommodationStatus.VERIFIED:
                accommodation.vacanciesFree = chance.natural({
                    min: 0,
                    max: accommodation.vacanciesTotal,
                });
                break;
        }

        accommodation.comments = chance.paragraph();
        accommodation.description = chance.paragraph({ sentences: 2 });

        accommodation.hostId =
            mockedHosts[
                chance.natural({ min: 0, max: mockedHosts.length - 1 })
            ].id;

        accommodation.petsAllowed = chance.bool();
        accommodation.petsPresent = chance.bool();

        return accommodation;
    });

    return { mockedAccommodations, mockedGuests, mockedHosts };
}
