require('dotenv').config();
import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {Keys} from '../config/keys';

const sgMail = require('@sendgrid/mail');

@injectable({scope: BindingScope.TRANSIENT})
export class NotificationService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  SendEmail(destino: string, asunto: string, contenido: string){
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: destino, // Change to your recipient
      from: Keys.email_origin, // Change to your verified sender
      subject: asunto,
      html: contenido,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error:any) => {
        console.error(error)
      })
  }
}
