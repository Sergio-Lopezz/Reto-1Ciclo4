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
Abogado,
PuenteAbogadoConsultor,
Consultor,
} from '../models';
import {AbogadoRepository} from '../repositories';

export class AbogadoConsultorController {
  constructor(
    @repository(AbogadoRepository) protected abogadoRepository: AbogadoRepository,
  ) { }

  @get('/abogados/{id}/consultors', {
    responses: {
      '200': {
        description: 'Array of Abogado has many Consultor through PuenteAbogadoConsultor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Consultor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Consultor>,
  ): Promise<Consultor[]> {
    return this.abogadoRepository.consultors(id).find(filter);
  }

  @post('/abogados/{id}/consultors', {
    responses: {
      '200': {
        description: 'create a Consultor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Consultor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Abogado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consultor, {
            title: 'NewConsultorInAbogado',
            exclude: ['id'],
          }),
        },
      },
    }) consultor: Omit<Consultor, 'id'>,
  ): Promise<Consultor> {
    return this.abogadoRepository.consultors(id).create(consultor);
  }

  @patch('/abogados/{id}/consultors', {
    responses: {
      '200': {
        description: 'Abogado.Consultor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consultor, {partial: true}),
        },
      },
    })
    consultor: Partial<Consultor>,
    @param.query.object('where', getWhereSchemaFor(Consultor)) where?: Where<Consultor>,
  ): Promise<Count> {
    return this.abogadoRepository.consultors(id).patch(consultor, where);
  }

  @del('/abogados/{id}/consultors', {
    responses: {
      '200': {
        description: 'Abogado.Consultor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Consultor)) where?: Where<Consultor>,
  ): Promise<Count> {
    return this.abogadoRepository.consultors(id).delete(where);
  }
}
