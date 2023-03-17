import styles from "./LoadingSpinner.module.scss";
import Image from "next/image";

export default function LoadingSpinner() {
  return <Image alt="loading" src="/barstool-logo.png" className={styles.loadingSpinner} width="150" height="150" />;
}
