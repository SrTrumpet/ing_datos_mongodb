import { gql } from "@apollo/client";

export const ADD_USER = gql`
    mutation AddUser($data: CreateUserInput!) {
        addUser(data: $data) {
            id
            nombre
            correo
            edad
            intereses
        }
    }
`;

export const DELETE_USER = gql`
    mutation DeleteUser($id: String!) {
        deleteUser(id: $id) {
        id
        }
    }
`;

export const UPDATE_USER = gql`
    mutation UpdateUser($data: UpdateUserInput!) {
        updateUser(data: $data) {
            id
            nombre
            correo
            edad
            intereses
            }
    }
`;
