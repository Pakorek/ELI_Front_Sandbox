import {useMutation, useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useState} from "react";
import {CardRow, Container, Footer, Header} from "../../styles/elements";
import VirtualSchool from "../virtualSchool/virtualSchool";
const React = require('react')

type TeacherType = {
    _id: any
    firstName: string
    lastName: string
    speciality: string
    seniority: number
    classroom: string
}



export function Home(): JSX.Element {
/*
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
*/

    return (
        <>
            <Header>
                <Container>
                    <h1>Virtual School</h1>
                </Container>
            </Header>
            <Container>
                <CardRow>
                    {/*{data.getTeachers.forEach((teacher: TeacherType) => {*/}
                    {/*    console.log(teacher.firstName + teacher.lastName)*/}
                    {/*})}*/}

                    <VirtualSchool/>


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