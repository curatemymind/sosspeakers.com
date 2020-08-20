import React from 'react'
import { SquarePaymentForm } from 'react-square-payment-form'
import 'react-square-payment-form/lib/default.css'
import {
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
  CreditCardSubmitButton
} from 'react-square-payment-form'


class PaymentPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      errorMessages: [],
    }
  }

  cardNonceResponseReceived = (errors, nonce, cardData, buyerVerificationToken) => {
    /*if (errors) {
      this.setState({ errorMessages: errors.map(error => error.message) })
      return
    }*/

    this.setState({ errorMessages: [] })
    
    
    //.post('/.netlify/functions/payments', {data: { nonce: nonce, token: buyerVerificationToken }}) // implement this
    
    let data = {nonce: nonce, token: buyerVerificationToken}
  
    fetch('https://sosspeakers.com/.netlify/functions/payment2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)//((JSON.stringify(data)).toString()).replace(/"/g,'\"')
    })
  
  }

  createVerificationDetails() {
    return {
      amount: '100.00',
      currencyCode: "USD",
      intent: "CHARGE",
      billingContact: {
        familyName: "Smith",
        givenName: "John",
        email: "jsmith@example.com",
        country: "GB",
        city: "London",
        addressLines: ["1235 Emperor's Gate"],
        postalCode: "SW7 4JA",
        phone: "020 7946 0532"
      }
    }
  }

  render() {
    return (
      <div className="centerDiv">
        <h1>Payment Page</h1>

        <SquarePaymentForm
          sandbox={true}
          applicationId="sandbox-sq0idb-4yG4xs2LPxHdpWzNwBvsUw"
          locationId="L5FQA844P2R0B"
          cardNonceResponseReceived={this.cardNonceResponseReceived}
          createVerificationDetails={this.createVerificationDetails}
        >
          <fieldset className="sq-fieldset">
    <CreditCardNumberInput />
    <div className="sq-form-third">
      <CreditCardExpirationDateInput />
    </div>

    <div className="sq-form-third">
      <CreditCardPostalCodeInput />
    </div>

    <div className="sq-form-third">
      <CreditCardCVVInput />
    </div>
  </fieldset>

  <CreditCardSubmitButton>
      Pay $1.00
  </CreditCardSubmitButton>
        </SquarePaymentForm>

        <div className="sq-error-message">
          {this.state.errorMessages.map(errorMessage =>
            <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
          )}
        </div>

      </div>
    )
  }
}
export default PaymentPage