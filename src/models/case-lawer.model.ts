import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Lawyer} from './lawyer.model';
import {Client} from './client.model';
import {Comments} from './comments.model';

@model()
export class CaseLawer extends Entity {
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
  case_description: string;

  @property({
    type: 'number',
    required: true,
  })
  case_state: number;

  @belongsTo(() => Lawyer)
  lawyerId: string;

  @belongsTo(() => Client)
  clientId: string;

  @hasMany(() => Comments)
  comments: Comments[];

  constructor(data?: Partial<CaseLawer>) {
    super(data);
  }
}

export interface CaseLawerRelations {
  // describe navigational properties here
}

export type CaseLawerWithRelations = CaseLawer & CaseLawerRelations;
