import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from './SiteLogo.png'

function Header() {

  return (
    <>
      <div className={styles.visionary_Header}>
        <div className={styles.visionary_game_bar_logo}><Link to={'/'}><img className={styles.visionary_logo} src={logo}/></Link></div>
        <div className={styles.visionary_game_bar_titles}>
          <a className={styles.visionary_game_bar_title}>(svg)<span className={styles.visionary_game_bar_title_label}>하나</span></a>
          <a className={styles.visionary_game_bar_title}>(svg)<span className={styles.visionary_game_bar_title_label}>둘</span></a>
          <a className={styles.visionary_game_bar_title}>(svg)<span className={styles.visionary_game_bar_title_label}>셋</span></a>
          <a className={styles.visionary_game_bar_title}>(svg)<span className={styles.visionary_game_bar_title_label}>넷</span></a>
        </div>
        <div className={styles.visionary_game_bar_profile}>
          <a className={styles.visionary_game_bar_membership}><img/>Get Membership</a>
          <a className={styles.visionary_game_bar_auth}>로그인</a>
        </div>
      </div>
    </>
  );
}

export default Header;