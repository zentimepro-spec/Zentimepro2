import styles from "./studio.module.css";

export function Arrow({ down = false }: { down?: boolean }) {
  return (
    <span
      className={down ? styles.arrowDown : styles.arrow}
      aria-hidden="true"
    />
  );
}
