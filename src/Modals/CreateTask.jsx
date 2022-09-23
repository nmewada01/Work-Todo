import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Editable,
  EditablePreview,
  EditableTextarea,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createTask, getTasks } from "../Redux/AppReducer/action";

const initialState = {
  title: "",
  description: "Default Description",
  task_status: "todo",
  tags: ["Others"],
  subTasks: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "title":
      return {
        ...state,
        title: action.payload,
      };

    case "description":
      return {
        ...state,
        description: action.payload,
      };
    case "task_status":
      return {
        ...state,
        task_status: action.payload,
      };
    case "tags":
      return {
        ...state,
        tags: action.payload,
      };
    default:
      return state;
  }
};

const CreateTask = ({ isOpen, onClose }) => {
  const [state, setState] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const tagList = useSelector((state) => state.AppReducer.tags);
  const navigate = useNavigate();
  const location = useLocation();

  const createTaskHandler = () => {
    //api call to add the new task
    dispatch(createTask(state))
      .then(() => dispatch(getTasks()))
      .then(() => {
        if (location.pathname !== "/") {
          navigate("/");
          onClose();
        } else {
          onClose();
        }
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Title */}
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              value={state.title}
              onChange={(e) =>
                setState({ type: "title", payload: e.target.value })
              }
              placeholder="
                Title"
            />
          </FormControl>

          {/* Description */}
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Editable minHeight="65px" defaultValue={state.description}>
              <EditablePreview />
              <EditableTextarea
                value={state.description}
                onChange={(e) =>
                  setState({ type: "description", payload: e.target.value })
                }
              />
            </Editable>
          </FormControl>

          {/* Task Status */}
          <Box mb="0.5rem">
            <FormLabel>Task Status</FormLabel>
            <Select
              placeholder="Select status"
              value={state.task_status}
              onChange={(e) =>
                setState({ type: "task_status", payload: e.target.value })
              }
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In-Progress</option>
              <option value="done">Done</option>
            </Select>
          </Box>

          {/* Tags */}
          <Box mb="0.5rem">
            <FormLabel>Tags</FormLabel>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Select Tags
              </MenuButton>
              <MenuList>
                <MenuOptionGroup
                  title="Tags"
                  type="checkbox"
                  value={state.tags}
                  onChange={(value) =>
                    setState({ type: "tags", payload: value })
                  }
                >
                  {tagList.length > 0 &&
                    tagList.map((item) => {
                      return (
                        <MenuItemOption value={item.tag} key={item.tag}>
                          {item.tag}
                        </MenuItemOption>
                      );
                    })}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={createTaskHandler}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateTask;
