// @flow strict
import PropTypes from "prop-types";
import React from "react";

import { useSiteMetadata } from "../../hooks";
import Author from "./Author";
import Contacts from "./Contacts";
import Copyright from "./Copyright";
import Menu from "./Menu";
import styles from "./Sidebar.module.scss";

Sidebar.propTypes = {
  isIndex: PropTypes.bool
};

export default function Sidebar({ isIndex }) {
  const { author, copyright, menu } = useSiteMetadata();

  return (
    <div className={styles["sidebar"]}>
      <div className={styles["sidebar__inner"]}>
        <Author author={author} isIndex={isIndex} />
        <Menu menu={menu} />
        <Contacts contacts={author.contacts} />
        <Copyright copyright={copyright} />
      </div>
    </div>
  );
}
