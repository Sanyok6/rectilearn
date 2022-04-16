import { Box, List, ListItem, ListIcon, Flex } from "@chakra-ui/react";
import {
  MdOutlineCreateNewFolder,
} from "react-icons/md";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { BiBrain } from "react-icons/bi";

import FadeIn from "./fadeIn"

export default function Section2() {
  return (
    <>
      <Box width={{ base: "80%", sm: "50%" }} margin="auto" textAlign={"left"} mb={10}>
        <List spacing={20} fontSize={{ base: "15", sm: "50"}} display="flex" flexDir="column" flexWrap="wrap" height="100%">
          <FadeIn>
            <ListItem>
              <Flex flexDir="row" alignItems={"center"}>
                <ListIcon
                  as={MdOutlineCreateNewFolder}
                  fontSize={{ base: "50", sm: "80" }}
                  color="blue.500"
                  marginRight={6}
                />
                Easily create or import study sets
              </Flex>
            </ListItem>
          </FadeIn>
          <FadeIn>
            <ListItem>
              <Flex flexDir="row" alignItems={"center"}>
                <ListIcon
                  as={BsFillLightningChargeFill}
                  fontSize={{ base: "50", sm: "80" }}
                  color="blue.500"
                  marginRight={6}
                />
                5 different game modes
              </Flex>
            </ListItem>
          </FadeIn>
          <FadeIn>
            <ListItem>
              <Flex flexDir="row" alignItems={"center"}>
                <ListIcon
                  as={FiCheckCircle}
                  fontSize={{ base: "50", sm: "80" }}
                  color="blue.500"
                  marginRight={6}
                />
                Make sure you know the right answer
              </Flex>
            </ListItem>
          </FadeIn>
          <FadeIn>
            <ListItem>
              <Flex flexDir="row" alignItems={"center"}>
                <ListIcon
                  as={AiOutlinePlayCircle}
                  fontSize={{ base: "50", sm: "80" }}
                  color="blue.500"
                  marginRight={6}
                />
                Play, learn, and have fun
              </Flex>
            </ListItem>
          </FadeIn>
          <FadeIn>
            <ListItem>
              <Flex flexDir="row" alignItems={"center"}>
                <ListIcon
                  as={BiBrain}
                  fontSize={{ base: "50", sm: "80" }}
                  color="blue.500"
                  marginRight={6}
                />
                Studying done right!
              </Flex>
            </ListItem>
          </FadeIn>
        </List>
      </Box>
    </>
  );
}
