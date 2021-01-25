import { Container, Footer, Header } from '../../styles/elements';
import { QuizEditor } from '../QuizEditor';

const React = require('react');

export function Home(): JSX.Element {

  return (
    <>
      <Header>
        <Container>
          <h1>ELI Project</h1>
        </Container>
      </Header>
      <Container>
        <QuizEditor />
      </Container>
      <Footer>
        <Container>
          {/*<p>&copy; 2020 Wild Code School</p>*/}
        </Container>
      </Footer>
    </>
  );
}