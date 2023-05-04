import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import NpcService from '../services/npc-service';
import { useParams, useNavigate } from "react-router-dom";


function NpcForm() {
    const [validated, setValidated] = useState(false);
    const { name } = useParams();
    const navigate = useNavigate();
    const [npcDetails, setNpcDetails] = useState({
        name: '', isFriendly: true, level: 1, experienceGiven: 0, strength: 1, dexterity: 1, constitution: 1, intelligence: 1, gold: 1
    });

    // see if this is an edit or a create
    // and load if we can
    useEffect(() => {
        if (name && name.length > 0) {
            NpcService.get(name).then(response => {
                setNpcDetails(response.data);
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
            if (npcDetails._id?.length > 0) {
                NpcService.update(npcDetails)
                    .then(response => {
                        setNpcDetails(response.data)
                        navigate("/npcs")
                    })
                    .catch(error => {
                        console.log("Error:", error)
                    })
            } else {
                NpcService.add(npcDetails)
                    .then(response => {
                        setNpcDetails(response.data)
                        navigate("/npcs")
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
            <Card.Header>Manage NPC</Card.Header>
            <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formNpcName">
                        <Form.Label>NPC Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter npc name" disabled={npcDetails._id?.length > 0}
                            value={npcDetails.name}
                            required
                            onChange={e => setNpcDetails({...npcDetails, name: e.target.value})}
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formNpcClass">
                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            checked={npcDetails.isFriendly}
                            onChange={e => setNpcDetails({...npcDetails, isFriendly: e.target.checked})}
                            label="Are they friendly?"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formNpcLevel">
                        <Form.Label>Level</Form.Label>
                        <Form.Control type="number" placeholder="Enter npc level" 
                            value={npcDetails.level}
                            required
                            onChange={e => setNpcDetails({...npcDetails, level: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formNpcStrength">
                        <Form.Label>Strength</Form.Label>
                        <Form.Control type="number" placeholder="Enter npc strength"
                            value={npcDetails.strength}
                            required
                            onChange={e => setNpcDetails({...npcDetails, strength: e.target.value})}
                         />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formNpcDexterity">
                        <Form.Label>Dexterity</Form.Label>
                        <Form.Control type="number" placeholder="Enter npc dexterity"
                            value={npcDetails.dexterity}
                            required
                            onChange={e => setNpcDetails({...npcDetails, dexterity: e.target.value})}
                         />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formNpcConstitution">
                        <Form.Label>Constitution</Form.Label>
                        <Form.Control type="number" placeholder="Enter npc constitution"
                            value={npcDetails.constitution}
                            required
                            onChange={e => setNpcDetails({...npcDetails, constitution: e.target.value})}
                         />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formNpcIntelligence">
                        <Form.Label>Intelligence</Form.Label>
                        <Form.Control type="number" placeholder="Enter npc intelligence"
                            value={npcDetails.intelligence}
                            required
                            onChange={e => setNpcDetails({...npcDetails, intelligence: e.target.value})}
                         />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formNpcGold">
                        <Form.Label>Gold Dropped</Form.Label>
                        <Form.Control type="number" placeholder="Enter npc gold"
                            value={npcDetails.gold}
                            required
                            onChange={e => setNpcDetails({...npcDetails, gold: e.target.value})}
                         />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formNpcExperience">
                        <Form.Label>Experience Given</Form.Label>
                        <Form.Control type="number" placeholder="Enter npc experience"
                            value={npcDetails.experienceGiven}
                            required
                            onChange={e => setNpcDetails({...npcDetails, experienceGiven: e.target.value})}
                         />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Save NPC
                        </Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default NpcForm;