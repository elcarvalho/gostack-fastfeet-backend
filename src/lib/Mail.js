import nodemailer from 'nodemailer';
import nodemailerConfig from '../config/nodemailer';

class Mail {
  constructor() {
    const { host, port, auth } = nodemailerConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: false,
      auth: auth.user ? auth : null,
    });
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...nodemailerConfig.default,
      ...message,
    });
  }
}

export default new Mail();
