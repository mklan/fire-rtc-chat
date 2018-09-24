import { h, app } from 'hyperapp';

const Loading = ({ className, width="10%", height="10%" }) => (
  <svg className={className} width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
       preserveAspectRatio="xMidYMid">
    <circle cx="50" cy="50" r="39.9646" fill="none" ng-attr-stroke="{{config.c1}}"
            ng-attr-stroke-width="{{config.width}}" stroke="#1d0e0b" stroke-width="2">
      <animate attributeName="r" calcMode="spline" values="0;40" keyTimes="0;1" dur="2.9" keySplines="0 0.2 0.8 1"
               begin="-1.45s" repeatCount="indefinite"></animate>
      <animate attributeName="opacity" calcMode="spline" values="1;0" keyTimes="0;1" dur="2.9" keySplines="0.2 0 0.8 1"
               begin="-1.45s" repeatCount="indefinite"></animate>
    </circle>
    <circle cx="50" cy="50" r="25.4985" fill="none" ng-attr-stroke="{{config.c2}}"
            ng-attr-stroke-width="{{config.width}}" stroke="#101010" stroke-width="2">
      <animate attributeName="r" calcMode="spline" values="0;40" keyTimes="0;1" dur="2.9" keySplines="0 0.2 0.8 1"
               begin="0s" repeatCount="indefinite"></animate>
      <animate attributeName="opacity" calcMode="spline" values="1;0" keyTimes="0;1" dur="2.9" keySplines="0.2 0 0.8 1"
               begin="0s" repeatCount="indefinite"></animate>
    </circle>
  </svg>
);

export default Loading;
