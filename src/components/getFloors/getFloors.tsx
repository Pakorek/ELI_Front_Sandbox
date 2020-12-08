import {useMutation, useQuery} from "@apollo/client";
import gql from "graphql-tag";
import Floor from "../Floor/Floor";
const React = require('react')


type FloorType = {
    _id: any,
    schoolId: any,
    level: number,
    nbRooms: number
}

function Floors(): JSX.Element {
    const GET_FLOORS = gql`
        {
            getFloors {
                _id
                level
            }
        }
    `
    const {loading, error, data} = useQuery(GET_FLOORS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{JSON.stringify(error)}</p>;

    return (
        <div>
            <h1>School</h1>
            {/*{console.log('FLOORS', data.getFloors)}*/}
            <section>
                {
                    data.getFloors.map( (floor: FloorType) => (
                        <Floor {...floor}/>
                        // console.log(floor.level)
                    )
                    )
                }
            </section>
        </div>
    )
}

export default Floors;