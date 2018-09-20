import firebase from 'firebase/app';
import 'firebase/database';
import Peer from 'simple-peer';

export function createFireRTC({ initiator, peerConfig = {}, debug, id, onError = () => {}, onConnect = () => {}, onData = () => {}, onSignal = () => {}}) {
    let ownSignal;
    const p = new Peer({ ...peerConfig, initiator, trickle: false });

    p.on('error', function (err) { console.error('error', err) });

    p.on('signal', function (signal) {
        if (ownSignal) return;
        debug && console.log('SIGNAL', signal);
        ownSignal = signal;
        onSignal(signal);
    });

    p.on('connect', function () {
        debug && console.log('CONNECTED');
        firebase.database().ref(`sdp/${id}`).remove();
        onConnect(p);
    });
    
    p.on('data', function (data) {
        debug && console.log('data: ' + data);
        onData(data);
    });

    if(!initiator) listen();

    function listen() {
        const relevantType = initiator ? 'answer' : 'offer';
        const sdpRef = firebase.database().ref(`sdp/${id}`);
        sdpRef.on('value', (s) => {
            if(s.val() && s.val()[relevantType]) p.signal(s.val()[relevantType]);
        });
    }

    function join() {
        if(initiator) listen();
        console.log('set signal', ownSignal);
        firebase.database().ref(`sdp/${id}/${ownSignal.type}`).set(ownSignal);
    }

    function send(data) {
        try{
          p.send(data);
        } catch ( e) {
          onError(e);
        }
    }
    
    return {
        join,
        send
    };
}