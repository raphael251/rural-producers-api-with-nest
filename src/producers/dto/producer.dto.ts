export class ProducerDto {
  id: string;
  name: string;
  document: {
    type: string;
    cpf?: string;
    cnpj?: string;
  };
  farmName: string;
  city: string;
  stateInitials: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  cropsPlanted: Array<string>;
}
