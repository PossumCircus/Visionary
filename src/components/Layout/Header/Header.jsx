import React from 'react';
import { Link } from 'react-router-dom';
// import { AiFillHome } from 'react-icons/ai';
// import { MdDashboardCustomize } from 'react-icons/md';
// import { IoImages } from 'react-icons/io5';
// import { FaSearch } from 'react-icons/fa';
import styles from './Header.module.scss';
import logo from './SiteLogo.png'

function Header() {

  return (
    <>
      <div className={styles.visionary_game_bar}>
        <div className={styles.visionary_game_bar_logo}><img className={styles.visionary_logo} src={logo}/></div>
        <div className={styles.visionary_game_bar_titles}>
          <a className={styles.visionary_game_bar_title}>(svg)<span className={styles.visionary_game_bar_title_label}>발로란트</span></a>
          <a className={styles.visionary_game_bar_title}>(svg)<span className={styles.visionary_game_bar_title_label}>리그오브레전드</span></a>
          <a className={styles.visionary_game_bar_title}>(svg)<span className={styles.visionary_game_bar_title_label}>에이펙스레전드</span></a>
          <a className={styles.visionary_game_bar_title}>(svg)<span className={styles.visionary_game_bar_title_label}>레인보우식스</span></a>
        </div>
        <div className={styles.visionary_game_bar_profile}>
          <a className={styles.visionary_game_bar_membership}><img/>Get Membership</a>
          <a className={styles.visionary_game_bar_auth}>로그인자리</a>
        </div>
      </div>
    </>
  );
}

export default Header;