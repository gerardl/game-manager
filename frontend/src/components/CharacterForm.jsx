import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import CharacterService from '../services/character-service';
import { useParams, useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function CharacterForm() {
    const [validated, setValidated] = useState(false);

    const { name } = useParams();
    const navigate = useNavigate();
    const [characterDetails, setCharacterDetails] = useState({
        name: '', class: '', level: 1, experience: 0, strength: 1, dexterity: 1, constitution: 1, intelligence: 1, gold: 1
    });

    // see if this is an edit or a create
    // and load if we can
    useEffect(() => {
        if (name && name.length > 0) {
            CharacterService.get(name).then(response => {
                setCharacterDetails(response.data);
            }).catch(error => {
                alert("Error:", error)
            })
        }
    }, [])

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            // could show messages here
        } else {
            if (characterDetails._id?.length > 0) {
                CharacterService.update(characterDetails)
                    .then(response => {
                        setCharacterDetails(response.data)
                        navigate("/characters")
                    })
                    .catch(error => {
                        console.log("Error:", error)
                    })
            } else {
                CharacterService.add(characterDetails)
                    .then(response => {
                        setCharacterDetails(response.data)
                        navigate("/characters")
                    })
                    .catch(error => {
                        console.log("Error:", error)
                    })
            }
        }

        setValidated(true);
    }

    return (
        <Card>
            <Card.Header>Manage Character</Card.Header>
            <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formCharacterName">
                                <Form.Label>Character Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter character name" disabled={characterDetails._id?.length > 0}
                                    value={characterDetails.name}
                                    required
                                    onChange={e => setCharacterDetails({...characterDetails, name: e.target.value})}
                                />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formCharacterLevel">
                                <Form.Label>Level</Form.Label>
                                <Form.Control type="number" placeholder="Enter character level" 
                                    value={characterDetails.level}
                                    required
                                    onChange={e => setCharacterDetails({...characterDetails, level: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formCharacterConstitution">
                                <Form.Label>Constitution</Form.Label>
                                <Form.Control type="number" placeholder="Enter character constitution"
                                    value={characterDetails.constitution}
                                    required
                                    onChange={e => setCharacterDetails({...characterDetails, constitution: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formCharacterIntelligence">
                                <Form.Label>Intelligence</Form.Label>
                                <Form.Control type="number" placeholder="Enter character intelligence"
                                    value={characterDetails.intelligence}
                                    required
                                    onChange={e => setCharacterDetails({...characterDetails, intelligence: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formCharacterGold">
                                <Form.Label>Gold</Form.Label>
                                <Form.Control type="number" placeholder="Enter character gold"
                                    value={characterDetails.gold}
                                    required
                                    onChange={e => setCharacterDetails({...characterDetails, gold: e.target.value})}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formCharacterClass">
                                <Form.Label>Class</Form.Label>
                                <Form.Control type="text" placeholder="Enter character class"
                                    value={characterDetails.class}
                                    required
                                    onChange={e => setCharacterDetails({...characterDetails, class: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formCharacterExperience">
                                <Form.Label>Experience</Form.Label>
                                <Form.Control type="number" placeholder="Enter character experience"
                                    value={characterDetails.experience}
                                    required
                                    onChange={e => setCharacterDetails({...characterDetails, experience: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formCharacterStrength">
                                <Form.Label>Strength</Form.Label>
                                <Form.Control type="number" placeholder="Enter character strength"
                                    value={characterDetails.strength}
                                    required
                                    onChange={e => setCharacterDetails({...characterDetails, strength: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formCharacterDexterity">
                                <Form.Label>Dexterity</Form.Label>
                                <Form.Control type="number" placeholder="Enter character dexterity"
                                    value={characterDetails.dexterity}
                                    required
                                    onChange={e => setCharacterDetails({...characterDetails, dexterity: e.target.value})}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="m-3">
                            <Form.Group>
                                <Button variant="primary" type="submit" className="pull-right">
                                    Save Character
                                </Button>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default CharacterForm;