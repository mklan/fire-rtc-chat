import { h } from 'hyperapp';

import MicroModal from 'micromodal';

import Button from '../../components/Button/Button';
import './styles.css';

const init = (config, initialOpen, id) => {
  console.log('sodh', config, initialOpen, id);
  MicroModal.init(config);
  if(initialOpen) {
    console.log('open');
    MicroModal.show(id);
  }
};

const Modal = ({ id='modal-1', disableOk, initialOpen, title, config={}, okLabel='Ok', closeLabel='Close', showOk, showCancel=true, onOk=() => {}, onCancel=() => {}  }, children) =>
  <div className="modal micromodal-slide" oncreate={() => init(config, initialOpen, id)} id={id} aria-hidden="true">
    <div className="modal__overlay" tabindex="-1">
      <div className="modal__container" role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} >
        <header className="modal__header">
          <h2 className="modal__title" id={`${id}-title`}>
            { title }
          </h2>
        </header>
        <main className="modal__content" id={`${id}-content`}>
          { children }
        </main>
        <footer className="modal__footer">
          <div className="pull-right">
          { showOk && <Button disabled={disableOk} onclick={() => onOk()} primary data-micromodal-close aria-label="Close this dialog window">{okLabel}</Button> }
          { showCancel && <Button onclick={() => onCancel()} data-micromodal-close aria-label="Close this dialog window">{closeLabel}</Button> }
          </div>
        </footer>
      </div>
    </div>
  </div>;

export default Modal;
