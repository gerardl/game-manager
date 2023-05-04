import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CharacterList from '../components/CharacterList';

function Characters() {
    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <h2>Manage Characters</h2>
                    <hr />
                </Col>
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