import {useForm} from "react-hook-form";
import {useState} from "react";
import {useCreateCourseMutation} from '../utils/createCourseMutation';

const React = require('react')

export type CourseInput = {
  title: string,
  subtitle?: string,
  content?: string,
}

const CreateCourse = (): JSX.Element => {
  const [create, ] = useCreateCourseMutation();
  const {handleSubmit, register} = useForm();
  const [error, setError] = useState([]);
  const [course, setCourse] = useState()

  const onSubmit = async (values: CourseInput) => {
    try {
      // @ts-ignore
      const course = await create(values)
      setCourse(course)
    } catch (e) {
      console.log(e)
      setError(e)
      // setError(e.graphQLErrors[0].extensions.exception.validationErrors ?? e.graphQLErrors[0].message);
    }

  };

  return (
    <div style={{margin: "auto", padding: "100px"}}>
      <pre>Create Course</pre>
      {/*{ user && <pre>{JSON.stringify(user) + ' created'}</pre>}*/}
      { error && <code>{JSON.stringify(error)}</code>}
      {/*{ typeof error !== "object"*/}
      {/*  ? <pre>{JSON.stringify(error)}</pre>*/}
      {/*  : error.map((err: any) => <pre> {JSON.stringify(Object.values(err.constraints))}</pre> )*/}
      {/*}*/}
      <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
        <div>
          <input
            name="title"
            ref={register()}
            placeholder="Title"
          />
        </div>
        <div>
          <input
            name="subtitle"
            ref={register()}
            placeholder="Subtitle"
          />
        </div>
        <div>
          <input
            name="content"
            ref={register()}
            placeholder="Content"
          />
        </div>
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
