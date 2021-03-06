# fire-rtc-chat

serverless webRTC chat using firebase's realtime database as signaling broker
(early stage / proof of concept)

![Preview as animated Gif](https://github.com/mklan/fire-rtc-chat/blob/master/preview.gif)

[Demo](http://mklan.github.io/fire-rtc-chat)

## Usage

1. Create or open a firebase project and copy your api key, database url
   and project id into the settings dialog.
2. Define a nickname and a passphrase inside the settings dialog.
3. Enter a chat partner's nickname and create a chat.
4. Share somehow the generated chat-link and your passphrase with your chat partner.
5. Do not close the tab and wait until your partner enters the passphrase.
6. Start chatting via an encrypted p2p communication channel.

## Functionality

- The app writes your sdp configuration into the database under a random uid.
- Your firebase configuration and your uid gets encrypted using your passhrase and appended to the generated link.
- Your partner decrypts the phrase and also sends his sdp to the database.
- Both of you get notified of the others sdp config via a firebase event.
- After both parties have the other's sdp config, the webRTC connection can be established.

> **Warning!** After the decryption, the other party could be potentialy able to retrieve your firebase api key via dev_tools . So keep only chatting to people you trust or non-techies.

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

- [x] nicer CSS / layout
- [x] hit enter to send message on desktop
- [ ] instructions on main screen
- [x] form validation
- [x] loading indicator
- [ ] form helpers on wrong validation
- [x] fire-rtc as a single lib/project on npm
- [ ] video chat
- [ ] file transfer
