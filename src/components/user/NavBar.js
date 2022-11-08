import React, { useState } from 'react';
import IntlMessages from '../../helpers/IntlMessages';
import PropTypes from 'prop-types';
import registerUserAction from '../../redux/users/RegisterUserRedux';
import { useDispatch, useSelector } from 'react-redux';
import loginAction from '../../redux/auth/authUserRedux';

import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { localeOptions } from '../../constants/defaultValues';
import { setDirection } from '../../helpers/Utils';
import { changeLocale } from '../../redux/actions';
import FacebookLogin from 'react-facebook-login';

import Classes from './style.module.css';
function NavBar(props) {
  const dispatch = useDispatch();

  const [lang, setLang] = useState(
    (localStorage.getItem('currentLanguage') &&
      localStorage.getItem('currentLanguage').toUpperCase()) ||
      'EN',
  );

  function handleChangeLocale(locale, direction) {
    changeLocale(locale);
    setDirection(direction);
    setLang(locale.toUpperCase());
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  const responseFacebook = (response) => {
    console.log('response ', response);
    if (response.status !== 'unknown') {
      dispatch(
        registerUserAction.RegisterUserRequest({
          username: `${response.name}`,
          useremail: `${response.email}`,
          password: '1234',
          adresse: 'Ariana',
        }),
      );

      dispatch(
        loginAction.authUserRequest({
          useremail: `${response.email}`,
          password: '1234',
        }),
      );
    }
  };
  return (
    <>
      <Navbar className={Classes.TopNav} expand='md'>
        <div className={'container'}>
          <NavbarBrand style={{ maxWidth: '402px' }}>
            <img
              src={require('../../assets/images/plant.jpg')}
              style={{ width: '25%', borderRadius: '70%' }}
            />
          </NavbarBrand>
          <div className={Classes.Logotitle}>PlantEye</div>
          <Collapse navbar>
            <Nav className='mr-auto' navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle
                  nav
                  caret
                  style={{
                    color: '#000',
                    marginLeft: '50px',
                    fontSize: '16px',
                  }}>
                  {lang}
                </DropdownToggle>
                <DropdownMenu className='mt-3' left>
                  {localeOptions.map((l) => {
                    return (
                      <DropdownItem
                        onClick={() => handleChangeLocale(l.id, l.direction)}
                        key={l.id}>
                        {l.name}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <Button
              style={{
                backgroundColor: '#223620',
                marginLeft: '50px',
                fontSize: '16px',
                fontWeight: '600',
                maxWidth: '12Opx',
                color: '#fff',
                borderRadius: '9px',
                borderColor: '#223620',
              }}
              className={`btn-shadow btn-multiple-state ${
                props.loading ? 'show-spinner' : ''
              }`}
              size='md'
              onClick={props.onClickRegister}>
              <span className='spinner d-inline-block'>
                <span className='bounce1' />
                <span className='bounce2' />
                <span className='bounce3' />
              </span>

              <span className='label'>
                {' '}
                <IntlMessages id={'user.register-button'} />
              </span>
            </Button>

            <Button
              style={{
                backgroundColor: '#00B978',
                marginLeft: '20px',
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                borderRadius: '9px',
                borderColor: '#00B978',
                minWidth: '140px',
                transition: 'all 250ms'
              }}
              className={`btn-shadow btn-multiple-state  ${
                props.loading ? 'show-spinner' : ''
              }`}
              size='md'
              onClick={props.onClickLogin}>
              <span className='spinner d-inline-block'>
                <span className='bounce1' />
                <span className='bounce2' />
                <span className='bounce3' />
              </span>

              <span className='label'>
                {' '}
                <IntlMessages id={'user.login-button'} />
              </span>
            </Button>
          </Collapse>
        </div>
      </Navbar>
    </>
  );
}

NavBar.propTypes = {
  loading: PropTypes.bool,
  onClickLogin: PropTypes.func.isRequired,
  onClickRegister: PropTypes.func.isRequired,
  left: PropTypes.string,
};
NavBar.defaultProps = {
  loading: null,
  onClickLogin: () => {},
  onClickRegister: () => {},
  left: '',
};
export default NavBar;
