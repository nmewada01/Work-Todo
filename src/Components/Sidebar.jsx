import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getTagsList } from "../Redux/AppReducer/action";
import Profile from "./Profile";

const Sidebar = () => {
  const dispatch = useDispatch();
  const tagLists = useSelector((state) => state.AppReducer.tags);
  const tasks = useSelector((state) => state.AppReducer.tasks);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTags, setSelectedTags] = useState(
    searchParams.getAll("tags") || []
  );
  const navigate = useNavigate();

  const logoutHandler = () => {
    new Promise((res, rej) => {
      res(localStorage.removeItem("token"));
    }).then(() => {
      navigate("/login");
    });
  };

  const handleTagChange = (value) => {
    //if the tag is selected remove it, else add it.
    let newTags = [...selectedTags];
    if (selectedTags.includes(value)) {
      newTags.splice(newTags.indexOf(value), 1);
    } else {
      newTags.push(value);
    }
    setSelectedTags(newTags);
    setSearchParams({ tags: newTags });
  };

  useEffect(() => {
    if (tagLists.length === 0) {
      dispatch(getTagsList());
    }
  }, [dispatch, tagLists.length]);

  return (
    <Box
      border="1px solid rgba(255,255,255,1)"
      width="250px"
      height="95vh"
      marginTop="1rem"
      padding="0.25rem"
      borderRadius="5px"
    >
      <Flex direction="column" height="inherit">
        <Box height="15%" border="1px solid rgba(0,0,0,0.1)" borderRadius="5px">
          {/* userprofile */}
          <Profile />
        </Box>
        <Flex justify="center" margin="0.25rem 0">
          <Button  color="navy" width="100%">Create New Task</Button>
        </Flex>
        <Box minHeight="70%" overflow="auto">
          <Flex direction="column" gap="5px">
            <Box
              boxShadow="0px 10px 15px -3px rgba(0,0,0,0.1)"
              padding="5px 0px"
              borderRadius="5px"
              cursor="pointer"
              onClick={() => {
                handleTagChange("All");
              }}
              backgroundColor={
                selectedTags.includes("All") ? "blue.400" : "blue.100"
              }
              color={selectedTags.includes("All") ? "white" : "black"}
            >
              <Flex padding="0 10px">
                <Text>All</Text>
                <Text marginLeft="auto">{tasks.length}</Text>
              </Flex>
            </Box>
            {tagLists.length > 0 &&
              tagLists.map((tagObj) => {
                return (
                  <Box
                    key={tagObj.id}
                    boxShadow="0px 10px 15px -3px rgba(0,0,0,0.1)"
                    padding="5px 0px"
                    cursor="pointer"
                    borderRadius="5px"
                    onClick={() => {
                      handleTagChange(tagObj.tag);
                    }}
                    backgroundColor={
                      selectedTags.includes(tagObj.tag)
                        ? "purple.400"
                        : "purple.100"
                    }
                    color={
                      selectedTags.includes(tagObj.tag) ? "white" : "black"
                    }
                  >
                    <Flex padding="0 10px">
                      <Text>{tagObj.tag}</Text>
                      <Text marginLeft="auto">
                        {
                          tasks.filter((item) => item.tags.includes(tagObj.tag))
                            .length
                        }
                      </Text>
                    </Flex>
                  </Box>
                );
              })}
          </Flex>
        </Box>
        <Box height="10vh">
          <Button color="navy" width="100%" onClick={logoutHandler}>
            LOGOUT
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;
