import { 
  Box, 
  List,
  ListItem,
  ListIcon,  
} from "@chakra-ui/react";

import {MdCheckCircle, MdSettings, MdOutlineCreateNewFolder} from "react-icons/md"

import {BsFillLightningChargeFill} from "react-icons/bs"
import {FiCheckCircle} from "react-icons/fi"
import {AiOutlinePlayCircle} from "react-icons/ai"
import {BiBrain} from "react-icons/bi"

import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react"

function FadeIn({ children }) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.4 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 }
      }}
    >
      {children}
    </motion.div>
  )
} 

export default function Section2() {

  return (
      <>
          <Box height="90vh" width="50%" margin="auto" textAlign={"left"}>

          <List spacing={20} fontSize="50">
              <FadeIn>
                  <ListItem>
                      <ListIcon as={MdOutlineCreateNewFolder} fontSize="80" color='blue.500' marginRight={6} />
                      Easily create or import study sets
                  </ListItem>
              </FadeIn>
              <FadeIn>
                  <ListItem>
                      <ListIcon as={BsFillLightningChargeFill} fontSize="80" color='blue.500' marginRight={6} />
                      5 different game modes
                  </ListItem>
              </FadeIn>
              <FadeIn>
                  <ListItem>
                      <ListIcon as={FiCheckCircle} fontSize="80" color='blue.500' marginRight={6} />
                      Make sure you know the right answer
                  </ListItem >
              </FadeIn>
              <FadeIn>
                  <ListItem>
                      <ListIcon as={AiOutlinePlayCircle} fontSize="80" color='blue.500' marginRight={6} />
                      Play, learn, and have fun
                  </ListItem>
              </FadeIn>
              <FadeIn>
                  <ListItem>
                      <ListIcon as={BiBrain} fontSize="80" color='blue.500' marginRight={6} />
                      Studying done right!
                  </ListItem>
              </FadeIn>
          </List>

          </Box>
      </>
  )

}