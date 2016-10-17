import nodemailer from 'nodemailer';
import mailgun from 'nodemailer-mailgun-transport';

const config = require('cconfig')();

const auth = {
  auth: {
    api_key: config.MAILGUN_API_KEY,
    domain: config.MAILGUN_DOMAIN
  }
}

const mailer = nodemailer.createTransport(mailgun(auth));

export function send (options, cb) {
  mailer.sendMail({
    from: options.from,
    to: options.to,
    subject: options.subject,
    'h:Reply-To': options.replyTo,
    // html: options.html,
    text: options.text
  }, cb);
};