import { h, app } from 'hyperapp';
import { Field } from "../../components/FormElements";

import './styles.css';

const state = {
  input: '',
  messages: []
};

const actions = {
  send: (onSend) => (state, actions) => {
    if(!state.input) return;
    onSend(state.input);
    actions.addMessage({ user: 'me', msg: state.input });
    actions.clearInput();
  },
  addMessage: message => state => ({ messages: [message, ...state.messages] }),
  clearInput: () => state => ({ input: '' }),
  setInput: e => ({ input: e.target.value }),
};

const Component = ({ onSend = () => {} }) => (state, actions) =>  (
  <div className="chat">
    <div className="messages">
      {
        state.messages.map((message, i) => <div className={`chat-message ${message.user === 'me' ? 'own-chat-message' : ''}`}
                                                key={i}><span className="user">{message.user}:</span> {message.msg}</div>)
      }
    </div>
      <form onsubmit={(e) => { e.preventDefault(); actions.send(onSend)}}>
        <div className="bottomBar">
          <input className="messageInput" value={state.input} onchange={actions.setInput}/>
          <button type="submit">send</button>
        </div>
      </form>
  </div>
);

export default {
  state,
  actions,
  Component
}
