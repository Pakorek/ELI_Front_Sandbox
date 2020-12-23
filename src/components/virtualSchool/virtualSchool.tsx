import {gql, useQuery} from "@apollo/client";
import CreateFloor from '../createFLoor/createFloor';
import Floors from '../Floors/Floors';
import {School}  from './SchoolStyle'

const React = require('react')

function VirtualSchool(): JSX.Element {

    // get Virtual School
/*
    const getSchool = gql`
        {
            getSchool {
                _id
                name
                nbFloors
            }
        }
    `
    const {loading, error, data} = useQuery(getSchool);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{JSON.stringify(error)}</p>;
*/


    return (
        <School>
            {/*<CreateFloor />*/}
            <section>
                {/*{console.log("SCHOOL", data.getSchool)}*/}
                <Floors />
            </section>
        </School>
    )
}

export default VirtualSchool;