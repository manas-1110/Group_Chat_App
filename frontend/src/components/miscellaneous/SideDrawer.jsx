import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Badge,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Input,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    Tooltip,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../context/chatProvider";
import ProfileModal from "./profileModal";
import { useHistory } from "react-router-dom/";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/userListItem";
import { Spinner } from "@chakra-ui/spinner";
import axios from "axios";
import { getSender } from "../../config/chatLogics";

const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const {
        setSelectedChat,
        user,
        chats,
        setChats,
        notification,
        setNotification,
    } = ChatState();

    const toast = useToast();

    const history = useHistory();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
    };

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(
                `https://group-chat-app-vnh5.vercel.app/api/user?search=${search}`,
                config
            );

            // console.log("inside search");

            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            // console.log(error);
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    const accessChat = async (userId) => {
        console.log(userId);

        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(
                `https://group-chat-app-vnh5.vercel.app/api/chats`,
                { userId },
                config
            );

            if (!chats.find((c) => c._id === data._id))
                setChats([data, ...chats]);

            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            console.log(error);
            toast({
                title: "Error fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
                borderWidth="5px"
            >
                <Tooltip
                    label="Search users to chat"
                    hasArrow
                    placement="bottom-end"
                >
                    <Button variant="ghost" onClick={onOpen}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <Text display={{ base: "none", md: "flex" }} px="4">
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                <Text fontSize="2xl" fontFamily="Work Sans">
                    Chat-App
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <Box position="relative" display="inline-block">
                                <BellIcon fontSize="2xl" m={1} />
                                {notification.length > 0 && (
                                    <Badge
                                        position="absolute"
                                        top="-1px"
                                        right="-1px"
                                        borderRadius="full"
                                        bg="red.500"
                                        color="white"
                                        fontSize="0.4em"
                                        px={2}
                                        py={1}
                                    >
                                        {notification.length}
                                    </Badge>
                                )}
                            </Box>
                        </MenuButton>
                        <MenuList pl={2}>
                            {!notification.length && "No New Messages"}
                            {notification.map((notif) => (
                                <MenuItem
                                    key={notif._id}
                                    onClick={() => {
                                        setSelectedChat(notif.chat);
                                        setNotification(
                                            notification.filter(
                                                (n) => n !== notif
                                            )
                                        );
                                    }}
                                >
                                    {notif.chat.isGroupChat
                                        ? `New Message in ${notif.chat.chatName}`
                                        : `New Message from ${getSender(
                                              user,
                                              notif.chat.users
                                          )}`}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <Avatar
                                size="sm"
                                cursor="pointer"
                                name={user.name}
                                src={user.pic}
                            />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>
                                Logout :/
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>

            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        Search Users
                    </DrawerHeader>
                    <DrawerBody>
                        <Box display="flex" pb={2}>
                            <Input
                                placeholder="Search by name or email"
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button onClick={handleSearch}>Go</Button>
                        </Box>
                        {loading ? (
                            <ChatLoading />
                        ) : (
                            searchResult?.map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => accessChat(user._id)}
                                />
                            ))
                        )}
                        {loadingChat && <Spinner ml="auto" display="flex" />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
    // return <div>SideDrawer</div>;
};

export default SideDrawer;
