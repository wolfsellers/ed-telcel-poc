/* eslint-disable import/no-unresolved */
import { h } from '@dropins/tools/preact.js';
import htm from 'htm';

const html = htm.bind(h);

export const ChevronLeftIcon = (props) => html`
<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  stroke-width="1.5"
  ...${props}
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M15.75 19.5 8.25 12l7.5-7.5"
  />
</svg>
`;

export const ChevronRigthIcon = (props) => html`
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" ...${props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
`;

export const PlayIcon = (props) => html`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" ...${props}>
  <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
</svg>
`;
