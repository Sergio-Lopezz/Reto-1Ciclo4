import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Lawyer} from './lawyer.model';
import {CaseLawer} from './case-lawer.model';

@model()
export class Client extends Entity {
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
  age: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'number',
    required: true,
  })
  case_state: number;

  @property({
    type: 'string',
    required: false,
  })
  password: string;

  @belongsTo(() => Lawyer)
  lawyerId: string;

  @hasMany(() => CaseLawer)
  caseLawers: CaseLawer[];

  constructor(data?: Partial<Client>) {
    super(data);
  }
}

export interface ClientRelations {
  // describe navigational properties here
}

export type ClientWithRelations = Client & ClientRelations;
