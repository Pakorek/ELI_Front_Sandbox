import {useMutation, useQuery} from "@apollo/client";
import gql from "graphql-tag";
// import {FloorStyle} from "./FloorStyle";

const React = require('react')

export type RoomType = {
    _id: any,
    schoolId: any,
    level: number,
    nbRooms: number
}

function Room({ _id, schoolId, level, nbRooms } : RoomType): JSX.Element {

    // getRooms

    return (
        <>
            {level}
        </>
    )
}

export default Room;