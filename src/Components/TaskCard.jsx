import { EditIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getTasks, updateSubtasksList } from "../Redux/AppReducer/action";

const TaskCard = ({ id, title, description, tags, subTasks, colorScheme }) => {
  const dispatch = useDispatch();
  const [checkbox, setCheckBox] = useState(() => {
    let data = subTasks
      .filter((item) => {
        return item.status && item.subTaskTitle;
      })
      .map((item) => item.subTaskTitle);
    return data;
  });

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

  return (
    <Box
      width="90%"
      boxShadow="0px 10px 15px -3px rgba(0,0,0,0.1)"
      margin="0.5rem auto 1rem"
      padding="10px"
    >
      <Flex justifyContent="space-between">
        <Text>{title}</Text>
        <Link to={`/task/${id}`}>
          <EditIcon />
        </Link>
      </Flex>
      <Box>
        <Stack direction="row">
          {tags.length &&
            tags.map((item, index) => {
              return (
                <Badge key={index} colorScheme={colorScheme}>
                  {item}
                </Badge>
              );
            })}
        </Stack>
      </Box>
      <Text>{description}</Text>
      <Box>
        <CheckboxGroup
          value={checkbox}
          onChange={(value) => {
            setCheckBox(value);
            updateSubTaskStatus(value);
          }}
        >
          {subTasks.length > 0 &&
            subTasks.map((item, index) => (
              <Checkbox key={index} value={item.subTaskTitle}>
                {item.subTaskTitle}
              </Checkbox>
            ))}
        </CheckboxGroup>
      </Box>
    </Box>
  );
};

export default TaskCard;
