# fire-rtc-chat

serverless webRTC chat using firebase's realtime database as signaling broker
(early stage / proof of concept)

[Demo](http://mklan.github.io/fire-rtc-chat)

## Usage

1. Create a new firebase project and enter the corresponding api key, database url
 and project id together with your nickname and an encryption passphrase.
2. Enter a chat partner's nickname and create a chat.
3. Share somehow the generated chat-link together with your passphrase with your chat partner.
4. Do not close the tab and wait until your partner enters the passphrase.
5. Chat via an encrypted p2p communication channel.

## Functionality

- The app writes your sdp configuration into the database under a random uid.
- Your firebase configuration and your uid gets encrypted using your passhrase and appended to the generated link.
- Your partner decrypts the phrase and also sends his sdp to the database.
- Both of you get notified of the others sdp config via a firebase event.
- After both parties have the other's sdp config, the webRTC connection can be established.

> __Warning!__ After the decryption the other party is able to retrieve your firebase configuration. So keep only chatting to people you trust or non-techies.

## Develop
```
npm install
npm start
```

http://localhost:1234


## Deploy

```bash
npm run build
```

## TODO

- [ ] nicer CSS / layout
- [x] hit enter to send message on desktop
- [ ] instructions on main screen
- [ ] form validation
- [ ] fire-rtc as a single lib/project on npm
- [ ] video chat
- [ ] file transfer
