import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CharacterList from '../components/CharacterList';
import { NavLink } from "react-router-dom";

function Characters() {
    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <h2>Manage Characters</h2>
                </Col>
                <Col>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <NavLink to="/characters/manage" className="btn btn-primary me-md-2" role="button">Add Character</NavLink>
                    </div>
                </Col>
                <hr />
            </Row>
            <Row>
                <Col>
                    <CharacterList />
                </Col>
            </Row>
        </Container>
    );
}

export default Characters;