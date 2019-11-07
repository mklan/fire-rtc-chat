import * as firebase from 'firebase/app';
import 'firebase/database';
import 'regenerator-runtime/runtime';
import uuidv4 from 'uuid/v4';

import { h, app } from 'hyperapp';

import 'bulma/css/bulma.css';
import './styles.css';

import { encrypt } from './services/encryption';
import createFireRTC from 'fire-rtc';

import QR from './components/QR';
import Error from './components/Error/Error';
import Modal from './containers/Modal/Modal';
import Button from './components/Button/Button';
import SingleInputForm from './components/SingleInputForm/SingleInputForm';
import ClipboardButton from './containers/ClipboardButton/ClipboardButton';

//container
import SettingsContainer from './containers/Settings/Settings';
import ChatContainer from './containers/Chat/Chat';
import DecryptionFormContainer from './containers/DecryptionForm/DecryptionForm';
import Loading from './components/Loading/Loading';

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
  initializeFireRTC: ({ id, fireBaseConfig }) => async (state, actions) => {
    actions.setState({ loading: true });

    try {
      if (firebase.apps['fireRTCChat'])
        await firebase.app('fireRTCChat').delete();
      await firebase.initializeApp(fireBaseConfig, 'fireRTCChat');
    } catch (e) {
      actions.setState({
        error: 'Failed to connect to Firebase, please check your settings',
        loading: false,
        link: null,
      });
    }

    fireRTC = createFireRTC({
      id,
      firebase,
      firebaseNameSpace: 'fireRTCChat',
      initiator: state.isInitiator,
      onError: error =>
        actions.setState({
          error:
            'Failed to connect! check your internet connection and try again',
          loading: false,
          link: null,
        }),
      onConnect: () => actions.setState({ connected: true, loading: false }),
      onData: msg =>
        actions.addMessage({
          user: state.partnerNickname || 'Bob',
          msg: msg.toString(),
        }),
    });
  },
  createChat: () => async (state, actions) => {
    const {
      apiKey,
      databaseURL,
      projectId,
      password,
      nickname,
    } = state.settings;
    const fireRTCconfig = {
      fireBaseConfig: { apiKey, databaseURL, projectId },
      id: state.id,
    };

    await actions.initializeFireRTC(fireRTCconfig);

    const encryption = encrypt({ ...fireRTCconfig }, password);
    actions.setState({
      link: `${location.href}?code=${encryption}&nick=${nickname}`,
    });
  },
  ...SettingsContainer.actions,
  ...DecryptionFormContainer.actions,
  ...ChatContainer.actions,
};

const View = (state, actions) => (
  <div className="view">
    <div className="content">
      {state.connected ? (
        <Chat onSend={fireRTC.send} />
      ) : (
        <MainView state={state} />
      )}
    </div>{' '}
  </div>
);

const MainView = () => (state, actions) => (
  <div oncreate={actions.loadSettings} className="main-view">
    <Modal
      initialOpen={state.isInitiator && !state.settingsInStorage}
      config={{ onShow: actions.loadSettings }}
      id={'settings-modal'}
      title={'Settings'}
      disableOk={!state.settingsFormValid}
      onOk={actions.handleSaveSettings}
      showCancel={!!state.settingsInStorage}
      showOk={true}
      okLabel={'Save'}
      closeLabel={'Cancel'}
    >
      <Settings />
    </Modal>
    {state.error && (
      <Error
        error={state.error}
        onClose={() => actions.setState({ error: null })}
      />
    )}
    {state.isInitiator && (
      <div className="pull-top-right margin">
        <Button data-micromodal-trigger="settings-modal">Settings</Button>
      </div>
    )}
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">FireRTC-Chat</h1>
          <p className="subtitle">
            Serverless WebRTC Chat using Firebase's realtime database as
            signaling broker
          </p>
        </div>
      </div>
    </section>

    {state.isInitiator ? (
      <div>
        {!state.link ? (
          <SingleInputForm
            disabled={!state.partnerNickname}
            buttonLabel="Create Chat"
            placeholder="Chat with..."
            name="partnerNickname"
            onclick={actions.createChat}
            value={state.partnerNickname}
            onchange={actions.setState}
          />
        ) : (
          <div class="center-hor">
            {state.loading && <Loading className="margin" />}
            <p>
              share the link together with your passphare with your chat partner
              and wait until he connects
            </p>
            <div className="row center">
              <a href={state.link}>LINK</a>
              <ClipboardButton className="button is-link" value={state.link} />
            </div>
            <QR className="qr" text={state.link} />
          </div>
        )}
      </div>
    ) : (
      <div>
        enter the passphrase to chat with {state.partnerNickname}
        <DecryptionForm
          buttonLabel={'Enter chat'}
          encryption={URLparams.get('code')}
          onDecrypt={actions.initializeFireRTC}
          onError={() => actions.setState({ error: 'Error decrypting' })}
        />
        {state.loading && <Loading />}
      </div>
    )}
  </div>
);

app(state, actions, View, document.getElementById('app'));
