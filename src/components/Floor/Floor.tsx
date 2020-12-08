import {useMutation, useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {FloorStyle} from "./FloorStyle";

const React = require('react')

type FloorType = {
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