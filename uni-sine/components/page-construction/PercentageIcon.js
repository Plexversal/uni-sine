import styles from '../../styles/Percent.module.css'

export default function PercentIcon({percent, text}) {

    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const offset = ((100 - percent) / 100) * circumference;

    return <div className={styles.circleContainer}>
    <svg
      viewBox={`0 0 ${2 * radius + radius * (3.8 / 18)} ${
        2 * radius + radius * (3.8 / 18)
      }`}
      className={styles.circularChart}
    >
      <path
        className={styles.circleBg}
        d={`
      M${radius + (radius * (3.8 / 18)) / 2} ${
          radius + (radius * (3.8 / 18)) / 2 - radius
        }
      a ${radius} ${radius} 0 0 1 0 ${2 * radius}
      a ${radius} ${radius} 0 0 1 0 ${-2 * radius}
  `}
      />
      <path
        className={styles.circle}
        d={`
      M${radius + (radius * (3.8 / 18)) / 2} ${
          radius + (radius * (3.8 / 18)) / 2 - radius
        }
      a ${radius} ${radius} 0 0 1 0 ${2 * radius}
      a ${radius} ${radius} 0 0 1 0 ${-2 * radius}
  `}
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: offset,
          stroke:
            percent > 50
              ? "#73c3c6"
              : percent > 25
              ? "orange"
              : "red",
        }}
      />
      <text
        x={radius + (radius * (3.8 / 18)) / 2}
        y={radius + (radius * (3.8 / 18)) / 2 - 5}
        style={{ fontSize: `${0.5 * (radius / 26)}em` }}
        className={styles.percentage}
        transform={`rotate(180, ${
          radius + (radius * (3.8 / 18)) / 2
        }, ${radius + (radius * (3.8 / 18)) / 2})`}
      >
        {percent}%
      </text>
      <text
        x={radius + (radius * (3.8 / 18)) / 2}
        y={radius + (radius * (3.8 / 18)) / 2 + 5}
        style={{ fontSize: `${0.3 * (radius / 30)}em` }}
        className={styles.percentage}
        transform={`rotate(180, ${
          radius + (radius * (3.8 / 18)) / 2
        }, ${radius + (radius * (3.8 / 18)) / 2})`}
      >
        {text}
      </text>
    </svg>
  </div>
}