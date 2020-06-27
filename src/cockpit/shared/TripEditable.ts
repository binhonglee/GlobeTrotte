export default class TripEditable {
  public static getAllTypes(): string[] {
    return ['name', 'description'];
  }

  public type: string;
  public label: string;
  public value: string;

  constructor(type: string, value: string) {
    this.type = type;
    this.label = this.getLabel();
    this.value = value;
  }

  private getLabel(): string {
    switch (this.type) {
      case 'name': {
        return 'Name';
      }
      case 'description': {
        return 'Description';
      }
      default: {
        return 'unknown_type';
      }
    }
  }
}
