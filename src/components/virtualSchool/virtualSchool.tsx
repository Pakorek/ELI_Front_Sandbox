import {gql, useQuery} from "@apollo/client";
import CreateFloor from '../createFLoor/createFloor';
import Floors from '../getFloors/getFloors';
const React = require('react')

function VirtualSchool(): JSX.Element {

    // get Virtual School
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


    return (
        <section>
            <CreateFloor />
            <section>
                {console.log("SCHOOL", data.getSchool)}
                <Floors />

                {/*map floors => create article with border*/}
            </section>
        </section>
    )
}

export default VirtualSchool;