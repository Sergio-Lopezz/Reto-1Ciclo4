import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Consultant, ConsultantRelations, Lawyer} from '../models';
import {LawyerRepository} from './lawyer.repository';

export class ConsultantRepository extends DefaultCrudRepository<
  Consultant,
  typeof Consultant.prototype.id,
  ConsultantRelations
> {

  public readonly lawyers: HasManyRepositoryFactory<Lawyer, typeof Consultant.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('LawyerRepository') protected lawyerRepositoryGetter: Getter<LawyerRepository>,
  ) {
    super(Consultant, dataSource);
    this.lawyers = this.createHasManyRepositoryFactoryFor('lawyers', lawyerRepositoryGetter,);
    this.registerInclusionResolver('lawyers', this.lawyers.inclusionResolver);
  }
}
