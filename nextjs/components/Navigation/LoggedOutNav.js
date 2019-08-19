import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import { Input, Button, Popover, Menu, Icon, Dropdown } from 'antd'
import { Wrapper, ListItem, Anchor, StatefulLink } from './shared'
import Search from '../Search'

class LoggedOutNav extends React.Component {
  state = {
    mobileSearchShown: false,
  }

  static propTypes = {
    isMenuActive: PropTypes.bool.isRequired,
    handleBurgerMenu: PropTypes.func.isRequired,
    showBurger: PropTypes.bool.isRequired,
  }

  render() {
    const { handleBurgerMenu, showBurger } = this.props
    return (
      <Wrapper>
        <List>
          {showBurger && (
            <ListItem
              css={`
                display: none;
                @media screen and (max-width: 768px) {
                  display: block;
                  margin: 0 16px 0 0;
                }
              `}
            >
              <Popover
                placement="bottomLeft"
                content={
                  <Menu onClick={this.handleClick} style={{ width: 256 }} mode="inline">
                    <Menu.Item key="1">Home</Menu.Item>
                    <Menu.Item key="2">Tags</Menu.Item>
                    <Menu.Item key="3">Blog</Menu.Item>
                  </Menu>
                }
                trigger="click"
              >
                <Icon
                  type="menu"
                  css={`
                    font-size: 1.2rem;
                    margin: 0;
                  `}
                />
              </Popover>
            </ListItem>
          )}

          <div
            css={`
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              @media screen and (max-width: 768px) {
                width: ${this.state.mobileSearchShown ? '100%' : 'auto'};
              }
            `}
          >
            <div
              css={`
                display: flex;
                width: ${this.state.mobileSearchShown ? '100%' : 'auto'};
              `}
            >
              <StyledSearch shown={this.state.mobileSearchShown} />
              <List type="regularPages">
                {regularPages.map(l => {
                  return (
                    <ListItem key={l.name}>
                      <StatefulLink href={l.href}>
                        <Anchor onClick={handleBurgerMenu}>{l.name}</Anchor>
                      </StatefulLink>
                    </ListItem>
                  )
                })}
              </List>
            </div>

            <div
              css={`
                display: flex;
                align-items: center;
              `}
            >
              <ListItem
                css={`
                  margin-bottom: -4px;
                  display: none;
                  @media screen and (max-width: 768px) {
                    display: inline-block;
                  }
                `}
                onClick={() =>
                  this.setState(prevState => ({ ...prevState, mobileSearchShown: !prevState.mobileSearchShown }))
                }
              >
                {!this.state.mobileSearchShown ? (
                  <Icon
                    type="search"
                    css={`
                      font-size: 1.2rem;
                    `}
                  />
                ) : (
                  <Icon
                    type="close"
                    css={`
                      font-size: 1.2rem;
                    `}
                  />
                )}
              </ListItem>
              {!this.state.mobileSearchShown && (
                <React.Fragment>
                  <ListItem
                    css={`
                      display: inline-block;
                    `}
                  >
                    <LoginButton href="/sign_in">Sign In</LoginButton>
                  </ListItem>

                  <ListItem
                    css={`
                      display: inline-block;
                    `}
                  >
                    <RegisterButton href="/sign_up">Register</RegisterButton>
                  </ListItem>
                </React.Fragment>
              )}
            </div>
          </div>
        </List>
      </Wrapper>
    )
  }
}

const regularPages = [
  {
    name: 'Questions',
    href: '/',
  },
  {
    name: 'Jobs',
    href: '/jobs',
  },
  {
    name: 'Tags',
    href: '/taglist',
  },
  {
    name: 'Blog',
    href: '/medium/blog',
  },
]

const List = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  ${props =>
    props.type === 'regularPages' &&
    css`
      width: auto;
      @media screen and (max-width: 768px) {
        display: none;
      }
    `}
`

const StyledInput = styled(Input)`
  width: 364px;
  @media screen and (max-width: 364px) {
    width: 100%;
  }
`

const StyledSearch = styled(Search)`
  @media screen and (max-width: 768px) {
    display: none;
    ${props =>
      props.shown &&
      css`
        display: block;
      `}
  }
`

const LoginButton = ({ children, href }) => {
  const size = useWindowSize()
  return (
    <React.Fragment>
      {size.width < 768 ? (
        <Link href={href}>
          <Button>
            <Anchor>{children}</Anchor>
          </Button>
        </Link>
      ) : (
        <Link href={href}>
          <Anchor>{children}</Anchor>
        </Link>
      )}
    </React.Fragment>
  )
}

const RegisterButton = ({ children, href }) => {
  const size = useWindowSize()
  return (
    <React.Fragment>
      {size.width < 768 ? (
        <Link href={href}>
          <Button type="primary">
            <Anchor>{children}</Anchor>
          </Button>
        </Link>
      ) : (
        <Link href={href}>
          <Button>
            <Anchor>{children}</Anchor>
          </Button>
        </Link>
      )}
    </React.Fragment>
  )
}

function useWindowSize() {
  const isClient = typeof window === 'object'

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    function handleResize() {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}

export default LoggedOutNav
