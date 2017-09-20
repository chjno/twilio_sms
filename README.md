# SMS with Twilio + Node.js

Code for the Node server was taken from Twilio's [Receive and Reply to SMS and MMS Message in Node.js](https://www.twilio.com/docs/guides/how-to-receive-and-reply-in-node-js) and [How to Respond to Incoming Phone Calls in Node.js](https://www.twilio.com/docs/guides/how-to-respond-to-incoming-phone-calls-in-node-js) guides. For more, the [Twilio Docs](https://www.twilio.com/docs/) have tons of examples for a variety of programming languages.

### Requirements
* [node + npm](https://www.npmjs.com/get-npm)
  * twilio
  * body-parser
  * [express](https://expressjs.com/)
  * [socket.io](https://socket.io/)
* [ngrok](https://ngrok.com/) (move it to `/usr/local/bin/` and you can run it from any directory)
* [Twilio account](https://www.twilio.com/) ([Twilio pricing](https://www.twilio.com/pricing))

### Setup

1. Run ngrok with a port number (3000 in this case) and copy the forwarding url.  
`ngrok http 3000`

2. Create a TwiML App that uses the forwarding url from step 1.

3. Buy and configure a phone number to use your TwiML App.

4. Run your node server on the same port as specified in step 1.

5. GMG!


***If running your server locally, don't forget to update your TwiML App settings every time you restart ngrok.**
