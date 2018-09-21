import { h, app } from 'hyperapp';
import { Field } from "../../components/FormElement/FormElements";

import './styles.css';

const state = {
  settings: {},
  settingsErrors: {
  },
  settingsFormValid: false,
  settingsInStorage: !!localStorage.settings,
};

const actions = {
  loadSettings: () => (state, actions) => {
    if(localStorage.settings) {
      return ({ settings: JSON.parse(localStorage.settings)})
    }
  },
  setSetting: (setting) => (state, actions) => {

    const  { apiKey, databaseURL, projectId, nickname, password } = state.settings;

    return ({ settings: { ...state.settings, ...setting }, settingsFormValid: apiKey && databaseURL && projectId && nickname && password})
  },
  handleSaveSettings: (callback) => ({ settings }, actions) => {
    localStorage.settings = JSON.stringify(settings);
    callback && callback(settings);
    return ({ settingsInStorage: true });
  },
};

const fields = [
  {
    label: 'firebase api key',
    name: 'apiKey'
  },
  {
    label: 'firebase database URL',
    name: 'databaseURL'
  },
  {
    label: 'firebase project Id',
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
          error={state.settingsErrors[field.name]}
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
