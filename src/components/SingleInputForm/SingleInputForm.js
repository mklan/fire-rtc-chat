import { h, app } from 'hyperapp';

import { Input } from "../FormElement/FormElements";
import Button from '../Button/Button';

const SingleInputForm = ({ disabled, onclick=() => {}, buttonLabel='Send', name, type, value,onchange=()=>{}, placeholder  }) =>  (
  <form onsubmit={(e) => {
    e.preventDefault();
    onclick();
  }}>
  <div className="row">
      <Input placeholder={placeholder} name={name} type={type} value={value} onchange={onchange} />
      <Button primary disabled={disabled} type="submit">{buttonLabel}</Button>
  </div>
  </form>
);

export default SingleInputForm;
