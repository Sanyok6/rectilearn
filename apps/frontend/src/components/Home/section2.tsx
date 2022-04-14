import { Box, List, ListItem, ListIcon, Flex, Text } from "@chakra-ui/react";

import {
  MdOutlineCreateNewFolder,
} from "react-icons/md";

import { BsFillLightningChargeFill } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { BiBrain } from "react-icons/bi";

import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

function FadeIn({ children }: { children: any }) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.4 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 },
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Section2() {
  return (
    <>
      <Box height={{ base: "60vh", sm: "90vh" }} width={{ base: "75%", sm: "50%" }} margin="auto" textAlign={"left"}>
        <List spacing={{ base: 10, sm: 20 }} fontSize={{ base: "15", sm: "50"}}>
          <FadeIn>
            <ListItem>
              <Flex align={"center"}>
                <ListIcon
                  as={MdOutlineCreateNewFolder}
                  fontSize={{ base: "50", sm: "80" }}
                  color="blue.500"
                  marginRight={6}
                />
                <Text>
                  Easily create or import study sets
                </Text>
              </Flex>
            </ListItem>
          </FadeIn>
          <FadeIn>
            <ListItem>
              <Flex align="center">
                <ListIcon
                  as={BsFillLightningChargeFill}
                  fontSize={{ base: "50", sm: "80" }}
                  color="blue.500"
                  marginRight={6}
                />
                <Text>
                  5 different game modes
                </Text>
              </Flex>
            </ListItem>
          </FadeIn>
          <FadeIn>
            <ListItem>
              <Flex align="center">
                <ListIcon
                  as={FiCheckCircle}
                  fontSize={{ base: "50", sm: "80" }}
                  color="blue.500"
                  marginRight={6}
                />
                <Text>Make sure you know the right answer</Text>
              </Flex>
            </ListItem>
          </FadeIn>
          <FadeIn>
            <ListItem>
              <Flex align="center">
                <ListIcon
                  as={AiOutlinePlayCircle}
                  fontSize={{ base: "50", sm: "80" }}
                  color="blue.500"
                  marginRight={6}
                />
                <Text>Play, learn, and have fun</Text>
              </Flex>
            </ListItem>
          </FadeIn>
          <FadeIn>
            <ListItem>
              <Flex align="center">  
                <ListIcon
                  as={BiBrain}
                  fontSize={{ base: "50", sm: "80" }}
                  color="blue.500"
                  marginRight={6}
                />
                <Text>Studying done right!</Text>
              </Flex>
            </ListItem>
          </FadeIn>
        </List>
      </Box>
    </>
  );
}
