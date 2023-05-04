import ObjectCounter from "../components/ObjectCounter";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function Home() {
    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <h2>Welcome</h2>
                </Col>
                <hr />
            </Row>
            <Row>
                <Col>
                    <Alert variant="info">
                        Thanks for checking out the MMO Manager! After logging in, you can manage your characters and NPCs by following
                        the links above.
                    </Alert>
                </Col>
                <Col lg={4}>
                    <ObjectCounter />
                </Col>
            </Row>
        </Container>
    );
}

export default Home;