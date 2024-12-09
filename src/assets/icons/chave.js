import * as React from "react";
const ChaveIcon = (props) => (
  <svg
    width={50}
    height={50}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_103_62)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M38.4088 0.862737C37.02 0.306189 35.5039 0 33.9162 0C27.2425 0 21.8325 5.41009 21.8325 12.0838C21.8325 14.0039 22.2803 15.8195 23.0773 17.4317L5.06178 35.4472C3.64607 36.8629 3.64608 39.1582 5.06178 40.5739C6.47748 41.9896 8.77278 41.9896 10.1885 40.5739L28.0898 22.6726C29.8176 23.6254 31.8036 24.1675 33.9162 24.1675C40.5899 24.1675 46 18.7575 46 12.0838C46 10.496 45.6938 8.97982 45.1372 7.59097C44.9756 7.8231 44.7913 8.04423 44.5842 8.25124L39.7507 13.0848C37.8631 14.9724 34.8027 14.9724 32.9151 13.0848C31.0275 11.1971 31.0275 8.13674 32.9151 6.24914L37.7486 1.41563C37.9556 1.20863 38.1767 1.02433 38.4088 0.862737Z"
        fill="black"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_103_62"
        x={0}
        y={0}
        width={50}
        height={49.6356}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_103_62"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_103_62"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default ChaveIcon;
