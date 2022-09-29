import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreateTask from "../Modals/CreateTask";
import {
  addSubTasks,
  addTag,
  deleteSubTask,
  getTagsList,
  getTasks,
  updateSubtasksList,
  updateTasks,
} from "../Redux/AppReducer/action";
import { UPDATE_TASK_SUCCESS } from "../Redux/AppReducer/actionTypes";

const date = new Date().toLocaleDateString();

const Editpage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const tasks = useSelector((store) => store.AppReducer.tasks);
  const tagList = useSelector((store) => store.AppReducer.tags);
  const dispatch = useDispatch();

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskTags, setTaskTags] = useState([]);
  const [subTasks, setSubTasks] = useState([]);
  const [checkBox, setCheckBox] = useState([]);
  const [currentSubTask, setCurrentSubTask] = useState("");
  const [newTag, setNewTag] = useState("");

  const deleteHandler = (title) => {
    let newSubTasks = subTasks.filter((item) => item.subTaskTitle !== title);
    dispatch(deleteSubTask(id, { subTasks: newSubTasks })).then(() => {
      dispatch(getTasks());
    });
  };

  const addSubtask = (e) => {
    e.preventDefault();
    if (currentSubTask) {
      const newSubTasks = [
        ...subTasks,
        { subTaskTitle: currentSubTask, status: false },
      ];

      //api call to add subTasks
      dispatch(addSubTasks(id, { subTasks: newSubTasks }))
        .then(() => dispatch(getTasks()))
        .then(() => {
          setCurrentSubTask("");
        });
    }
  };

  const createTagHandler = () => {
    if (newTag) {
      //api call to add this new tags
      dispatch(addTag(newTag)).then(() => dispatch(getTagsList()));
    }
  };

  const updateFunc = (identifier, value) => {
    if (identifier === "textAndDescription") {
      dispatch(
        updateTasks(id, {
          title: taskTitle,
          description: taskDescription,
        })
      ).then(() => dispatch(getTasks()));
    } else if (identifier === "taskStatus") {
      dispatch(
        updateTasks(id, {
          task_status: value,
        })
      ).then((r) => {
        if (r === UPDATE_TASK_SUCCESS) {
          dispatch(getTasks());
        }
      });
    } else if (identifier === "taskTags") {
      dispatch(
        updateTasks(id, {
          tags: value,
        })
      ).then(() => dispatch(getTasks()));
    }
  };

  const updateSubTaskStatus = (value) => {
    let newSubTaskData = subTasks.map((item) => {
      if (value.includes(item.subTaskTitle)) {
        return {
          ...item,
          status: true,
        };
      }
      return { ...item, status: false };
    });

    dispatch(updateSubtasksList(id, { subTasks: newSubTaskData })).then(() =>
      dispatch(getTasks())
    );
  };

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(getTasks());
    }
  }, [dispatch, tasks.length]);

  useEffect(() => {
    if (tasks) {
      const currentTask = tasks.find((item) => item.id === Number(id));

      if (currentTask) {
        setTaskTitle(currentTask.title);
        setTaskDescription(currentTask.description);
        setTaskStatus(currentTask.task_status);
        setTaskTags(currentTask.tags);
        setSubTasks(currentTask.subTasks);

        let data = currentTask.subTasks
          .filter((item) => {
            return item.status && item.subTaskTitle;
          })
          .map((item) => item.subTaskTitle);

        setCheckBox(data);
      }
    }
  }, [id, tasks]);

  return (
    <Box width="100%" paddingTop="1rem" color="white" bg={"#436c89"}>
      <Flex justifyContent="space-around">
        {/* Task title */}
        <Flex
          width="220px"
          padding="3px 15px 0 3px"
          height="95vh"
          direction="column"
          justifyContent="space-between"
          overflow="auto"
          border="1px solid rgba(0,0,0,0.1)"
          borderRadius="5px"
        >
          <Box>
            <Stack direction="column">
              <Input
                placeholder="title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <Editable value={taskDescription}>
                <EditablePreview />
                <EditableTextarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </Editable>
              <Button
                color="navy"
                onClick={() => {
                  updateFunc("textAndDescription");
                }}
              >
                Update
              </Button>
            </Stack>
          </Box>

          <Box>
            <Heading as="h5" size="md" padding="0.5rem 0">
              Status
            </Heading>
            <RadioGroup
              value={taskStatus}
              onChange={(value) => {
                setTaskStatus(value);
                updateFunc("taskStatus", value);
              }}
            >
              <Stack direction="column">
                <Radio value="todo">Todo</Radio>
                <Radio value="in-progress">In-Progress</Radio>
                <Radio value="done">Done</Radio>
              </Stack>
            </RadioGroup>
          </Box>

          <Box>
            <Heading as="h5" size="md" padding="0.5rem 0">
              Tags
            </Heading>
            {/* Create new tags */}
            <Flex>
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <Button
                color="navy"
                marginLeft="0.5rem"
                onClick={createTagHandler}
              >
                Create
              </Button>
            </Flex>
            {/* Show current tags */}
            <CheckboxGroup
              colorScheme="green"
              value={taskTags}
              onChange={(value) => {
                setTaskTags(value);
                updateFunc("taskTags", value);
              }}
            >
              <Stack spacing={[1, 5]} direction={"column"}>
                {tagList.length > 0 &&
                  tagList.map((item) => {
                    return (
                      <Checkbox key={item.id} value={`${item.tag}`}>
                        {item.tag}
                      </Checkbox>
                    );
                  })}
              </Stack>
            </CheckboxGroup>
          </Box>
        </Flex>

        {/* Sub tasks */}
        <Box
          border="1px solid rgba(0,0,0,0.1)"
          borderRadius="5px"
          padding="0.25rem"
          width="350px"
          height="95vh"
          overflow="auto"
          paddingRight="15px"
        >
          <form onSubmit={addSubtask}>
            <Flex>
              <Input
                placeholder="Add new subtask"
                value={currentSubTask}
                onChange={(e) => setCurrentSubTask(e.target.value)}
              />
              <Button color="navy" ml="0.5rem" type="submit">
                Add
              </Button>
            </Flex>
          </form>

          <Flex direction="column" p="1rem" gap="1rem">
            <CheckboxGroup
              value={checkBox}
              onChange={(value) => {
                setCheckBox(value);
                updateSubTaskStatus(value);
              }}
            >
              {subTasks.length &&
                subTasks.map((item, index) => (
                  <Flex
                    key={index}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Checkbox value={item.subTaskTitle}>
                      {item.subTaskTitle}
                    </Checkbox>
                    <DeleteIcon
                      onClick={() => deleteHandler(item.subTaskTitle)}
                    />
                  </Flex>
                ))}
            </CheckboxGroup>
          </Flex>
        </Box>

        {/* Create new task */}
        <Box
          border="1px solid rgba(0,0,0,0.1)"
          borderRadius="5px"
          width="250px"
          height="95vh"
          textAlign="center"
        >
          <Flex justifyContent="center" marginTop="1rem">
            <Text>Date: </Text>
            <Text fontWeight="bold" margin="auto 0">
              {date}
            </Text>
          </Flex>
          <Box m="1rem">
            <Button color="navy" onClick={onOpen}>
              Create New Task
            </Button>
          </Box>
          <CreateTask isOpen={isOpen} onClose={onClose} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Editpage;
