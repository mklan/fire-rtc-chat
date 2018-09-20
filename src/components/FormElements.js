import { h, app } from 'hyperapp';

export const Input = ({ value, name, onchange, type, placeholder }) => <input placeholder={placeholder} class="input" type={type} name={name} value={value} onchange={e => onchange({[name]: e.target.value})} />;
export const Checkbox = ({ value, name, onchange }) => <input type="checkbox" name={name} value={value} onchange={e => onchange({[name]: !value })} />;

export const Field = ({ className, label, type='test', ...rest }) =>
  <div className={`field ${className ? className : ''}`}>
    <label className="label">{label}</label>
    <div className="control">
      {
        type === 'checkbox' ?
          <Checkbox {...rest} /> :
          <Input type={type} className="input" {...rest} />
      }
    </div>
  </div>;