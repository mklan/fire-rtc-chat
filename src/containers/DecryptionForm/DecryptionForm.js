import { h, app } from 'hyperapp';
import { decrypt } from '../../services/encryption';
import SingleInputForm from "../../components/SingleInputForm/SingleInputForm";


const actions = {
  handleDecryption: ({ encryption, onDecrypt}) => ({ decryptPassword }, actions) => {
    onDecrypt && onDecrypt(decrypt(encryption.replace(/ /g, '+'), decryptPassword));
  }
};

const Component = ({ encryption, onDecrypt }) => (state, actions) =>  (
  <SingleInputForm buttonLabel='Decrypt' placeholder="Passphrase" name="decryptPassword" onclick={() => actions.handleDecryption({encryption, onDecrypt})} type="password" value={state.decryptPassword} onchange={actions.setState}  />
);

export default {
  actions,
  Component
}
h
