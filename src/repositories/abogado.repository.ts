import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Abogado, AbogadoRelations, Cliente, Consultor, PuenteAbogadoConsultor} from '../models';
import {ClienteRepository} from './cliente.repository';
import {PuenteAbogadoConsultorRepository} from './puente-abogado-consultor.repository';
import {ConsultorRepository} from './consultor.repository';

export class AbogadoRepository extends DefaultCrudRepository<
  Abogado,
  typeof Abogado.prototype.id,
  AbogadoRelations
> {

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Abogado.prototype.id>;

  public readonly consultors: HasManyThroughRepositoryFactory<Consultor, typeof Consultor.prototype.id,
          PuenteAbogadoConsultor,
          typeof Abogado.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('PuenteAbogadoConsultorRepository') protected puenteAbogadoConsultorRepositoryGetter: Getter<PuenteAbogadoConsultorRepository>, @repository.getter('ConsultorRepository') protected consultorRepositoryGetter: Getter<ConsultorRepository>,
  ) {
    super(Abogado, dataSource);
    this.consultors = this.createHasManyThroughRepositoryFactoryFor('consultors', consultorRepositoryGetter, puenteAbogadoConsultorRepositoryGetter,);
    this.registerInclusionResolver('consultors', this.consultors.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
