import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
    query Query {
        getAllUser {
            id
            nombre
            correo
            edad
            intereses
        }
    }
`