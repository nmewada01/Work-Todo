import React, { useReducer } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Editable,
  EditablePreview,
  EditableTextarea,
  Divider,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../Redux/AuthReducer/action";

const initialState = {
  name: "",
  email: "",
  password: "",
  username: "",
  mobile: 0,
  description: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "description":
      return { ...state, description: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "username":
      return { ...state, username: action.payload };
    case "mobile":
      return { ...state, mobile: action.payload };

    default:
      return state;
  }
};

const Signup = () => {
  const [state, setState] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupHandle = () => {
    dispatch(register(state)).then((r) => {
      navigate("/login", { replace: true });
    });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          boxShadow={"lg"}
          p={8}
          color={"white"}
          borderRadius={"2rem"}
          bg={"#436c89"}
        >
       
          <Stack align={"center"} >
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
          </Stack>
          <Divider/>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="Name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    value={state.name}
                    onChange={(e) =>
                      setState({ type: "name", payload: e.target.value })
                    }
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="username" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    value={state.username}
                    onChange={(e) =>
                      setState({ type: "username", payload: e.target.value })
                    }
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={state.email}
                onChange={(e) =>
                  setState({ type: "email", payload: e.target.value })
                }
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                type={"password"}
                <Input
                  value={state.password}
                  onChange={(e) =>
                    setState({ type: "password", payload: e.target.value })
                  }
                />
                <InputRightElement h={"full"}>
                  <Button variant={"ghost"}>
                    <ViewIcon />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Box>
              <FormControl id="mobile" isRequired>
                <FormLabel>Mobile</FormLabel>
                <Input
                  type="number"
                  value={state.mobile}
                  onChange={(e) =>
                    setState({ type: "mobile", payload: e.target.value })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <Editable defaultValue="Description">
                <EditablePreview />
                <EditableTextarea
                  value={state.description}
                  onChange={(e) =>
                    setState({ type: "description", payload: e.target.value })
                  }
                />
              </Editable>
            </Box>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"#e4e7e4"}
                color={"black"}
                _hover={{
                  bg: "white",
                }}
                onClick={signupHandle}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <RouterLink to="/login" color={"blue.400"}>
                  Login
                </RouterLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signup;
