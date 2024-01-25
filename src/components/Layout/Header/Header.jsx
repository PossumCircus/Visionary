import React from 'react';
import { Link } from 'react-router-dom';
// import { AiFillHome } from 'react-icons/ai';
// import { MdDashboardCustomize } from 'react-icons/md';
// import { IoImages } from 'react-icons/io5';
// import { FaSearch } from 'react-icons/fa';
import styles from './Header.module.scss';
import logo from './visionarySiteLogo.svg'

function Header() {

  return (
    <>
      <div className={styles.visionary_game_bar}>
        <div className={styles.visionary_game_bar_logo}><img src={logo} width={'30px'}/>로고</div>
        <div className={styles.visionary_game_bar_title}>타이틀</div>
        <div className={styles.visionary_game_bar_profile}>프로필</div>
      </div>
    </>
  );
}

export default Nav;