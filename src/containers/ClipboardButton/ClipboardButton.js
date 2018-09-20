import { h, app } from 'hyperapp';
import ClipboardJS from 'clipboard';

import './styles.css';

function init(buttonId) {
  new ClipboardJS(`#${buttonId}`);
}

const ClipboardButton = ({ id='clipboard', value='https://github.com/mklan', className, label='Copy' }) => {
  const buttonId = `${id}-button`;
  return (
    <span oncreate={() => init(buttonId)}>
      <input className='hidden-input' id={id} value={value} />
      <button className={className} id={buttonId} data-clipboard-target={`#${id}`}>{label}</button>
    </span>
  );
};

export default ClipboardButton;