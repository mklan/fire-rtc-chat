import { h, app } from 'hyperapp';
import './styles.css';

const Button = (props, children) => (
  <button className={`custom-button button${props.primary ? ' is-link' : ''}`} {...props}>{children}</button>
);

export default Button;