import React, {useEffect, useState} from 'react';
import logo from '../../resources/img/logo.png'
import menu from '../../resources/img/menu.png'

import "./../../resources/styles/style.scss";
import './style.scss';

let Nav = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [menuClass, setMenuClass] = useState('menu-container');
    const MenuItems = [
        {
            url: '#',
            title: 'politics',
            cName: 'nav-item'
        },
        {
            url: '#',
            title: 'business',
            cName: 'nav-item'
        },
        {
            url: '#',
            title: 'tech',
            cName: 'nav-item'
        },
        {
            url: '#',
            title: 'science',
            cName: 'nav-item'
        },
        {
            url: '#',
            title: 'sports',
            cName: 'nav-item'
        },
        {
            url: '#',
            title: 'login',
            cName: 'nav-item login'
        }
    ]

    let toggleMenu = ()=>{
        if (showMenu) {
            setShowMenu(false)
            setMenuClass('menu-container')
        }else{
            setShowMenu(true)
            setMenuClass('menu-container expand')
        }
    }
    return (
        <nav className="navbar">
            <div className="container-fluid">
                <button className="navbar-toggler" onClick={toggleMenu}>
                    <img alt="" src={menu} />
                </button>
                <a className="navbar-brand" href="#">
                    <img alt="" src={logo} />
                </a>
                <div className={menuClass}>
                    <ul>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                {item.title}
                                </a>
                            </li>
                        )
                    })}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav