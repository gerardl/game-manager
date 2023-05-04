import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NpcList from '../components/NpcList';
import { NavLink } from "react-router-dom";

function Npcs() {
    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <h2>Manage NPCs</h2>
                </Col>
                <Col>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <NavLink to="/npcs/manage" className="btn btn-primary me-md-2" role="button">Add NPC</NavLink>
                    </div>
                </Col>
                <hr />
            </Row>
            <Row>
                <Col>
                    <NpcList />
                </Col>
            </Row>
        </Container>
    );
}

export default Npcs;