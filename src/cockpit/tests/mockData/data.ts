import City from "../../wings/City";
import Day from "../../wings/Day";
import Place from "../../wings/Place";
import Trip from "../../wings/Trip";

export class mockPlace {
  public readonly ID: number;
  public readonly label: string;
  public readonly url: string;
  public readonly description: string;
  public readonly place: Place;

  constructor() {
    this.ID = 9999;
    this.label = "LabelString";
    this.url = "PlaceURL";
    this.description = "some words";
    this.place = new Place({
      id: this.ID,
      label: this.label,
      url: this.url,
      description: this.description,
    });
  }
}

export class mockTrip {
  public readonly ID: number;
  public readonly userID: number;
  public readonly name: string;
  public readonly cities: City[];
  public readonly days: Day[];
  public readonly description: string;
  public readonly timeCreated: Date;
  public readonly lastUpdated: Date;
  public readonly trip: Trip;

  constructor() {
    this.ID = 99999;
    this.userID = 55555;
    this.name = "The magical journey";
    this.cities = [City.SanJoseCAUS];
    this.days = [];
    this.description = "¯\\_(ツ)_/¯";
    this.timeCreated = new Date();
    this.lastUpdated = new Date();
    this.trip = new Trip({
      id: this.ID,
      user_id: this.userID,
      name: this.name,
      cities: this.cities,
      days: this.days,
      description: this.description,
      time_created: this.timeCreated,
      last_updated: this.lastUpdated,
    });
  }
}
