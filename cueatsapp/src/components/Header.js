import React from 'react';
import './Header.css';

// Status bar icons
import TimeIcon from '../assets/Header_icons/Time.png';
import WifiIcon from '../assets/Header_icons/Wifi.png';
import CellularIcon from '../assets/Header_icons/Cellular.png';
import BatteryIcon from '../assets/Header_icons/Battery.png';

function Header() {
  return (
    <div className="status-bar">
      <div className="status-left">
        <img src={TimeIcon} alt="Time" className="status-icon small-icon" />
      </div>
      <div className="status-right">
        <img src={CellularIcon} alt="Cellular" className="status-icon" />
        <img src={WifiIcon} alt="Wifi" className="status-icon" />
        <img src={BatteryIcon} alt="Battery" className="status-icon" />
      </div>
    </div>
  );
}

export default Header;