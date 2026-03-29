export class CreateGrouptripDto {
  title: string;
  destination: string;
  startDate: string | Date;
  endDate: string | Date;
  maxCapacity: number;
  program: any[];
  pricePerPerson: number | string;
}
