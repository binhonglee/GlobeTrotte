import City from "@/wings/City";
import Day from "@/wings/Day";
import Place from "@/wings/Place";
import TripBasic from "@/wings/TripBasic";
import TripObj from "@/wings/TripObj";
import UserBasic from "@/wings/UserBasic";
import User from "@/wings/User";

export class mockUserBasic {
  public readonly ID: number;
  public readonly name: string;
  public readonly email: string;
  public readonly bio: string;
  public readonly userBasic: UserBasic;

  constructor() {
    this.ID = 73426598;
    this.name = "New guy";
    this.email = "somenewguy@email.com";
    this.bio = "Hi, I'm a new guy lurking on here";
    this.userBasic = new UserBasic({
      id: this.ID,
      name: this.name,
      email: this.email,
      bio: this.bio,
      confirmed: true,
    });
  }
}

export class mockUser {
  public readonly ID: number;
  public readonly name: string;
  public readonly email: string;
  public readonly bio: string;
  public readonly timeCreated: Date;
  public readonly trips: number[];
  public readonly user: User;

  constructor() {
    this.ID = 73426598;
    this.name = "New guy";
    this.email = "somenewguy@email.com";
    this.bio = "Hi, I'm a new guy lurking on here";
    this.timeCreated = new Date();
    this.trips = [];
    this.user = new User({
      id: this.ID,
      name: this.name,
      email: this.email,
      bio: this.bio,
      time_created: this.timeCreated,
      trips: this.trips,
    });
  }
}

export class mockPlace {
  public readonly ID: number;
  public readonly label: string;
  public readonly URL: string;
  public readonly description: string;
  public readonly place: Place;

  constructor() {
    this.ID = 9999;
    this.label = "LabelString";
    this.URL = "PlaceURL";
    this.description = "some words";
    this.place = new Place({
      id: this.ID,
      label: this.label,
      url: this.URL,
      description: this.description,
    });
  }
}

export class mockDay {
  public readonly ID: number;
  public readonly tripID: number;
  public readonly dayOf: number;
  public readonly places: Place[];
  public readonly day: Day;

  constructor() {
    this.ID = 23489723;
    this.tripID = 845357023;
    this.dayOf = 1;
    this.places = [new mockPlace().place];
    this.day = new Day({
      id: this.ID,
      trip_id: this.tripID,
      day_of: this.dayOf,
      places: this.places,
    });
  }
}

export class mockTripBasic {
  public readonly ID: number;
  public readonly name: string;
  public readonly cities: City[];
  public readonly days: Day[];
  public readonly description: string;
  public readonly tripBasic: TripBasic;

  constructor() {
    this.ID = 99999;
    this.name = "The magical journey";
    this.cities = [City.SanJoseCAUS];
    this.days = [new mockDay().day];
    this.description = "¯\\_(ツ)_/¯";
    this.tripBasic = new TripBasic({
      id: this.ID,
      name: this.name,
      cities: this.cities,
      days: this.days,
      description: this.description,
    });
  }
}

export class mockTripObj {
  public readonly ID: number;
  public readonly timeCreated: Date;
  public readonly lastUpdated: Date;
  public readonly trip: TripObj;

  constructor() {
    this.ID = 99999;
    this.timeCreated = new Date();
    this.lastUpdated = new Date();
    this.trip = new TripObj({
      id: this.ID,
      user: new mockUserBasic().userBasic,
      details: new mockTripBasic().tripBasic,
      time_created: this.timeCreated,
      last_updated: this.lastUpdated,
    });
  }
}
