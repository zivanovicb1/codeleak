import React from 'react'
import App, { Container } from 'next/app'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import SideMenu from '../components/SideMenu'
import Navigation from '../components/Navigation'
import MainContentWrapper from '../components/MainContentWrapper'
import Footer from '../components/Footer'
import trackPageView from '../helpers/configs/trackPageView'
import Router from 'next/router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp, faComment, faEye, faBan } from '@fortawesome/free-solid-svg-icons'
library.add(faAngleUp, faComment, faEye, faBan)

const theme = {
  clBlue: '#3e6fb5',
  antBlue: '#1890ff',
  antGrey: '#d9d9d9',
  darkGrey: '#757575',
  dirtyWhite: '#f1f1f1',
  lightBlack: '#757575',
}

class MyApp extends App {
  state = {
    isMenuActive: false,
    isLoggedIn: true,
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }

  componentDidMount() {
    Router.onRouteChangeComplete = url => {
      trackPageView(url)
    }
  }

  handleBurgerMenuClick = () => this.setState(prevState => ({ isMenuActive: !prevState.isMenuActive }))

  render() {
    const { Component, pageProps } = this.props
    const { isMenuActive, isLoggedIn } = this.state
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <GlobalStyle />
          <MainContentWrapper>
            <Navigation
              isMenuActive={isMenuActive}
              handleBurgerMenuClick={this.handleBurgerMenuClick}
              showLogo={true}
              showBurger={true}
              isResponsive={false}
              isLoggedIn={isLoggedIn}
            />
            <Component {...pageProps} isLoggedIn={isLoggedIn} />
          </MainContentWrapper>
          <Footer />
          <SideMenu isMenuActive={isMenuActive}>
            <Navigation
              isMenuActive={isMenuActive}
              handleBurgerMenuClick={this.handleBurgerMenuClick}
              showLogo={false}
              showBurger={false}
              isResponsive={true}
              isLoggedIn={isLoggedIn}
            />
          </SideMenu>
        </Container>
      </ThemeProvider>
    )
  }
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Karla', sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    position: relative;
    min-height: 100%;
    height: auto;
  }
  // reset
  body {
    margin: 0;
    font-family: 'Karla', sans-serif;
    height: 100%;
    min-height: 100%;
    background: #e6e8ed;

    margin-bottom: -130px;
  }
  a {
    text-decoration: none;
  }
  li {
    list-style: none;
  }
  p {
    margin-bottom: 0;
  }
`

export default MyApp
