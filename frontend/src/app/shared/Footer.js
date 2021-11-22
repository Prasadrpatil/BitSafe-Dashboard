import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { Trans } from 'react-i18next';
class Footer extends Component {
  render() {
    return (
      <footer className='footer'>
        <div className='container-fluid'>
          <div className='d-sm-flex justify-content-center justify-content-sm-between py-2 w-100'>
            <span className='text-muted text-center text-sm-left d-block d-sm-inline-block'>
              Copyright ©{' '}
              <a href='' target='_blank' rel='noopener noreferrer'>
                BitSafe.com{' '}
              </a>
              2021
            </span>
            <h4 className='float-none float-sm-right d-block  mt-sm-0 text-center text-success'>
              <Link>
                <i className='mdi mdi-facebook-box m-1'></i>
              </Link>
              <Link>
                <i className='mdi mdi-twitter-box m-1'></i>
              </Link>
              <Link>
                <i className='mdi mdi-linkedin-box m-1'></i>
              </Link>
              <Link>
                <i className='mdi mdi-instagram m-1'></i>
              </Link>
            </h4>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
