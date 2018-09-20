import firebase from "firebase";
import uuidv4 from 'uuid/v4';
import { h, app } from 'hyperapp';

import 'bulma/css/bulma.css';
import './styles.css';

import { encrypt } from './services/encryption';
import { createFireRTC } from './fireRTC';

import QR from './components/QR';
import Modal from "./containers/Modal/Modal";
import Button from "./components/Button/Button";
import SingleInputForm from "./components/SingleInputForm/SingleInputForm";
import ClipboardButton from "./containers/ClipboardButton/ClipboardButton";

//container
import SettingsContainer from './containers/Settings/Settings';
import ChatContainer from './containers/Chat/Chat';
import DecryptionFormContainer from './containers/DecryptionForm/DecryptionForm';

const Settings = SettingsContainer.Component;
const Chat = ChatContainer.Component;
const DecryptionForm = DecryptionFormContainer.Component;

const URLparams = new URLSearchParams(location.search);
let fireRTC;

const state = {
  isInitiator: !URLparams.get('code'),
  partnerNickname: URLparams.get('nick'),
  id: uuidv4(),
  connected: false,
  ...SettingsContainer.state,
  ...ChatContainer.state,
};

const actions = {
  setState: newState => () => newState,
  initializeFireRTC: ({ id, fireBaseConfig}) => async (state, actions) => {
    if(firebase.apps.length) await firebase.app().delete();
    await firebase.initializeApp(fireBaseConfig);

    fireRTC = createFireRTC({
      id,
      initiator: state.isInitiator,
      onError: error => actions.setState({ error }),
      onConnect: () => actions.setState({ connected: true }),
      onSignal: actions.join,
      onData: msg => actions.addMessage({user: state.partnerNickname || 'Bob', msg: msg.toString()}),
    });
  },
  join: () => () => fireRTC.join(),
  createChat: () => async (state, actions) => {
    const { apiKey, databaseURL, projectId, password, nickname } = state.settings;
    const fireRTCconfig = {
      fireBaseConfig: { apiKey, databaseURL, projectId },
      id: state.id,
    };

    await actions.initializeFireRTC(fireRTCconfig);

    const encryption = encrypt({...fireRTCconfig}, password);
    actions.setState({
      link: `${location.href}?code=${encryption}&nick=${nickname}`
    });
  },
  ...SettingsContainer.actions,
  ...DecryptionFormContainer.actions,
  ...ChatContainer.actions,
};

const View = (state, actions) => (
  <div className="view">
    <div className="content">
      { state.connected ? <Chat onSend={fireRTC.send}/> : <MainView /> }
    </div>
  </div>
);

const MainView = () => (state, actions) =>  (
  <div oncreate={actions.loadSettings} className="main-view">
    <Modal config={{ onShow: actions.loadSettings }} id={'settings-modal'} title={'Settings'} onOk={actions.handleSaveSettings} showOk={true} okLabel={'Save'} closeLabel={'Cancel'}>
      <Settings />
    </Modal>
    <div className="pull-top-right">
      <Button  data-micromodal-trigger="settings-modal" >Settings</Button>
    </div>
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            FireRTC-Chat
          </h1>
          <p className="subtitle">
            Serverless WebRTC Chat using Firebase's realtime database as signaling broker
          </p>
        </div>
      </div>
    </section>

    { state.isInitiator ? <div>
      { !state.link ? <SingleInputForm disabled={!state.partnerNickname} buttonLabel='Create Chat' placeholder="Chat with..." name="partnerNickname" onclick={actions.createChat} value={state.partnerNickname} onchange={actions.setState}  /> : <div>
        <a href={state.link}>LINK</a>
        <ClipboardButton className="button" value={state.link} />
        <QR text={state.link}/>
      </div>
      }
    </div> : <div>
      enter passphrase to chat with {state.partnerNickname}
      <DecryptionForm buttonLabel={'Enter chat'} encryption={URLparams.get('code')} onDecrypt={actions.initializeFireRTC}/>
    </div>
      }
  </div>
);

app(state, actions, View, document.getElementById('app'));
