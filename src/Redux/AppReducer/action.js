import axios from "axios";
import * as types from "./actionTypes";

const getTasks = () => (dispatch) => {
  dispatch({ type: types.GET_TASKS_REQUEST });
  return axios
    .get(`${process.env.REACT_APP_BASE_API}/tasks`)
    .then((r) => {
      dispatch({ type: types.GET_TASKS_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({ type: types.GET_TASKS_FAILURE, payload: e });
    });
};

const createTask = (payload) => (dispatch) => {
  dispatch({ type: types.CREATE_TASKS_REQUEST });
  return axios
    .post(`${process.env.REACT_APP_BASE_API}/tasks`, payload)
    .then((r) => {
      dispatch({ type: types.CREATE_TASKS_SUCCESS, payload: r });
    })
    .catch((e) => {
      dispatch({ type: types.CREATE_TASKS_FAILURE, payload: e });
    });

};


const updateTasks = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_TASK_REQUEST });

  return axios
    .patch(`${process.env.REACT_APP_BASE_API}/tasks/${id}`, payload)
    .then((r) => {
      dispatch({ type: types.UPDATE_TASK_SUCCESS, payload: r.data });
      return types.UPDATE_TASK_SUCCESS;
    })
    .catch((e) => dispatch({ type: types.UPDATE_TASK_FAILURE, payload: e }));
};

const deleteTasks = (id) => (dispatch) => {
  dispatch({ type: types.DELETE_TASK_REQUEST });
  return axios.delete(`${process.env.REACT_APP_BASE_API}/tasks/${id}`).then(() => {
    dispatch({ type: types.DELETE_TASK_SUCCESS })
  }).catch((err) => {
    dispatch({ type: types.DELETE_TASK_FAILURE, payload: err })
  })
}
const updateSubtasksList = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_SUBTASKS_REQUEST });

  return axios
    .patch(`${process.env.REACT_APP_BASE_API}/tasks/${id}`, payload, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((r) => dispatch({ type: types.UPDATE_SUBTASKS_SUCCESS, payload: r }))
    .catch((e) => {
      dispatch({ type: types.UPDATE_SUBTASKS_FAILURE, payload: e });
    });
};





const addSubTasks = (id, payload) => (dispatch) => {
  dispatch({ type: types.ADD_SUBTASKS_REQUEST });

  return axios
    .patch(`${process.env.REACT_APP_BASE_API}/tasks/${id}`, payload)
    .then((r) => {
      dispatch({ type: types.ADD_SUBTASKS_SUCCESS, payload: r });
    })
    .catch((e) => {
      dispatch({ type: types.ADD_SUBTASKS_FAILURE, payload: e });
    });
};

const deleteSubTask = (id, payload) => (dispatch) => {
  dispatch({ type: types.DELETE_SUBTASKS_REQUEST });
  return axios
    .patch(`${process.env.REACT_APP_BASE_API}/tasks/${id}`, payload)
    .then((r) => dispatch({ type: types.DELETE_SUBTASKS_SUCCESS, payload: r }))
    .catch((e) =>
      dispatch({ type: types.DELETE_SUBTASKS_FAILURE, payload: e })
    );
};



const addTag = (tag) => (dispatch) => {
  dispatch({ type: types.ADD_TAG_REQUEST });

  return axios
    .post(`${process.env.REACT_APP_BASE_API}/tagList`, { tag })
    .then((r) => {
      dispatch({ type: types.ADD_TAG_SUCCESS, payload: r.data });
    })
    .catch((e) => dispatch({ type: types.ADD_TAG_FAILURE, payload: e }));
};

const deleteTag = (id) => (dispatch) => {
  dispatch({ type: types.DELETE_TAG_REQUEST });
  return axios.delete(`${process.env.REACT_APP_BASE_API}/tagList/${id}`).then(() => {
    dispatch({ type: types.DELETE_TAG_SUCCESS })
  }).catch((err) => {
    dispatch({ type: types.DELETE_TAG_FAILURE, payload: err })
  })
}

const getTagsList = () => (dispatch) => {
  dispatch({ type: types.GET_TAG_REQUEST });

  return axios
    .get(`${process.env.REACT_APP_BASE_API}/tagList`)
    .then((r) => {
      dispatch({ type: types.GET_TAG_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({ type: types.GET_TAG_FAILURE, payload: e });
    });
};

export {
  getTasks,
  getTagsList,
  updateSubtasksList,
  updateTasks,
  addTag,
  addSubTasks,
  deleteSubTask,
  createTask,
  deleteTasks,
  deleteTag
};


