import { h, app } from 'hyperapp';

import './styles.css';

export const Input = ({ value, name, onchange, type, placeholder , error}) => <input placeholder={placeholder} className={`input${ error ? ' is-danger' : ''}`} type={type} name={name} value={value} oninput={e => onchange({[name]: e.target.value})} />;
export const Checkbox = ({ value, name, onchange }) => <input type="checkbox" name={name} value={value} onchange={e => onchange({[name]: !value })} />;

export const Field = ({ className, label, error, type='test', ...rest }) =>
  <div className={`field ${className ? className : ''}`}>
    <label className="label row"><span>{label}</span> { error && <p className="help is-danger error-msg">{error}</p>}</label>
    <div className="control">
      <Input type={type} className="input" error={error} {...rest} />
    </div>
  </div>;
