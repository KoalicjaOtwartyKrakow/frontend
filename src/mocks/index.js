import Chance from "chance";
import Accommodation from "models/Accommodation";
import Guest from "models/Guest";
import Host from "models/Host";
import { polishVoivodeships } from "models/constants/Address";
import { AccommodationStatus } from "models/constants/AccomodationStatus";
import { HostStatus } from "models/constants/HostStatus";

export function generateAllMocks() {
    const chance = new Chance();

    const mockedGuests = Array.from({ length: 30 }, () => {
        const guest = new Guest();
        guest.id = chance.guid({ version: 5 });
        guest.status = chance.pickone(Object.values(HostStatus));
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
            ];
        accommodation.addressCity = chance.city();
        accommodation.addressZip = chance.zip();
        accommodation.vacanciesTotal = chance.natural({ min: 1, max: 8 });
        accommodation.vacanciesFree = chance.natural({
            min: 0,
            max: accommodation.vacanciesTotal,
        });

        accommodation.comments = chance.paragraph();

        accommodation.hostId =
            mockedHosts[
                chance.natural({ min: 0, max: mockedHosts.length - 1 })
            ].id;

        accommodation.petsAllowed = chance.bool();
        accommodation.petsPresent = chance.bool();
        accommodation.status = chance.pickone(
            Object.values(AccommodationStatus)
        );

        return accommodation;
    });

    return { mockedAccommodations, mockedGuests, mockedHosts };
}
