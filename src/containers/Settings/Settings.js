import { h, app } from 'hyperapp';
import { Field } from "../../components/FormElements";

import './styles.css';

const state = {
  settings: {}
};

const actions = {
  loadSettings: () => (state, actions) => {
    if(localStorage.settings) {
      return ({ settings: JSON.parse(localStorage.settings)})
    }
  },
  setSetting: (setting) => (state, actions) => {
    return ({ settings: { ...state.settings, ...setting }})
  },
  handleSaveSettings: (callback) => ({ settings }, actions) => {
    localStorage.settings = JSON.stringify(settings);
    callback && callback(settings);
  }
};

const fields = [
  {
    label: 'api key',
    name: 'apiKey'
  },
  {
    label: 'database URL',
    name: 'databaseURL'
  },
  {
    label: 'project Id',
    name: 'projectId'
  },
  {
    label: 'nickname',
    name: 'nickname',
  },
  {
    label: 'encryption password',
    name: 'password',
    type: 'password'
  },

];

const Component = () => (state, actions) =>  (
  <div class="settings">
    {
      fields.map(field => (
        <Field
          className='settings-field'
          {...field}
          value={state.settings[field.name]}
          onchange={actions.setSetting}
        />
      ))
    }
  </div>
);

export default {
  state,
  actions,
  Component
}
