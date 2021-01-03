import {useCreateUserMutation} from "./createUserMutation";
import faker from 'faker';

// const SPECIALITIES = ['Français', 'Mathématiques', 'Anglais', 'Histoire', 'Géographie']

export async function generateTeachers(number: number): Promise<any[]> {
    const [createUser,] = useCreateUserMutation();
    let TEACHERS = [];

    for (let i = 0; i < number; i++) {
        const values = {
            lastName: faker.name.lastName(),
            firstName: faker.name.firstName(),
            email: faker.internet.email(),
            role: "TEACHER",
            password: "password"
        }

        try {
            // @ts-ignore
            const user = await createUser(values)
            TEACHERS.push(user)
            console.log('user created', user)
        } catch (err) {
            console.log('createUser errors', err.graphQLErrors[0].extensions.exception.validationErrors)
        }


        // const speciality = SPECIALITIES[Math.floor(Math.random() * SPECIALITIES.length)]
        // const seniority = Math.floor(Math.random() * 20)
        // const classromm = faker.internet.url()

        //await generateCourse(teacher, 2)


    }
    return TEACHERS;
}

