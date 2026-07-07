export interface Station {
  id: string;
  name: string;
  code: string;
  country: string;
}

export interface Operator {
  id: string;
  name: string;
}

export interface Journey {
  id: string;
  originCode: string;
  destinationCode: string;
  operatorName: string;
  departureTime: string;
  duration: string;
  price: string;
}
