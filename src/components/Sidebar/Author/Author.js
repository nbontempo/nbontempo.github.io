// @flow strict
import { Link, withPrefix } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import styles from "./Author.module.scss";

Author.propTypes = {
  author: PropTypes.object,
  isIndex: PropTypes.bool
};

export default function Author({ author, isIndex }) {
  return (
    <div className={styles["author"]}>
      <Link to="/">
        <span
          className={styles["author__photo"]}
          width="75"
          height="75"
          alt={author.name}
        >
          🐱&zwj;👓
        </span>
      </Link>

      {isIndex === true ? (
        <h1 className={styles["author__title"]}>
          <Link className={styles["author__title-link"]} to="/">
            {author.name}
          </Link>
        </h1>
      ) : (
        <h2 className={styles["author__title"]}>
          <Link className={styles["author__title-link"]} to="/">
            {author.name}
          </Link>
        </h2>
      )}
      <p className={styles["author__subtitle"]}>{author.bio}</p>
    </div>
  );
}
