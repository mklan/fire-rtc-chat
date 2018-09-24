import { h, app } from 'hyperapp';
import SingleInputForm from "../../components/SingleInputForm/SingleInputForm";


import './styles.css';

const state = {
  messages: []
};

const actions = {
  send: (onSend) => (state, actions) => {
    if(!state.input) return;
    onSend(state.input);
    actions.addMessage({ user: 'me', msg: state.input });
    return ({ input: '' });
  },
  addMessage: message => state => ({ messages: [message, ...state.messages] }),
};

const Component = ({ onSend = () => {} }) => (state, actions) =>  (
  <div className="chat">
    <div className="messages">
      {
        state.messages.map((message, i) => <div className={`chat-message ${message.user === 'me' ? 'own-chat-message' : ''}`}
                                                key={i}><span className="user">{message.user}:</span> {message.msg}</div>)
      }
    </div>
    <SingleInputForm placeholder="your message..." name="input" onclick={() => { actions.send(onSend)}} value={state.input} onchange={actions.setState}  />
  </div>
);

export default {
  state,
  actions,
  Component
}
