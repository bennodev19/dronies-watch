import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useTheme } from '../../../../theme/useTheme';
import { ui } from '../../../../../core';
import { INNER_PADDING } from '../static';
import LogoText from '../../../other/LogoText';
import { IconButton } from '../../../primitive';
import Icon from '../../../icons';
import Divider from '../../../other/Divider';

const Footer: React.FC = () => {
  const theme = useTheme();

  const navigate = useNavigate();
  const goToHome = () => navigate('/');

  return (
    <Container>
      <InnerContainer maxWidth={ui.MAX_WIDTH}>
        <TopContainer>
          <LogoText onClick={goToHome} color={theme.colors.layout.rHc} />
          <SocialContainer>
            <IconButton
              to="https://discord.com/invite/8naUgEcYEx"
              target="_blank"
              icon={DiscordIcon}
              color={theme.colors.layout.rHc}
            />
            <IconButton
              to="https://twitter.com/DroniesNFT"
              target="_blank"
              icon={TwitterIcon}
              color={theme.colors.layout.rHc}
            />
          </SocialContainer>
        </TopContainer>
        <StyledDivider />
        <BottomContainer>
          <TextWithLink>
            Inspired by{' '}
            <a
              href="https://twitter.com/DroniesNFT"
              target="_blank"
              rel="noreferrer"
            >
              @DroniesNFT
            </a>
          </TextWithLink>
          <TextWithLink>
            Created By{' '}
            <a
              href="https://twitter.com/DevBenno"
              target="_blank"
              rel="noreferrer"
            >
              @BennoDev
            </a>
          </TextWithLink>
        </BottomContainer>
      </InnerContainer>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  position: relative;

  display: flex;

  width: 100%;
  padding: 60px 0 40px 0;

  background-color: ${({ theme }) => theme.colors.layout.lc};
  border-top: 2px solid ${({ theme }) => theme.colors.layout.p};
`;

const InnerContainer = styled.div<{ maxWidth: number }>`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth}px;

  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${ui.MAX_WIDTH}px) {
    padding: 0 ${INNER_PADDING}px;
  }
`;

const TopContainer = styled.div`
  display: flex;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SocialContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TwitterIcon = styled(Icon.Twitter)`
  margin-left: 20px;
  cursor: pointer;
`;

const DiscordIcon = styled(Icon.Discord)`
  cursor: pointer;
`;

const StyledDivider = styled(Divider)`
  padding: 48px 0 32px 0;
`;

const BottomContainer = styled.div`
  display: flex;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TextWithLink = styled.p`
  text-align: left;
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.colors.layout.p};
  font-size: 1rem;

  a:link,
  a:visited {
    color: ${({ theme }) => theme.colors.layout.hc};
  }
`;
