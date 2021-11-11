import {Entity, model, property} from '@loopback/repository';

@model()
export class Consultor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  especialidad: string;


  constructor(data?: Partial<Consultor>) {
    super(data);
  }
}

export interface ConsultorRelations {
  // describe navigational properties here
}

export type ConsultorWithRelations = Consultor & ConsultorRelations;
