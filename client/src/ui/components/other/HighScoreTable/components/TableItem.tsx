import React from 'react';
import styled from 'styled-components';
import BottomDivider from './BottomDivider';
import { HORIZONTAL_PADDING, timeSince } from '../controller';

const TableItem: React.FC<Props> = (props) => {
  const {
    rank,
    name,
    discriminator,
    score,
    playedAt,
    avatarUri,
    showDivider = true,
  } = props;

  return (
    <Container>
      <RankText>{rank}</RankText>
      <UserContainer>
        <InnerUserContainer>
          <UserImage src={avatarUri || 'unknown'} loading="lazy" />
          <NameContainer>
            <UserName>{name}</UserName>
            <UserDiscriminator>
              #{discriminator?.replace('#', '')}
            </UserDiscriminator>
          </NameContainer>
        </InnerUserContainer>
      </UserContainer>
      <ScoreText>{score}</ScoreText>
      <TimeText>{timeSince(playedAt)}</TimeText>
      {showDivider && <BottomDivider />}
    </Container>
  );
};

export default TableItem;

type Props = {
  rank: number;
  name: string;
  discriminator: string;
  score: number;
  playedAt: Date;
  avatarUri: string | null;
  showDivider?: boolean;
};

const Container = styled.tr`
  position: relative;

  text-align: left;
`;

const Cell = styled.td`
  padding: 15px 0;
`;

const RankText = styled(Cell)`
  width: 10%;
  padding-left: ${HORIZONTAL_PADDING}px;

  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.layout.hc};
  text-align: left;
`;

const UserContainer = styled(Cell)`
  width: auto;
  padding: 0 50px 0 20px;
`;

const InnerUserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const UserName = styled.div`
  margin-left: 15px;

  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 18px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.layout.rHc2};
  text-align: left;
`;

const UserDiscriminator = styled.div`
  margin: 0 0 2px 5px;

  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 10px;
  font-weight: lighter;
  color: ${({ theme }) => theme.colors.layout.rHc};
  text-align: left;
`;

const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;
`;

const ScoreText = styled(Cell)`
  width: 1%;
  padding-right: 50px;

  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.primitiveColors.red};
  text-align: center;
`;

const TimeText = styled(Cell)`
  width: 1%; // https://stackoverflow.com/questions/26983301/how-to-make-a-table-column-be-a-minimum-width
  padding-right: ${HORIZONTAL_PADDING}px;

  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 14px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.layout.hc};
  text-align: right;
  white-space: nowrap;
`;
