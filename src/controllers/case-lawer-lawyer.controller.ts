import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CaseLawer,
  Lawyer,
} from '../models';
import {CaseLawerRepository} from '../repositories';

export class CaseLawerLawyerController {
  constructor(
    @repository(CaseLawerRepository)
    public caseLawerRepository: CaseLawerRepository,
  ) { }

  @get('/case-lawers/{id}/lawyer', {
    responses: {
      '200': {
        description: 'Lawyer belonging to CaseLawer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Lawyer)},
          },
        },
      },
    },
  })
  async getLawyer(
    @param.path.string('id') id: typeof CaseLawer.prototype.id,
  ): Promise<Lawyer> {
    return this.caseLawerRepository.lawyer(id);
  }
}
