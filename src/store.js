import { writable } from 'svelte/store';

export const username = writable('...generating id...');
export const friendUsername = writable('');
export const peer = new window.Peer();
peer.on('open', id => username.set(id));
