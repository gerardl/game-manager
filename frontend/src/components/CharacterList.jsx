import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import CharacterService from '../services/character-service';
import { useNavigate } from "react-router-dom";

function CharacterList() {
    const navigate = useNavigate();
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        CharacterService.getAll().then(response => {
            setCharacters(response.data);
        }).catch(error => {
            console.log(error)
        })
    }, [])

    function handleRowClick(character) {
        navigate(`/characters/manage/${character.name}`)
    }

    return (
        <Card>
            <Card.Header>Character List</Card.Header>
            <Card.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Level</th>
                            <th>Exp</th>
                            <th>Gold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {characters.map((character, index) => {
                            return (
                                <tr key={index} className="pointer" onClick={() => handleRowClick(character)}>
                                    <td>{character.name}</td>
                                    <td>{character.class}</td>
                                    <td>{character.level}</td>
                                    <td>{character.experience}</td>
                                    <td>{character.gold}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

export default CharacterList;