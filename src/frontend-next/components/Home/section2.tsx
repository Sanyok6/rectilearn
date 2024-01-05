"use client";

import { Box, List, ListItem, ListIcon, Flex, useColorModeValue } from "@chakra-ui/react";
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
      <div style={{
        width: "100%",
        overflow: "hidden",
        lineHeight: 0,
        transform: "rotate(180deg)",
        marginBottom: "-1px"
      }}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" style={{fill: useColorModeValue("#95c2ea", "#1c5f97")}}></path>
        </svg>
      </div>

      <Box bg={useColorModeValue("#95c2ea", "#1c5f97")}>
        <Box width={{ base: "80%", sm: "50%" }} margin="auto" textAlign={"left"} pb="40" pt="20">
          <List spacing={20} fontSize={{ base: "15", sm: "50"}} display="flex" flexDir="column" flexWrap="wrap" height="100%">
            <FadeIn>
              <ListItem>
                <Flex flexDir="row" alignItems={"center"}>
                  <ListIcon
                    as={MdOutlineCreateNewFolder}
                    fontSize={{ base: "50", sm: "80" }}
                    color="orange.500"
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
                    color="yellow.500"
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
                    color="green.500"
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
                    color={"blue.400"}
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
                    color="purple.400"
                    marginRight={6}
                  />
                  Studying done right!
                </Flex>
              </ListItem>
            </FadeIn>
          </List>
        </Box>
        <div style={{
          position: "absolute",
          width: "100%",
          overflow: "hidden",
          lineHeight: 0,
        }}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" height="100" width={"100%"}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" style={{fill: useColorModeValue("#95c2ea", "#1c5f97")}}></path>
        </svg>
        </div>
      </Box>
    </>
  );
}
