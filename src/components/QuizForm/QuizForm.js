import { Formik } from 'formik';
import { StyleForm, StyleField, StyledError } from './QuizForm.styled';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  topic: Yup.string().min(1, 'Too Short!').required('Required'),
  level: Yup.string()
    .oneOf(['beginner', 'intermediate', 'advanced'])
    .required('Required'),
  time: Yup.number()
    .positive('Must be >0')
    .min(10, 'Not enough time!')
    .required('Required'),
  questions: Yup.number()
    .positive('Must be >0')
    .min(3, 'Min 3 q!')
    .required('Required'),
});

export const QuizForm = ({ onAdd }) => {
  return (
    <Formik
      initialValues={{
        topic: '',
        level: 'beginner',
        time: 0,
        questions: 0,
      }}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        onAdd({ values });
        actions.resetForm();
      }}
    >
      <StyleForm>
        <label>
          Topic
          <StyleField name="topic" placeholder="Quiz topic..." />
          <StyledError name="topic" component="div" />
        </label>
        <label>
          Level
          <StyleField as="select" name="level">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </StyleField>
          <StyledError name="level" component="div" />
        </label>
        <label>
          Time
          <StyleField name="time" type="number" />
          <StyledError name="time" component="div" />
        </label>
        <label>
          Questions
          <StyleField name="questions" type="number" />
          <StyledError name="questions" component="div" />
        </label>

        <button type="submit">Submit</button>
      </StyleForm>
    </Formik>
  );
};
