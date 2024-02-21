import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.scss';

function Nav() {

  return (
    <>
      <div className={styles.visionary_site_nav}>
        <nav>
          <ul className={styles.visionary_site_nav_item_list}>
            <li>
              <div className={styles.visionary_site_nav_item}><Link to={'/visionboard'}>비전보드</Link></div>
            </li>
            <li>
              <div className={styles.visionary_site_nav_item}><Link to={'/'}>홈</Link></div>
            </li>
            <li>
              <div className={styles.visionary_site_nav_item}><Link to={'/'}>2차기능</Link></div>
            </li>
            <li>
              <div className={styles.visionary_site_nav_item}><Link to={'/'}>3차기능</Link></div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Nav;