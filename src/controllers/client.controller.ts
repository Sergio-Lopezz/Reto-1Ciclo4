import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {Client, Credentials} from '../models';
import {ClientRepository} from '../repositories';
import {AutenticationService} from '../services';
import {Keys} from '../config/keys';
import {NotificationService} from '../services';

const fetch = require('node-fetch');

export class ClientController {
  constructor(
    @repository(ClientRepository)
    public clientRepository : ClientRepository,
    @service(AutenticationService)
    public servicioAutenticacion: AutenticationService,
    @service(NotificationService)
    public servicioNotificacion: NotificationService
  ) {}

  @post("/showPerson")
  @response(200, {
      description: 'Identificacion de usuarios'
  })
  async showPerson(
    @requestBody() credentials: Credentials
  ) {
    let p = await this.servicioAutenticacion.IdentificarPersona(credentials.usuario, credentials.clave)
    if (p) {
      let token = this.servicioAutenticacion.GenerarTokenJWT(p);
      return {
        datos: {
          name: p.name,
          email: p.email,
          id: p.id
        },
        tk: token
      }
    } else {
      throw new HttpErrors["401"]("Datos inválidos");
    }
  }

  @post('/clients')
  @response(200, {
    description: 'Client model instance',
    content: {'application/json': {schema: getModelSchemaRef(Client)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Client, {
            title: 'NewClient',
            exclude: ['id'],
          }),
        },
      },
    })
    client: Omit<Client, 'id'>,
  ): Promise<Client> {
    let clave = this.servicioAutenticacion.GenerarClave();
    let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
    client.password = claveCifrada;
    let p = await this.clientRepository.create(client);

    if (p) {
      let contenido = `Bienvenido al sistema de seguimiento de casos del Bufet de Abogados.<br>
        <br><br><img src="https://raw.githubusercontent.com/Sergio-Lopezz/PruebaVersionesGithub/master/WhatsApp%20Image%202021-11-21%20at%206.58.17%20PM.jpeg"><br>
        Sus datos de acceso al sistema son:<br>
        <ul>
          <li>Usuario:${p.email}</li>
          <li>Contraseña:${clave}</li>
        </ul>
        Gracias por confiar en nuestros servicios.
        <br><br><strong> De SoftSolution</strong>`;
        this.servicioNotificacion.SendEmail(p.email, Keys.subject, contenido);
    }
    return p;

    //Notificar al Usuario
    //let destino = client.email;
    //let asunto = "Registro en la plataforma";
    //let contenido = `Hola ${client.name}, su nombre de Usuario es: ${client.email} y su contraseña es: ${client.password}`;
    //fetch(`${Keys.urlNotifications}/correos?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
    //  .then((data: any) => {
    //    console.log(data);
    //  })
      /*
      .expect((data: any) => {
        console.log(data);
      })*/
    //return p;
  }

  @get('/clients/count')
  @response(200, {
    description: 'Client model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Client) where?: Where<Client>,
  ): Promise<Count> {
    return this.clientRepository.count(where);
  }

  @get('/clients')
  @response(200, {
    description: 'Array of Client model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Client, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Client) filter?: Filter<Client>,
  ): Promise<Client[]> {
    return this.clientRepository.find(filter);
  }

  @patch('/clients')
  @response(200, {
    description: 'Client PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Client, {partial: true}),
        },
      },
    })
    client: Client,
    @param.where(Client) where?: Where<Client>,
  ): Promise<Count> {
    return this.clientRepository.updateAll(client, where);
  }

  @get('/clients/{id}')
  @response(200, {
    description: 'Client model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Client, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Client, {exclude: 'where'}) filter?: FilterExcludingWhere<Client>
  ): Promise<Client> {
    return this.clientRepository.findById(id, filter);
  }

  @patch('/clients/{id}')
  @response(204, {
    description: 'Client PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Client, {partial: true}),
        },
      },
    })
    client: Client,
  ): Promise<void> {
    await this.clientRepository.updateById(id, client);
  }

  @put('/clients/{id}')
  @response(204, {
    description: 'Client PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() client: Client,
  ): Promise<void> {
    await this.clientRepository.replaceById(id, client);
  }

  @del('/clients/{id}')
  @response(204, {
    description: 'Client DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clientRepository.deleteById(id);
  }
}
