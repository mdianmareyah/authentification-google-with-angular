import * as functions from "firebase-functions";
import * as sendgrid from "sendgrid";

// const sendgrid = require("sendgrid");
const client =  sendgrid("SG.JrC4hVAiQ3WtqLm_7vqMyg.h0yYZSv55WNIoW_nBvx45juzBWj2vKLgReh7");

function parseBody(body: any) : any {
  const helper = sendgrid.mail;
  let formEmail = new helper.Email(body.from);
  let toEmail = new helper.Email(body.to);
  let subject = body.subject;

  let content = new helper.Content("text/html", body.content);

  let mail = new helper.Mail(formEmail,subject, toEmail, content);

  return mail.toJSON();
}

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {

  return Promise.resolve().then(
    () => {
      if(request.method !== "POST") {
        const error = new Error("only post are accepted !");
        throw error;
      }

      const req = client.emptyRequest({
        method: "POST",
        path: "/v3/mail/send",
        body: parseBody(request.body)
      });

      return client.API(req);
    }
  ).then((res) => {
      if(res.body) {
        response.send(res.body);
      }
      else {
        response.end();
      }
  }).catch((err) => {
    console.error(err);
    return Promise.reject(err);
  })
 });
