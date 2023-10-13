import React from "react";
import styles from "./OrderDetailSection.module.scss";

type Props = {
  title: String;
  children: any;
  isRight?: boolean;
};

export function CommonHeader({ title, children, isRight }: Props) {
  return (
    <section
      className={`${isRight ? styles.rightcontainer : styles.container}`}
    >
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.liner}></div>
      {children}
    </section>
  );
}
