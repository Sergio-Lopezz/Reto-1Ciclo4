import {Entity, model, property, belongsTo} from '@loopback/repository';
import {CaseLawer} from './case-lawer.model';

@model()
export class Comments extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  case_comment: string;

  @property({
    type: 'string',
    required: true,
  })
  sign: string;

  @belongsTo(() => CaseLawer)
  caseLawerId: string;

  constructor(data?: Partial<Comments>) {
    super(data);
  }
}

export interface CommentsRelations {
  // describe navigational properties here
}

export type CommentsWithRelations = Comments & CommentsRelations;
