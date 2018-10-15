import { h, app } from 'hyperapp';
import './styles.css';

const Error = ({ error, onClose = () => {} }) => (
  <div className="bottom-right notification is-danger">
    <button onclick={onClose} className="delete"></button>
    { error }
  </div>
);

export default Error;
