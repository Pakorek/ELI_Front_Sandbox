import {CardRow, Container, Footer, Header} from "../../styles/elements";
import CreateCourse from '../CreateCourse';
import CreateQuiz from '../CreateQuiz';
const React = require('react')

/*
type TeacherType = {
    _id: any
    firstName: string
    lastName: string
    speciality: string
    seniority: number
    classroom: string
}
*/



export function Home(): JSX.Element {

    return (
        <>
            <Header>
                <Container>
                    <h1>ELI Project</h1>
                </Container>
            </Header>
            <Container>
                {/*<CardRow>*/}
                    {/*{data.getTeachers.forEach((teacher: TeacherType) => {*/}
                    {/*    console.log(teacher.firstName + teacher.lastName)*/}
                    {/*})}*/}
                  {/*<CreateCourse />*/}
                  <CreateQuiz />

                {/*</CardRow>*/}
            </Container>
            <Footer>
                <Container>
                    {/*<p>&copy; 2020 Wild Code School</p>*/}
                </Container>
            </Footer>
        </>
    );
}