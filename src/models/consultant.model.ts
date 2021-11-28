import {Entity, model, property, hasMany} from '@loopback/repository';
import {Lawyer} from './lawyer.model';

@model()
export class Consultant extends Entity {
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
  company_name: string;

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
  password: string;

  @hasMany(() => Lawyer)
  lawyers: Lawyer[];

  constructor(data?: Partial<Consultant>) {
    super(data);
  }
}

export interface ConsultantRelations {
  // describe navigational properties here
}

export type ConsultantWithRelations = Consultant & ConsultantRelations;
