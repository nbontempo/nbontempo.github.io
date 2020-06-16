// @flow strict
import React from "react";

import { useSiteMetadata } from "../../../hooks";
import { getContactHref } from "../../../utils";
import styles from "./Author.module.scss";

const Author = () => {
  const { author } = useSiteMetadata();

  return (
    <div className={styles["author"]}>
      <p className={styles["author__bio"]}>
        {author.bio}
        <a
          className={styles["author__bio-twitter"]}
          href={getContactHref("instagram", author.contacts.instagram)}
          rel="noopener noreferrer"
          target="_blank"
        >
          <strong>{author.name}</strong> on Instagram
        </a>
      </p>
    </div>
  );
};

export default Author;
