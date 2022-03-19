import Accommodation from "models/Accommodation";
import GuestAccommodation from "models/GuestAccommodation";

// The presence of GuestAccommodation is a workaround for (de-)serialization
// problems of ta-json. Apparently, it does not bode with circular class references
// well. How to reproduce: change `accommodation` field in Guest to type Accommodation
// instead of current GuestAccommodation.
export function isAccommodation(accommodation) {
    return (
        accommodation instanceof Accommodation ||
        accommodation instanceof GuestAccommodation
    );
}
