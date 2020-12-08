import {useMutation} from "@apollo/client";
import gql from "graphql-tag";
const React = require('react')


function CreateFloor(): JSX.Element {
    const ADD_FLOOR = gql`
        mutation {
            createFloor(input: {}) {
                level
            }
        }
    `
    const [addFloor, {data} ] = useMutation(ADD_FLOOR);

    return (
        <div>
            <button onClick={() => addFloor()}>
                Create Floor +
            </button>
        </div>
    )
}

export default CreateFloor;