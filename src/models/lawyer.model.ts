import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Consultant} from './consultant.model';
import {Client} from './client.model';
import {CaseLawer} from './case-lawer.model';

@model()
export class Lawyer extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
    required: true,
  })
  cellphone: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  type_document: string;

  @property({
    type: 'string',
    required: true,
  })
  num_document: string;

  @property({
    type: 'string',
    required: true,
  })
  experience: string;

  @property({
    type: 'string',
    required: true,
  })
  specialty: string;

  @property({
    type: 'string',
    required: true,
  })
  case_list: string;

  @property({
    type: 'string',
    required: true,
  })
  case_max: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @belongsTo(() => Consultant)
  consultantId: string;

  @hasMany(() => Client)
  clients: Client[];

  @hasMany(() => CaseLawer)
  caseLawers: CaseLawer[];

  constructor(data?: Partial<Lawyer>) {
    super(data);
  }
}

export interface LawyerRelations {
  // describe navigational properties here
}

export type LawyerWithRelations = Lawyer & LawyerRelations;
