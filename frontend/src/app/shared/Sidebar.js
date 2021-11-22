import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Collapse, Dropdown } from 'react-bootstrap'
import { Trans } from 'react-i18next'

class Sidebar extends Component {
  state = { userInfo: {} }

  userInfo = JSON.parse(localStorage.getItem('userInfo'))

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false })
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true })
    } else {
      Object.keys(this.state).forEach((i) => {
        this.setState({ [i]: false })
      })
      this.setState({ [menuState]: true })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged()
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active')
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false })
    })

    const dropdownPaths = [
      { path: '/apps', state: 'appsMenuOpen' },
      { path: '/buy', state: 'basicUiMenuOpen' },
      { path: '/sell', state: 'formElementsMenuOpen' },
      { path: '/orders', state: 'tablesMenuOpen' },
      { path: '/charts', state: 'chartsMenuOpen' },
      { path: '/error-pages', state: 'errorPagesMenuOpen' },
    ]

    dropdownPaths.forEach((obj) => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true })
      }
    })
  }

  render() {
    return (
      <nav className='sidebar sidebar-offcanvas' id='sidebar'>
        <div className='sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top'>
          <Link className='sidebar-brand brand-logo' to='/dashboard'>
            <img src={require('../../assets/images/logo.svg')} alt='logo' />
          </Link>
          <a className='sidebar-brand brand-logo-mini' href='index.html'>
            <img
              src={require('../../assets/images/logo-mini.svg')}
              alt='logo'
            />
          </a>
        </div>
        <ul className='nav'>
          <li className='nav-item profile'>
            <div className='profile-desc'>
              <div className='profile-pic'>
                <div className='count-indicator'>
                  <img
                    className='img-xs rounded-circle '
                    src={require('../../assets/images/faces/users.jpg')}
                    alt='profile'
                  />
                  <span className='count bg-success'></span>
                </div>
                <div className='profile-name'>
                  <h5 className='mb-0 font-weight-normal'>
                    {this.userInfo && <Trans>{this.userInfo.name}</Trans>}
                  </h5>
                  <span>
                    {this.userInfo && this.userInfo.isAdmin ? (
                      <Trans>Bitsafe Admin</Trans>
                    ) : (
                      <Trans>Bitsafe User</Trans>
                    )}
                  </span>
                </div>
              </div>
              <Dropdown alignRight>
                <Dropdown.Toggle as='a' className='cursor-pointer no-caret'>
                  <i className='mdi mdi-dots-vertical'></i>
                </Dropdown.Toggle>
              </Dropdown>
            </div>
          </li>
          <li className='nav-item nav-category'>
            <span className='nav-link'>
              <Trans>Navigation</Trans>
            </span>
          </li>
          <li
            className={
              this.isPathActive('/dashboard')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <Link className='nav-link' to='/dashboard'>
              <span className='menu-icon'>
                <i className='mdi mdi-speedometer'></i>
              </span>
              <span className='menu-title'>
                <Trans>Dashboard</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive('/buy')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <div
              className={
                this.state.basicUiMenuOpen
                  ? 'nav-link menu-expanded'
                  : 'nav-link'
              }
              onClick={() => this.toggleMenuState('basicUiMenuOpen')}
              data-toggle='collapse'
            >
              <span className='menu-icon'>
                <i className='mdi mdi-laptop'></i>
              </span>
              <span className='menu-title'>
                <Trans>Buy Crypto</Trans>
              </span>
              <i className='menu-arrow'></i>
            </div>
            <Collapse in={this.state.basicUiMenuOpen}>
              <div>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'>
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/buy/crypto')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to='/buy/crypto'
                    >
                      <Trans>Buy Crypto</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive('/sell')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <div
              className={
                this.state.formElementsMenuOpen
                  ? 'nav-link menu-expanded'
                  : 'nav-link'
              }
              onClick={() => this.toggleMenuState('formElementsMenuOpen')}
              data-toggle='collapse'
            >
              <span className='menu-icon'>
                <i className='mdi mdi-playlist-play'></i>
              </span>
              <span className='menu-title'>
                <Trans>Sell Crypto</Trans>
              </span>
              <i className='menu-arrow'></i>
            </div>
            <Collapse in={this.state.formElementsMenuOpen}>
              <div>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'>
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/sell/crypto')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to='/sell/crypto'
                    >
                      <Trans>Sell Crypto</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>

          <li
            className={
              this.isPathActive('/orders')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <div
              className={
                this.state.tablesMenuOpen
                  ? 'nav-link menu-expanded'
                  : 'nav-link'
              }
              onClick={() => this.toggleMenuState('tablesMenuOpen')}
              data-toggle='collapse'
            >
              <span className='menu-icon'>
                <i className='mdi mdi-table-large'></i>
              </span>
              <span className='menu-title'>
                <Trans>Orders</Trans>
              </span>
              <i className='menu-arrow'></i>
            </div>
            <Collapse in={this.state.tablesMenuOpen}>
              <div>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'>
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/orders/crypto')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to='/orders/crypto'
                    >
                      <Trans>Crypto Orders</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          {/* 
          <li
            className={
              this.isPathActive('/tables')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <div
              className={
                this.state.tablesMenuOpen
                  ? 'nav-link menu-expanded'
                  : 'nav-link'
              }
              onClick={() => this.toggleMenuState('tablesMenuOpen')}
              data-toggle='collapse'
            >
              <span className='menu-icon'>
                <i className='mdi mdi-table-large'></i>
              </span>
              <span className='menu-title'>
                <Trans>Tables</Trans>
              </span>
              <i className='menu-arrow'></i>
            </div>
            <Collapse in={this.state.tablesMenuOpen}>
              <div>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'>
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/tables/basic-table')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to='/tables/basic-table'
                    >
                      <Trans>Basic Table</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li> */}

          <li
            className={
              this.isPathActive('/charts')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <div
              className={
                this.state.chartsMenuOpen
                  ? 'nav-link menu-expanded'
                  : 'nav-link'
              }
              onClick={() => this.toggleMenuState('chartsMenuOpen')}
              data-toggle='collapse'
            >
              <span className='menu-icon'>
                <i className='mdi mdi-chart-bar'></i>
              </span>
              <span className='menu-title'>
                <Trans>Charts</Trans>
              </span>
              <i className='menu-arrow'></i>
            </div>
            <Collapse in={this.state.chartsMenuOpen}>
              <div>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'>
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/charts/chart-js')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to='/charts/chart-js'
                    >
                      <Trans>Chart Js</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>

          <li className='nav-item nav-category'>
            <span className='nav-link'>
              <Trans>Admin Panel</Trans>
            </span>
          </li>
          <li
            className={
              this.isPathActive('/error-pages')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <div
              className={
                this.state.errorPagesMenuOpen
                  ? 'nav-link menu-expanded'
                  : 'nav-link'
              }
              onClick={() => this.toggleMenuState('errorPagesMenuOpen')}
              data-toggle='collapse'
            >
              <span className='menu-icon'>
                <i className='mdi mdi-lock'></i>
              </span>
              <span className='menu-title'>
                <Trans>Error Pages</Trans>
              </span>
              <i className='menu-arrow'></i>
            </div>
            <Collapse in={this.state.errorPagesMenuOpen}>
              <div>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'>
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/error-pages/error-404')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to='/error-pages/error-404'
                    >
                      404
                    </Link>
                  </li>
                  <li className='nav-item'>
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/error-pages/error-500')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to='/error-pages/error-500'
                    >
                      500
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className='nav-item menu-items'>
            <a
              className='nav-link'
              href='http://bootstrapdash.com/demo/corona-react-free/documentation/documentation.html'
              rel='noopener noreferrer'
              target='_blank'
            >
              <span className='menu-icon'>
                <i className='mdi mdi-file-document-box'></i>
              </span>
              <span className='menu-title'>
                <Trans>Documentation</Trans>
              </span>
            </a>
          </li>
        </ul>
      </nav>
    )
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path)
  }

  componentDidMount() {
    this.onRouteChanged()
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body')
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open')
        }
      })
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open')
        }
      })
    })
  }
}

export default withRouter(Sidebar)
