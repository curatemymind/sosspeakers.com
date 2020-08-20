import { parse } from 'querystring'
//const fetch = require("node-fetch").default;

const headerConst = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

exports.handler = async function (event, context) {
  'use strict';
  

  if(event.httpMethod === 'GET')
  {
    return {
      statusCode: 200,
      headerConst,
      body: "Hello, World"
    };  
  }
  
  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  let body = {}
  try {
    body = JSON.parse(event.body)
  } catch (e) {
    body = parse(event.body)
  }
  
  var payload = {
    "source_id": body.nonce,
    "verification_token": body.token,
    "autocomplete": true,
    "location_id": "L5FQA844P2R0B",
    "amount_money": { // amount_money = $1.00
      "amount": 100,
      "currency": "USD"
    },
    "idempotency_key": uuidv4()
  }
  var url = "https://connect.squareupsandbox.com/v2/payments"

  /*$.ajax({
    type: "POST",
    url: url,
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer EAAAEHP-0Axm8_QxxBMzkbbreJjPOKudthjzFanrSOwCJjN29GkD7bnX-7X1wEao'
    },
    data: JSON.stringify(),
    success: good(),
  });
*/
  fetch(url, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer EAAAEHP-0Axm8_QxxBMzkbbreJjPOKudthjzFanrSOwCJjN29GkD7bnX-7X1wEao'
    },
    body: JSON.stringify(payload),
  }).then(json => console.log(json))
  ;
  
 ;
  
  
    
  return {statusCode: 200,
      headerConst,
      body: "great"}
    
  
  
  
  
  
}

//authorization header BEARER oauth token 

//post to that url there with payload.to_json

// 