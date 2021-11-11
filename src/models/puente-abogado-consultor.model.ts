import {Entity, model, property} from '@loopback/repository';

@model()
export class PuenteAbogadoConsultor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  abogadoId?: string;

  @property({
    type: 'string',
  })
  consultorId?: string;

  constructor(data?: Partial<PuenteAbogadoConsultor>) {
    super(data);
  }
}

export interface PuenteAbogadoConsultorRelations {
  // describe navigational properties here
}

export type PuenteAbogadoConsultorWithRelations = PuenteAbogadoConsultor & PuenteAbogadoConsultorRelations;
