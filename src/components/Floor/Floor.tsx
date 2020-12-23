import {useMutation, useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {FloorStyle} from "./FloorStyle";
//import Rooms from "../Rooms/Rooms";

const React = require('react')

export type FloorType = {
    _id: any,
    schoolId: any,
    level: number,
    nbRooms: number
}

function Floor({ _id, schoolId, level, nbRooms } : FloorType): JSX.Element {

    return (
        <FloorStyle>
            {level}

        </FloorStyle>
    )
}

export default Floor;