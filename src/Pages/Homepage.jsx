import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import TaskCard from "../Components/TaskCard";
import { getTasks } from "../Redux/AppReducer/action";

const Homepage = () => {
  const tasks = useSelector((state) => state.AppReducer.tasks);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const filterByParamTags = (task) => {
    //to filter out the tags that we have based on the params
    const tagsInTheParams = searchParams.getAll("tags");
    if (tagsInTheParams.includes("All") || tagsInTheParams.length === 0) {
      return task;
    }
    const data = task.tags.filter((tag) => {
      if (tagsInTheParams.includes(tag)) {
        return true;
      }
      return false;
    });

    if (data.length) {
      return task;
    }

    return false;
  };

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(getTasks());
    }
  }, [dispatch, tasks.length]);

  return (
    <Box width="100%" paddingTop="1rem" bg={"#436c89"}>
      <Flex justifyContent="space-around">
        {/* Todo */}
        <Box
          border="1px solid rgba(255,255,255,1)"
          borderRadius="5px"
          width="32%"
          height="95vh"
          overflow="auto"
          color="whitesmoke"
        >
          <Box bgImage="linear-gradient(#56ab2f,#a8e063)" position="sticky" top="0" zIndex="1">
            <Text textAlign="center" fontWeight="bold">
              TODO
            </Text>
          </Box>
          {/* todo tasks */}
          {tasks.length > 0 &&
            tasks
              .filter((item) => item.task_status === "todo")
              .filter(filterByParamTags)
              .map((item) => {
                return <TaskCard key={item.id} {...item} colorScheme="green" />;
              })}
        </Box>

        {/* in-progress */}

        <Box
          border="1px solid rgba(255,255,255,1)"
          width="32%"
          borderRadius="5px"
          height="95vh"
          overflow="auto"
          color="whitesmoke"
        >
          <Box
            backgroundColor="yellow.700"
            position="sticky"
            top="0"
            zIndex="1"
          >
            <Text textAlign="center" fontWeight="bold">
              IN-PROGRESS
            </Text>
          </Box>
          {/* in-progress tasks */}
          {tasks.length > 0 &&
            tasks
              .filter((item) => item.task_status === "in-progress")
              .filter(filterByParamTags)
              .map((item) => {
                return (
                  <TaskCard key={item.id} {...item} colorScheme="yellow" />
                );
              })}
        </Box>

        {/* Done */}

        <Box
          border="1px solid rgba(255,255,255,1)"
          width="32%"
          height="95vh"
          borderRadius="5px"
          overflow="auto"
          color="whitesmoke"
        >
          <Box bgImage="linear-gradient(#606c88,#004e92)" position="sticky" top="0" zIndex="1">
            <Text textAlign="center" fontWeight="bold">
              DONE
            </Text>
          </Box>
          {/* done tasks */}
          {tasks.length > 0 &&
            tasks
              .filter((item) => item.task_status === "done")
              .filter(filterByParamTags)
              .map((item) => {
                return <TaskCard key={item.id} {...item} colorScheme="blue" />;
              })}
        </Box>
      </Flex>
    </Box>
  );
};

export default Homepage;
