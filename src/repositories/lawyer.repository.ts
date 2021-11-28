import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Lawyer, LawyerRelations, Consultant, Client, CaseLawer} from '../models';
import {ConsultantRepository} from './consultant.repository';
import {ClientRepository} from './client.repository';
import {CaseLawerRepository} from './case-lawer.repository';

export class LawyerRepository extends DefaultCrudRepository<
  Lawyer,
  typeof Lawyer.prototype.id,
  LawyerRelations
> {

  public readonly consultant: BelongsToAccessor<Consultant, typeof Lawyer.prototype.id>;

  public readonly clients: HasManyRepositoryFactory<Client, typeof Lawyer.prototype.id>;

  public readonly caseLawers: HasManyRepositoryFactory<CaseLawer, typeof Lawyer.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ConsultantRepository') protected consultantRepositoryGetter: Getter<ConsultantRepository>, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>, @repository.getter('CaseLawerRepository') protected caseLawerRepositoryGetter: Getter<CaseLawerRepository>,
  ) {
    super(Lawyer, dataSource);
    this.caseLawers = this.createHasManyRepositoryFactoryFor('caseLawers', caseLawerRepositoryGetter,);
    this.registerInclusionResolver('caseLawers', this.caseLawers.inclusionResolver);
    this.clients = this.createHasManyRepositoryFactoryFor('clients', clientRepositoryGetter,);
    this.registerInclusionResolver('clients', this.clients.inclusionResolver);
    this.consultant = this.createBelongsToAccessorFor('consultant', consultantRepositoryGetter,);
    this.registerInclusionResolver('consultant', this.consultant.inclusionResolver);
  }
}
