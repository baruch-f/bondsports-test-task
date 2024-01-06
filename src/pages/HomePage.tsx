import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { IMeta, IPlayer, IValidationError } from '../types/interface';
import Player from '../components/Player';
import PlayerSearch from '../components/PlayerSearch';

interface HomePageBodySection {
    bg?: string;
}

const AlertMessage = styled.div`
    width: 100%;
    text-align: center;
    color: #000;
`;

const HomePageBody = styled.div`
    display: flex;
    background: #fff;
    padding: 0 0.5rem 2rem 0.5rem;
    margin: 0;
    color: #000;
    height: 80vh;
`;

const HomePageBodyHeader = styled.section`
    display: flex;
    flex: 0 0 100%;
    justify-content: center;
    align-items: center;
    height: 10vh;
`;

const HomePageBodySection = styled.section<HomePageBodySection>`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    flex-basis: 50%;
    padding: 0 2rem;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    background: ${({bg}) => bg || '#FFF'};
`;

const SearchInput = styled.input`
    width: 30%;
    text-align: left;
    color: #000;
    padding: 0.25rem;
`;

const LogoImg = styled.img`
    position: absolute;
    top: 0;
    left: 1%;
    opacity: 0.18;
    width: 28%;
    z-index: 0;
`;

const LoadMore = styled.button`
    border: 2px solid #48a1a1;
    background: aqua;
    border-radius: 10px;
    padding: 0.25rem 1rem;
    margin-top: 1rem;
    cursor: pointer;
    &:hover {
        opacity: 0.6;
    }
`;

const CorlorPicker = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 0.3rem 0.1rem;
    border-radius: 10px;
    p {
        padding: 0.6rem 0.65rem;
        border-radius: 50%;
        margin: 0.2rem;
        cursor: pointer;
        &:hover {
            opacity: 0.6;
        }
    }
`;

const HomePage: React.FC = () => {
    const [players, setPlayers] = useState<IPlayer[]>([]);
    const [meta, setMeta] = useState<IMeta | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [bg, setBg] = useState('lawngreen');
    const url = 'https://www.balldontlie.io/api/v1/players';

    const fetchData = async (url: string) => {
        setLoading(true);
        await new Promise((res) => {
            setTimeout(res, 1000);
        });
        try {
            const response = await axios.get(url);
            setPlayers([...players, ...response.data.data]);
            setMeta(response.data.meta);
        } catch (error) {
            if (axios.isAxiosError<IValidationError, Record<string, unknown>>(error)) {
                setError('An error occurred while fetching data.');
            } else {
                setError('An unknown error occurred.');
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        setPlayers([]);
        (async () => {
            await fetchData(url);
        })();
    }, []);

    const isNextPage = meta && meta.total_pages > meta.current_page;

    const loadNextPage = async () => {
        if (isNextPage) {
            await fetchData(`${url}?page=${meta.next_page}`);
        }
    };

    const setFavorite = (value: boolean) => (player: IPlayer) => {
        const playersCopy = [...players];
        const index = playersCopy.findIndex((p) => p.id === player.id);
        playersCopy[index].favorite = value;
        setPlayers(playersCopy);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    if (error) {
        return <AlertMessage>Error: {error}</AlertMessage>;
    }

    if (loading) {
        return <AlertMessage>Loading...</AlertMessage>;
    }

    const playersList = () => players.filter((p) => (searchText ? p.first_name.toLowerCase().includes(searchText.toLowerCase()) : true));
    const favoritesList = () => players.filter((p) => p.favorite && (searchText ? p.first_name.toLowerCase().includes(searchText.toLowerCase()) : true));

    return (
        <>
            <HomePageBodyHeader>
                <PlayerSearch searchText={searchText} setSearchText={setSearchText} />
            </HomePageBodyHeader>
            <HomePageBody>
                <LogoImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNI-rMSyvu6_WGZoTh99xpgxM3Ha8vwu_U5Q&usqp=CAU" />
                <HomePageBodySection bg="transparent">
                    {playersList().map((p) => (
                        <Player key={p.id} player={p} icon="+" setFavorite={setFavorite(true)} />
                    ))}
                    {isNextPage && <LoadMore onClick={loadNextPage}>Load More</LoadMore>}
                </HomePageBodySection>
                <HomePageBodySection bg={bg}>
                    <CorlorPicker>
                        <p onClick={() => setBg('lawngreen')} style={{ background: 'lawngreen' }}></p>
                        <p onClick={() => setBg('coral')} style={{ background: 'coral' }}></p>
                        <p onClick={() => setBg('cyan')} style={{ background: 'cyan' }}></p>
                    </CorlorPicker>
                    {favoritesList().map((p) => (
                        <Player key={p.id} player={p} icon="-" setFavorite={setFavorite(false)} />
                    ))}
                </HomePageBodySection>
            </HomePageBody>
        </>
    );
};

export default HomePage;
