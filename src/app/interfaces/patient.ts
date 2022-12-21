import { Breed } from './breed';
export interface Patient {
  id : number,
  patientName : string,
  breedId : number;
  birth : string;

  breedName? : string;
  specieName? : string;
}
