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
const QR = ({ text }) => (
  <div oncreate={(el) => createQR(el, text)} />
);

export default QR;