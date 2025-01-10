import {
    Box,
    Container,
    Text,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import { px } from "framer-motion";
import React, { useEffect } from "react";
import Login from "../components/authentication/login";
import SignUp from "../components/authentication/signUp";
import { useHistory } from "react-router-dom";

const HomePage = () => {
    const history = useHistory();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if (user) history.push("/chats");
    }, [history]);

    return (
        <Container maxW="xl" centerContent>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={3}
                backgroundColor="blue.300"
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text
                    fontSize="5xl"
                    fontFamily="work sans"
                    color="black"
                    fontWeight="bold"
                >
                    Chat-App
                </Text>
            </Box>
            <Box
                backgroundColor="blue.300"
                width="100%"
                p={3}
                borderRadius="lg"
                borderWidth="1px"
                color="black"
            >
                <Tabs variant="soft-rounded">
                    <TabList mb="1em">
                        <Tab width="50%">Login</Tab>
                        <Tab width="50%">Sign Up!</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <SignUp />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
};

export default HomePage;
