import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import {
  createTodoApi,
  retrieveTodoApi,
  updateTodoApi,
} from "../../api/TodoApiService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";

const Todo = () => {
  const { id } = useParams();
  const authContext = useAuth();
  const username = authContext.username;
  const navigate = useNavigate();

  const getTodo = () => {
    if (id != -1) {
      retrieveTodoApi(username, id)
        .then((res) => {
          setDescription(res.data.description);
          setTargetDate(res.data.targetDate);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getTodo();
  }, [id]);

  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const onSubmit = (values) => {
    const todo = {
      id: id,
      username: username,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };

    if (id == -1) {
      createTodoApi(username, todo)
        .then((res) => {
          navigate("/todos");
        })
        .catch((err) => console.log(err));
    } else {
      updateTodoApi(username, id, todo)
        .then((res) => {
          navigate("/todos");
        })
        .catch((err) => console.log(err));
    }
  };

  const validate = (values) => {
    let errors = {};

    if (values.description.length < 5) {
      errors.description = "Enter atleast 5 characters.";
    }

    if (
      values.targetDate == null ||
      values.targetDate == "" ||
      !moment(values.targetDate).isValid()
    ) {
      errors.targetDate = "Enter a target date.";
    }

    return errors;
  };

  return (
    <div className="container">
      <h1>Enter todo details</h1>
      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                />
              </fieldset>
              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Target Date</label>
                <Field type="date" className="form-control" name="targetDate" />
              </fieldset>
              <div>
                <button className="btn btn-success m-5" type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Todo;
