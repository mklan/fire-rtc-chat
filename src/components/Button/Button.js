import { h, app } from 'hyperapp';
import './styles.css';

const Button = ({className, ...rest}, children) => (
  <button {...rest} className={`button${rest.primary ? ' is-link' : ''} custom-button ${className ? className : ''}`} >{children}</button>
);

export default Button;
