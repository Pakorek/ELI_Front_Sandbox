import "./App.css";
// import AppContext from "./context/AppContext";
// import { Success } from "./styles/form-elements";
import {
    CardRow,
    Container,
    Footer,
    Header,
} from "./styles/elements";
// import { ReactComponent as PlusCircle } from "./icons/add-circle.svg";
// import { ReactComponent as MinusCircle } from "./icons/minus-circle.svg";
import { useQuery, gql } from '@apollo/client';
import VirtualSchool from './components/virtualSchool/virtualSchool';
const React = require('react')

type TeacherType = {
    _id: any
    firstName: string
    lastName: string
    speciality: string
    seniority: number
    classroom: string
}

function App(): JSX.Element {

    const TEACHERS = gql`
        {
            getTeachers {
                firstName
                lastName
            }
        }
    `
    const {loading, error, data} = useQuery(TEACHERS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{JSON.stringify(error)}</p>;

    return (
        <>
            <Header>
                <Container>
                    <h1>Virtual School</h1>
                </Container>
            </Header>
            {/*<Container>*/}
            {/*  <AppContext.Provider value={dispatch}>*/}
            {/*    <ShowButton*/}
            {/*      onClick={() => dispatch({ type: "TOGGLE_SHOW_ADD_FORM" })}*/}
            {/*    >*/}
            {/*      {state.showAddForm ? <MinusCircle /> : <PlusCircle />}*/}
            {/*    </ShowButton>*/}
            {/*    {state.showAddForm ? (*/}
            {/*      <AddWilder />*/}
            {/*    ) : (*/}
            {/*      state.successMessage !== "" && (*/}
            {/*        <Success>{state.successMessage}</Success>*/}
            {/*      )*/}
            {/*    )}*/}
            {/*  </AppContext.Provider>*/}
            {/*</Container>*/}
            <Container>
                <CardRow>
                    {/*{console.log(data)}*/}
                    { data.getTeachers.forEach((teacher: TeacherType) => {
                        console.log(teacher.firstName + teacher.lastName)
                    })}

                    <VirtualSchool />


                    {/*{state.wilders.map((wilder) => (*/}
                    {/*  <Wilder*/}
                    {/*    // eslint-disable-next-line no-underscore-dangle*/}
                    {/*    key={wilder._id}*/}
                    {/*    // eslint-disable-next-line no-underscore-dangle*/}
                    {/*    _id={wilder._id}*/}
                    {/*    city={wilder.city}*/}
                    {/*    name={wilder.name}*/}
                    {/*    justAdded={wilder.justAdded}*/}
                    {/*    skills={wilder.skills}*/}
                    {/*  />*/}
                    {/*))}*/}
                </CardRow>
            </Container>
            <Footer>
                <Container>
                    {/*<p>&copy; 2020 Wild Code School</p>*/}
                </Container>
            </Footer>
        </>
    );
}

export default App;
