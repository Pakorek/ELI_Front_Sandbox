import { Container, Footer, Header } from '../../styles/elements';
import { QuizEditor } from '../QuizEditor';

const React = require('react');

export function Home(): JSX.Element {

  return (
    <>
      <Header>
        {/*  NAVBAR   */}
      </Header>
      <Container>
        <QuizEditor />
      </Container>
    </>
  );
}