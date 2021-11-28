import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  CaseLawer,
  Comments,
} from '../models';
import {CaseLawerRepository} from '../repositories';

export class CaseLawerCommentsController {
  constructor(
    @repository(CaseLawerRepository) protected caseLawerRepository: CaseLawerRepository,
  ) { }

  @get('/case-lawers/{id}/comments', {
    responses: {
      '200': {
        description: 'Array of CaseLawer has many Comments',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comments)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Comments>,
  ): Promise<Comments[]> {
    return this.caseLawerRepository.comments(id).find(filter);
  }

  @post('/case-lawers/{id}/comments', {
    responses: {
      '200': {
        description: 'CaseLawer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comments)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CaseLawer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comments, {
            title: 'NewCommentsInCaseLawer',
            exclude: ['id'],
            optional: ['caseLawerId']
          }),
        },
      },
    }) comments: Omit<Comments, 'id'>,
  ): Promise<Comments> {
    return this.caseLawerRepository.comments(id).create(comments);
  }

  @patch('/case-lawers/{id}/comments', {
    responses: {
      '200': {
        description: 'CaseLawer.Comments PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comments, {partial: true}),
        },
      },
    })
    comments: Partial<Comments>,
    @param.query.object('where', getWhereSchemaFor(Comments)) where?: Where<Comments>,
  ): Promise<Count> {
    return this.caseLawerRepository.comments(id).patch(comments, where);
  }

  @del('/case-lawers/{id}/comments', {
    responses: {
      '200': {
        description: 'CaseLawer.Comments DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Comments)) where?: Where<Comments>,
  ): Promise<Count> {
    return this.caseLawerRepository.comments(id).delete(where);
  }
}
