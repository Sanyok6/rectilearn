import { Box, List, ListItem, ListIcon } from "@chakra-ui/react";

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
      <Box height="95vh" width={{ base: "80%", sm: "50%" }} margin="auto" textAlign={"left"}>
        <List spacing={20} fontSize={{ base: "15", sm: "50"}}>
          <FadeIn>
            <ListItem>
              <ListIcon
                as={MdOutlineCreateNewFolder}
                fontSize={{ base: "60", sm: "80" }}
                color="blue.500"
                marginRight={6}
              />
              Easily create or import study sets
            </ListItem>
          </FadeIn>
          <FadeIn>
            <ListItem>
              <ListIcon
                as={BsFillLightningChargeFill}
                fontSize="80"
                color="blue.500"
                marginRight={6}
              />
              5 different game modes
            </ListItem>
          </FadeIn>
          <FadeIn>
            <ListItem>
              <ListIcon
                as={FiCheckCircle}
                fontSize="80"
                color="blue.500"
                marginRight={6}
              />
              Make sure you know the right answer
            </ListItem>
          </FadeIn>
          <FadeIn>
            <ListItem>
              <ListIcon
                as={AiOutlinePlayCircle}
                fontSize="80"
                color="blue.500"
                marginRight={6}
              />
              Play, learn, and have fun
            </ListItem>
          </FadeIn>
          <FadeIn>
            <ListItem>
              <ListIcon
                as={BiBrain}
                fontSize="80"
                color="blue.500"
                marginRight={6}
              />
              Studying done right!
            </ListItem>
          </FadeIn>
        </List>
      </Box>
    </>
  );
}
