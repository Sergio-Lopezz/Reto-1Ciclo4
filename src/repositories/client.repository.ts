import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Client, ClientRelations, Lawyer, CaseLawer} from '../models';
import {LawyerRepository} from './lawyer.repository';
import {CaseLawerRepository} from './case-lawer.repository';

export class ClientRepository extends DefaultCrudRepository<
  Client,
  typeof Client.prototype.id,
  ClientRelations
> {

  public readonly lawyer: BelongsToAccessor<Lawyer, typeof Client.prototype.id>;

  public readonly caseLawers: HasManyRepositoryFactory<CaseLawer, typeof Client.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('LawyerRepository') protected lawyerRepositoryGetter: Getter<LawyerRepository>, @repository.getter('CaseLawerRepository') protected caseLawerRepositoryGetter: Getter<CaseLawerRepository>,
  ) {
    super(Client, dataSource);
    this.caseLawers = this.createHasManyRepositoryFactoryFor('caseLawers', caseLawerRepositoryGetter,);
    this.registerInclusionResolver('caseLawers', this.caseLawers.inclusionResolver);
    this.lawyer = this.createBelongsToAccessorFor('lawyer', lawyerRepositoryGetter,);
    this.registerInclusionResolver('lawyer', this.lawyer.inclusionResolver);
  }
}
