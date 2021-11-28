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
  Consultant,
  Lawyer,
} from '../models';
import {ConsultantRepository} from '../repositories';

export class ConsultantLawyerController {
  constructor(
    @repository(ConsultantRepository) protected consultantRepository: ConsultantRepository,
  ) { }

  @get('/consultants/{id}/lawyers', {
    responses: {
      '200': {
        description: 'Array of Consultant has many Lawyer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Lawyer)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Lawyer>,
  ): Promise<Lawyer[]> {
    return this.consultantRepository.lawyers(id).find(filter);
  }

  @post('/consultants/{id}/lawyers', {
    responses: {
      '200': {
        description: 'Consultant model instance',
        content: {'application/json': {schema: getModelSchemaRef(Lawyer)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Consultant.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lawyer, {
            title: 'NewLawyerInConsultant',
            exclude: ['id'],
            optional: ['consultantId']
          }),
        },
      },
    }) lawyer: Omit<Lawyer, 'id'>,
  ): Promise<Lawyer> {
    return this.consultantRepository.lawyers(id).create(lawyer);
  }

  @patch('/consultants/{id}/lawyers', {
    responses: {
      '200': {
        description: 'Consultant.Lawyer PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lawyer, {partial: true}),
        },
      },
    })
    lawyer: Partial<Lawyer>,
    @param.query.object('where', getWhereSchemaFor(Lawyer)) where?: Where<Lawyer>,
  ): Promise<Count> {
    return this.consultantRepository.lawyers(id).patch(lawyer, where);
  }

  @del('/consultants/{id}/lawyers', {
    responses: {
      '200': {
        description: 'Consultant.Lawyer DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Lawyer)) where?: Where<Lawyer>,
  ): Promise<Count> {
    return this.consultantRepository.lawyers(id).delete(where);
  }
}
