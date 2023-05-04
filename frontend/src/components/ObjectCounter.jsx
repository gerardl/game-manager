// count of users, npcs, characters

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import AccountService from '../services/account-service';
import CharacterService from '../services/character-service';
import NpcService from '../services/npc-service';
import { useState, useEffect } from 'react';

function ObjectCounter() {
    const [userCount, setUserCount] = useState(0);
    const [characterCount, setCharacterCount] = useState(0);
    const [npcCount, setNpcCount] = useState(0);

    useEffect(() => {
        AccountService.count().then(response => {
            setUserCount(response.data);
        }).catch(error => {
            setUserCount(0);
        })

        CharacterService.count().then(response => {
            setCharacterCount(response.data);
        }).catch(error => {
            setCharacterCount(0);
        })

        NpcService.count().then(response => {
            setNpcCount(response.data);
        }).catch(error => {
            setNpcCount(0);
        })
    }, [])

  return (
    <Card>
        <Card.Header>Total Records</Card.Header>
        <Card.Body>
            <ListGroup as="ol">
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                    Users <Badge bg="primary" className='pull-right'>{userCount}</Badge>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                    Characters <Badge bg="info" className='pull-right'>{characterCount}</Badge>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                    NPCs <Badge bg="dark" className='pull-right'>{npcCount}</Badge>
                </ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card>
  );
}

export default ObjectCounter;