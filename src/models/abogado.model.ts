import {Entity, model, property, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Consultor} from './consultor.model';
import {PuenteAbogadoConsultor} from './puente-abogado-consultor.model';

@model()
export class Abogado extends Entity {
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
  experiencia: string;

  @property({
    type: 'string',
    required: true,
  })
  especialidad: string;

  @hasMany(() => Cliente)
  clientes: Cliente[];

  @hasMany(() => Consultor, {through: {model: () => PuenteAbogadoConsultor}})
  consultors: Consultor[];

  constructor(data?: Partial<Abogado>) {
    super(data);
  }
}

export interface AbogadoRelations {
  // describe navigational properties here
}

export type AbogadoWithRelations = Abogado & AbogadoRelations;
