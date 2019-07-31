import React from 'react'
import styled from 'styled-components'
import Logo from '../Logo'
import PropTypes from 'prop-types'
import LoggedInNav from './LoggedInNav'
import LoggedOutNav from './LoggedOutNav'

const Navigation = ({ isMenuActive, handleBurgerMenuClick, showLogo, showBurger, isResponsive, isLoggedIn }) => {
  const navJSX = isLoggedIn ? (
    <LoggedInNav
      isMenuActive={isMenuActive}
      handleBurgerMenu={handleBurgerMenuClick}
      isResponsive={isResponsive}
      showBurger={showBurger}
    />
  ) : (
    <LoggedOutNav
      isMenuActive={isMenuActive}
      handleBurgerMenu={handleBurgerMenuClick}
      isResponsive={isResponsive}
      showBurger={showBurger}
    />
  )
  return (
    <Wrapper>
      <Container>
        {showLogo && <StyledLogo type="short" />}
        {navJSX}
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  width: 100%;
  margin-bottom: 36px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 0.7rem 0;
`
const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1300px;
  width: 100%;
  padding: 0 2rem;
  margin: 0 auto;
  z-index: 1;
`
const StyledLogo = styled(Logo)`
  margin-right: 1rem;
`

Navigation.propTypes = {
  isMenuActive: PropTypes.bool.isRequired,
  handleBurgerMenuClick: PropTypes.func.isRequired,
  showLogo: PropTypes.bool.isRequired,
  showBurger: PropTypes.bool.isRequired,
  isResponsive: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}

export default Navigation
