import React from "react";
import { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleClick = () => setShow(!show);
    const history = useHistory();

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axiosInstance.post(
                "/api/user/login",
                { email, password },
                config
            );

            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            // setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/chats");
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response?.data?.message || error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };

    return (
        <div>
            <FormControl id="login-email" isRequired>
                <FormLabel>Mail-id</FormLabel>
                <Input
                    placeholder="Enter Your email-id"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="login-password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Enter Your Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login!
            </Button>
        </div>
    );
};

export default Login;
