import { h, app } from 'hyperapp';
import './styles.css';

const Error = ({ error, onClose = () => {} }) => (
  <div onclick={onClose} className="bottom-right notification is-danger">
    <button className="delete"></button>
    { error }
  </div>
);

export default Error;
