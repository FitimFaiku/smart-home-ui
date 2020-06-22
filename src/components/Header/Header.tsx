import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HEADER_MENU } from './header-menu';

export default class Header extends React.Component<{}, {}> {
    renderHelperCreateMenu() {
        // Remove menu item from Navigation Bar if user is not allowed to see.
        var visibleNavigationItems = HEADER_MENU.items;
        return visibleNavigationItems.map(item => {
            return (
                <li className={'Header__menu-item'} key={item.id}>
                    <NavLink
                        to={item.to}
                        id={item.id}
                        exact={true}
                        className={'Header__link'}
                        activeClassName={'Header__link Header__link--selected'}
                    >
                        {item.name}
                    </NavLink>
                </li>
            );
        });
    }

  public render() {
    return (
        <header className="Header">
          <nav className="Header__menu">
            <ul className="Header__menu-list">{this.renderHelperCreateMenu()}</ul>
          </nav>
          <div className="Header__decoration" />
        </header>
    );
  }
}
