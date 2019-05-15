const functions = require('firebase-functions');
const fetch = require('isomorphic-fetch');
const md5 = require('blueimp-md5');

const MailchimpConfig = functions.config().mailchimp

exports.registerForNewsletter = functions.https.onCall(async (data, context) => {
  let email = data.email
  let { key: mailchimpAPIKey, list_id: mailchimpListId } = MailchimpConfig
  let mailchimpInstance = mailchimpAPIKey.split('-')[1]
  let url = 'https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + mailchimpListId + '/members/' + md5(email)
  let response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Buffer.from('any:' + mailchimpAPIKey ).toString('base64'),
    },
    body: JSON.stringify({
      'email_address': email,
      'status_if_new': 'subscribed',
    })
  })

  if (response.status < 300) {
    return {
      status: 'success'
    }
  }
  else {
    return {
      status: 'failure',
      code: response.status,
      error: response.status < 500 && await response.json(),
    }
  }
});