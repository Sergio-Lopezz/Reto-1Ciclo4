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
  Lawyer,
  CaseLawer,
} from '../models';
import {LawyerRepository} from '../repositories';

export class LawyerCaseLawerController {
  constructor(
    @repository(LawyerRepository) protected lawyerRepository: LawyerRepository,
  ) { }

  @get('/lawyers/{id}/case-lawers', {
    responses: {
      '200': {
        description: 'Array of Lawyer has many CaseLawer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CaseLawer)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CaseLawer>,
  ): Promise<CaseLawer[]> {
    return this.lawyerRepository.caseLawers(id).find(filter);
  }

  @post('/lawyers/{id}/case-lawers', {
    responses: {
      '200': {
        description: 'Lawyer model instance',
        content: {'application/json': {schema: getModelSchemaRef(CaseLawer)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Lawyer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CaseLawer, {
            title: 'NewCaseLawerInLawyer',
            exclude: ['id'],
            optional: ['lawyerId']
          }),
        },
      },
    }) caseLawer: Omit<CaseLawer, 'id'>,
  ): Promise<CaseLawer> {
    return this.lawyerRepository.caseLawers(id).create(caseLawer);
  }

  @patch('/lawyers/{id}/case-lawers', {
    responses: {
      '200': {
        description: 'Lawyer.CaseLawer PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CaseLawer, {partial: true}),
        },
      },
    })
    caseLawer: Partial<CaseLawer>,
    @param.query.object('where', getWhereSchemaFor(CaseLawer)) where?: Where<CaseLawer>,
  ): Promise<Count> {
    return this.lawyerRepository.caseLawers(id).patch(caseLawer, where);
  }

  @del('/lawyers/{id}/case-lawers', {
    responses: {
      '200': {
        description: 'Lawyer.CaseLawer DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CaseLawer)) where?: Where<CaseLawer>,
  ): Promise<Count> {
    return this.lawyerRepository.caseLawers(id).delete(where);
  }
}
