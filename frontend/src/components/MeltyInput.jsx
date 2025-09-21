import React, { useId } from "react";
import styles from "./MeltyInput.module.css";

/**
 * Props:
 *  - value, onChange, placeholder, type
 *  - width, height (optional) e.g. "320px", "48px"
 *  - radius (optional) e.g. 14
 */
export default function MeltyInput({
  value,
  onChange,
  placeholder = "Type something sweet…",
  type = "text",
  width = "350px",
  height = "52px",
  radius = 14,
}) {
  const uid = useId(); // unique filter id per instance
  const filterId = `melt-${uid.replace(/:/g, "")}`;
  const svgId = `svg-${uid.replace(/:/g, "")}`;

  return (
    <div className={styles.wrapper} style={{ width, height }}>
      {/* Decorative SVG border (behind the input) */}
      <svg
        className={styles.borderSvg}
        viewBox={`0 0 100 100`}
        preserveAspectRatio="none"
        aria-hidden="true"
        id={svgId}
      >
        <defs>
          <filter id={filterId}>
            {/* Chocolatey wobble */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="3"
              seed="2"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="6s"
                values="0.012;0.02;0.012"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Smooth rounded rect path usable for both fill & stroke */}
          <clipPath id={`${svgId}-clip`}>
            <rect x="2" y="2" width="96" height="96" rx={(radius / 52) * 96} />
          </clipPath>
        </defs>

        {/* Gooey chocolate border */}
        <rect
          x="2"
          y="2"
          width="96"
          height="96"
          rx={(radius / 52) * 96}
          fill="none"
          stroke="#e2b89aff"        /* dark chocolate */
          strokeWidth="6"
          filter={`url(#${filterId})`}
        />

        {/* Drips (subtle) */}
        <g filter={`url(#${filterId})`} clipPath={`url(#${svgId}-clip)`}>
          <path
            d="M6,6 C15,14 22,6 30,10 C38,14 45,6 54,10 C62,14 70,6 78,10 C86,14 92,6 96,8"
            fill="none"
            stroke="#7a3a15"
            strokeWidth="2"
            opacity="0.5"
          >
            <animate
              attributeName="d"
              dur="5s"
              repeatCount="indefinite"
              values="
                M6,6 C15,14 22,6 30,10 C38,14 45,6 54,10 C62,14 70,6 78,10 C86,14 92,6 96,8;
                M6,6 C15,12 22,8 30,6  C38,16 45,8 54,6  C62,12 70,8 78,6  C86,16 92,8 96,10;
                M6,6 C15,14 22,6 30,10 C38,14 45,6 54,10 C62,14 70,6 78,10 C86,14 92,6 96,8
              "
            />
          </path>
        </g>
      </svg>

      {/* Actual input on top */}
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ borderRadius: radius }}
      />
    </div>
  );
}
