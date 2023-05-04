import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import NpcService from '../services/npc-service';
import { useNavigate } from "react-router-dom";

function NpcList() {
    const navigate = useNavigate();
    const [npcs, setNpcs] = useState([]);

    useEffect(() => {
        NpcService.getAll().then(response => {
            setNpcs(response.data);
        }).catch(error => {
            alert(`Error: ${error.response.data}`)
        })
    }, [])

    function handleRowClick(npc) {
        navigate(`/npcs/manage/${npc.name}`)
    }

    return (
        <Card>
            <Card.Header>NPC List</Card.Header>
            <Card.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Friendly?</th>
                            <th>Level</th>
                            <th>Exp Given</th>
                            <th>Gold Dropped</th>
                        </tr>
                    </thead>
                    <tbody>
                        {npcs.map((npc, index) => {
                            return (
                                <tr key={index} className="pointer" onClick={() => handleRowClick(npc)}>
                                    <td>{npc.name}</td>
                                    <td>{npc.isFriendly ? "Yes" : "No"}</td>
                                    <td>{npc.level}</td>
                                    <td>{npc.experienceGiven}</td>
                                    <td>{npc.gold}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

export default NpcList;