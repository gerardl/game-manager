import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NpcForm from '../components/NpcForm';
import { NavLink } from "react-router-dom";

function ManageNpc() {
    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <h2>Edit NPC</h2>
                </Col>
                <Col>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <NavLink to="/npcs/" className="btn btn-primary me-md-2" role="button">Back</NavLink>
                    </div>
                </Col>
                <hr />
            </Row>
            <Row>
                <Col>
                    <NpcForm />
                </Col>
            </Row>
        </Container>
    );
}

export default ManageNpc;