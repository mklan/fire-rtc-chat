import { h, app } from 'hyperapp';

import { Input } from "../FormElements";
import Button from '../Button/Button';

const SingleInputForm = ({ disabled, onclick=() => {}, buttonLabel='Send', name, type, value,onchange=()=>{}, placeholder  }) => (state, actions) =>  (
  <div className="columns">
    <div className="column">
      <Input placeholder={placeholder} name={name} type={type} value={value} onchange={onchange} />
    </div>
    <div className="column">
      <Button disabled={disabled} onclick={onclick}>{buttonLabel}</Button>
    </div>
  </div>
);

export default SingleInputForm;
