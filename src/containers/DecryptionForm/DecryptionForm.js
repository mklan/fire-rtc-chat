import { h, app } from 'hyperapp';
import { decrypt } from '../../services/encryption';
import SingleInputForm from "../../components/SingleInputForm/SingleInputForm";


const actions = {
  handleDecryption: ({ encryption, onDecrypt, onError}) => ({ decryptPassword }, actions) => {
    try{
      onDecrypt && onDecrypt(decrypt(encryption.replace(/ /g, '+'), decryptPassword));
    } catch (e) {
      onError && onError(e);
    }
  }
};

const Component = ({ encryption, onDecrypt, onError }) => (state, actions) =>  (
  <SingleInputForm buttonLabel='Decrypt' placeholder="Passphrase" name="decryptPassword" onclick={() => actions.handleDecryption({encryption, onDecrypt, onError})} type="password" value={state.decryptPassword} onchange={actions.setState}  />
);

export default {
  actions,
  Component
}
h
