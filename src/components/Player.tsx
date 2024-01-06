import React from 'react';
import styled from 'styled-components';
import { IPlayer } from '../types/interface';

const PlayerStyled = styled.div`
    padding: 0.5rem;
    text-align: left;
    color: #000;
    width: 100%;
    border-bottom: 1px solid;
    display: flex;
    flex-direction: row;
`;

const PlayerButton = styled.button`
    margin-left: auto;
    order: 2;
`;

interface IPlayerProps {
    player: IPlayer;
    icon?: string | React.ReactNode;
    setFavorite: (p: IPlayer) => void;
}

const Player: React.FC<IPlayerProps> = ({ player, setFavorite, icon }) => {
    return (
        <PlayerStyled>
            {player.first_name}
            <PlayerButton onClick={() => setFavorite(player)}>{icon}</PlayerButton>
        </PlayerStyled>
    );
};

export default Player;
