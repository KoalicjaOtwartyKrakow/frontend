import Chance from "chance";
import Accommodation from "models/Accommodation";
import Guest from "models/Guest";
import Host from "models/Host";
import { polishVoivodeships } from "models/constants/Address";
import { AccommodationStatus } from "models/constants/AccomodationStatus";
import { HostStatus } from "models/constants/HostStatus";
import { GuestPriorityStatus } from "models/constants/GuestPriorityStatus";

export function generateAllMocks() {
    const chance = new Chance(0xdeadbeef);

    const mockedGuests = Array.from({ length: 30 }, () => {
        const guest = new Guest();
        guest.id = chance.guid({ version: 5 });
        guest.verificationStatus = chance.pickone(Object.values(HostStatus));
        guest.email = chance.email();
        guest.phoneNumber = chance.phone();
        guest.children = [
            // TODO
        ];
        guest.howLongToStay = chance.sentence();
        guest.peopleFemaleCount = chance.natural({ min: 0, max: 4 });
        guest.peopleMaleCount = chance.natural({ min: 0, max: 4 });
        guest.financialStatus = chance.sentence();
        guest.petsPresent = chance.bool();
        guest.petsDescription = "3";
        guest.foodAllergies = "Chocolate";
        guest.meatFreeDiet = chance.bool();
        guest.glutenFreeDiet = chance.bool();
        guest.lactoseFreeDiet = chance.bool();
        guest.desiredDestination = chance.addressLine();
        guest.priorityStatus = chance.pickone(
            Object.values(GuestPriorityStatus)
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
