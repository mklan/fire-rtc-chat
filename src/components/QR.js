import { h, app } from 'hyperapp';

import QRCode from "qrcodejs2";

function createQR(el, text) {
  new QRCode(el, {
    text,
    width: 256,
    height: 256,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  });
}
const QR = ({ className, text }) => (
  <div className={className} oncreate={(el) => createQR(el, text)} />
);

export default QR;
