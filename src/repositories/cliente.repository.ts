import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Abogado} from '../models';
import {AbogadoRepository} from './abogado.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly abogado: BelongsToAccessor<Abogado, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AbogadoRepository') protected abogadoRepositoryGetter: Getter<AbogadoRepository>,
  ) {
    super(Cliente, dataSource);
    this.abogado = this.createBelongsToAccessorFor('abogado', abogadoRepositoryGetter,);
    this.registerInclusionResolver('abogado', this.abogado.inclusionResolver);
  }
}
