import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.scss';

function Nav({ children }) {

  return (
    <>
      <div className={styles.visionary_site_nav}>
        <nav>
          <ul className={styles.visionary_site_nav_item_list}>
            <li>
              <div className={styles.visionary_site_nav_item}><a>하나</a></div>
            </li>
            <li>
              <div className={styles.visionary_site_nav_item}><a>둘</a></div>
            </li>
            <li>
              <div className={styles.visionary_site_nav_item}><a>셋</a></div>
            </li>
            <li>
              <div className={styles.visionary_site_nav_item}><a>넷</a></div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Nav;