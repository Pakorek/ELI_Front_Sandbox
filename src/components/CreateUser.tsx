import { useForm } from 'react-hook-form';
import { FormEvent, useState } from 'react';
import { useCreateUserMutation } from '../utils/createUserMutation';
import faker from 'faker';

const React = require('react');

export type UserInput = {
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  role: string
}

const CreateUser = () => {
  const [createUser] = useCreateUserMutation();
  const { handleSubmit, register } = useForm();
  const [error, setError] = useState([]);
  const [user, setUser] = useState();

  const [nb, setNb] = useState(0);

  const onSubmit = async (values: UserInput) => {
    try {
      // @ts-ignore
      const user = await createUser(values);
      setUser(user);
    } catch (e) {
      setError(e);
      // setError(e.graphQLErrors[0].extensions.exception.validationErrors ?? e.graphQLErrors[0].message);
    }

  };


  const onSubmitGenerator = async (e: FormEvent) => {
    e.preventDefault()
    for (let i = 0; i < nb; i++) {
      console.log('generate ', i)
      const values: UserInput = {
        lastname: faker.name.lastName(),
        firstname: faker.name.firstName(),
        email: faker.internet.email(),
        role: 'TEACHER',
        password: 'password',
      };

      try {
        // @ts-ignore
        const user = await createUser(values);
        // TEACHERS.push(user)
        console.log('user created', user);
      } catch (err) {
        // console.log('createUser errors', err.graphQLErrors[0].extensions.exception.validationErrors);
        console.log('createUser errors', err.ApolloError);
        setError(err)
      }
    }
  }

    return (
      <div style={{ margin: 'auto', padding: '50px' }}>
        <pre>Sign Up</pre>
        {user && <pre>{JSON.stringify(user) + ' created'}</pre>}
        {error && <pre>{JSON.stringify(error)}</pre>}
        <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
          <div>
            <input
              name="firstname"
              ref={register()}
              placeholder="firstname"
            />
          </div>
          <div>
            <input
              name="lastname"
              ref={register()}
              placeholder="lastname"
            />
          </div>
          <div>
            <input
              name="email"
              type="email"
              ref={register()}
              placeholder="email"
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              ref={register()}
              placeholder="******"
            />
          </div>
          <div>
            <select name="role" ref={register()}>
              <option value="TEACHER">Teacher</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>
          <button type="submit">
            Submit
          </button>
        </form>

        <form onSubmit={onSubmitGenerator} noValidate style={{padding: '10px', border: '1px solid black'}}>
          <input type="number" value={nb} onChange={(e) => setNb(+e.target.value)} />
          <button type="submit">Generate Teacher</button>
        </form>

      </div>
    );
  };

  export default CreateUser;
