import React from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import RecentActivities from '../RecentActivities'
import Card from '../Card'
import CustomIcon from '../../assets/icons/index'

const Profile = ({
  avatar,
  reputation,
  answers,
  questions,
  biography,
  role_in_company,
  company,
  company_headquarters,
  full_name,
  username,
  location,
  looking_for_job,
  website_url,
  twitter_username,
  github_username,
  changeTab,
  activeTab,
}) => {
  return (
    <Wrapper>
      <LeftSide>
        <AvatarWrapper>
          <Avatar src={avatar} alt={username} />
        </AvatarWrapper>
        <UserFullName>{full_name}</UserFullName>
        <Username>@{username}</Username>
        <UserBio>
          {role_in_company} {company && '@'} {company}
          {company_headquarters && ','} {company_headquarters}
        </UserBio>
        <Button default>Edit profile</Button>
        <Break />
        <div>
          <UserSection>
            <Row
              css={`
                align-items: center;
              `}
            >
              <UserSectionTitle>REPUTATION</UserSectionTitle>
            </Row>
            <ReputationCounter>{reputation}</ReputationCounter>
          </UserSection>

          <UserSection>
            <UserSectionTitle>INFO</UserSectionTitle>
            <Row>
              <LoweredOpacityIcon name="location" fill="#4d4d4d" height="19px" />
              <GreyText>{location}</GreyText>
            </Row>
            {looking_for_job && (
              <Row>
                <LoweredOpacityIcon name="job" fill="#1890ff" height="19px" />
                <BlueText>Looking for a job</BlueText>
              </Row>
            )}
            <Row>
              <LoweredOpacityIcon name="email" fill="#1890ff" height="19px" />
              <BlueText>Sign In to view email</BlueText>
            </Row>
          </UserSection>
        </div>

        <UserSection>
          <UserSectionTitle>Links</UserSectionTitle>
          <Links>
            {website_url && (
              <Link href={website_url} target="_blank">
                <LoweredOpacityIcon name="website" height="22px" />
              </Link>
            )}
            {twitter_username && (
              <Link href={`https://twitter.com/${twitter_username}`} target="_blank">
                <LoweredOpacityIcon name="twitter" height="22px" />
              </Link>
            )}
            {github_username && (
              <Link href={`https://github.com/${github_username}`} target="_blank">
                <LoweredOpacityIcon name="github" height="22px" />
              </Link>
            )}
          </Links>
        </UserSection>
      </LeftSide>
      <RightSide>
        <Card>
          <ContentSwitchButton id="answers" onClick={changeTab} active={activeTab === 'answers' ? true : false}>
            Answers({answers.length})
          </ContentSwitchButton>
          <ContentSwitchButton id="questions" onClick={changeTab} active={activeTab === 'questions' ? true : false}>
            Questions({questions.length})
          </ContentSwitchButton>
        </Card>
        <Card>
          {activeTab === 'answers' ? (
            <RecentActivities type="Answers" typeCounts={answers.length} data={answers} />
          ) : (
            <RecentActivities type="Questions" typeCounts={questions.length} data={questions} />
          )}
        </Card>
      </RightSide>
    </Wrapper>
  )
}

Profile.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  reputation: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  full_name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  company_headquarters: PropTypes.string.isRequired,
  role_in_company: PropTypes.string.isRequired,
  biography: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
  answers: PropTypes.array.isRequired,
}

const Wrapper = styled.div`
  display: flex;
  @media screen and (max-width: 740px) {
    flex-direction: column;
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2px;
`

const LeftSide = styled.div`
  width: 246px;
  margin-right: 32px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 740px) {
    margin: 0 auto;
  }
`

const AvatarWrapper = styled.div`
  width: 246px;
  height: 246px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 10px;
`

const Avatar = styled.img`
  width: 100%;
`
const ContentSwitchButton = styled.span`
  font-weight: bold;
  color: ${props => (props.active ? props.theme.antBlue : props.theme.darkerDarkGrey)};
  text-transform: uppercase;
  margin-right: 20px;
  &:hover {
    cursor: pointer;
  }
`

const Break = styled.div`
  width: 100%;
  height: 1.5px;
  background: ${props => props.theme.antGrey};
  opacity: 0.35;
  margin: 10px 0;
`

const UserSectionTitle = styled.p`
  font-size 0.85rem;
  color: ${props => props.theme.darkerDarkGrey};
  text-transform: uppercase;
  font-weight: bold;
  opacity: .64;
  margin-bottom: 5px;
  margin-right:5px;
`

const ReputationIcon = styled.img`
  width: 22px;
  height: 22px;
  margin-bottom: 3px;
  margin-right: 5px;
`

const ReputationCounter = styled.p`
  color: ${props => props.theme.nextBlack};
  font-weight: bold;
  font-size: 1.1rem;
  line-height: 1;
`
const Links = styled.div`
  display: flex;
  margin: -5px;
`

const Link = styled.a`
  margin: 5px;
`

const UserSection = styled.div`
  margin-bottom: 15px;
`

const GreyText = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.darkerDarkGrey};
`
const BlueText = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.antBlue};
`

const LoweredOpacityIcon = styled(CustomIcon)`
  margin-right: 8px;
  opacity: 0.64;
`

const RightSide = styled.div`
  width: 100%;
`

const Username = styled.p`
  font-size: 16px;
  color: ${props => props.theme.darkerDarkGrey};
  opacity: 0.64;
  margin-bottom: 15px;
`

const UserFullName = styled.span`
  font-size: 25px;
  line-height: 25px;
  font-weight: bold;
`
const UserBio = styled.span`
  font-size: 16px;
  color: ${props => props.theme.darkerDarkGrey};
  line-height: 22px;
  margin-bottom: 15px;
`
export default Profile
