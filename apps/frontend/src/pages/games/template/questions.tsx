import {
    Box,
    Text,
    Button,
    Input, 
    Modal, 
    ModalOverlay, 
    ModalBody,
    ModalHeader, 
    ModalFooter,
    ModalContent,
    useDisclosure,  
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react"

import { CheckIcon, EditIcon, Icon } from "@chakra-ui/icons"

import { RiEditLine } from "react-icons/ri"

import { useState } from "react"

function AskQuestionModal({ question, answer }: {question: string, answer: string}) {
    const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen:true})

    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>("")

    function keyPress(event) {
        if (event.key == "Enter") {
            submit()
        }
    }

    function submit() {
        if (value == answer) {
            onClose()
        } else {
            onClose()
            setOpen(true)
        }
    }

    return (
        <>
        <Button onClick={onOpen}>Open Modal</Button>

        <Modal size={"xl"} closeOnEsc={false} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader fontSize={30}>{question}</ModalHeader>

            <ModalBody>
                <Input 
                    placeholder='answer' 
                    size='lg' 
                    width={"80%"} 
                    fontSize="25"
                    textAlign="center"
                    id="ans"
                    onKeyUp={keyPress}
                    onChange={(e) => setValue(e.target.value)} 
                />
                <Button onClick={submit} margin={2} colorScheme='blue' width="80%">
                    Submit
                </Button>
            </ModalBody>

            </ModalContent>
        </Modal>
        <RewriteModal question={question} answer={answer} response={value} open={open} />
        </>
    )
}

function RewriteModal({ question, answer, response, open }: {question:string, answer: string, response:string, open: boolean}) {
    const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen:open})
    
    // var right = [false, false, false]
    const [right1, setRight1] = useState<boolean>(false)
    const [right2, setRight2] = useState<boolean>(false)
    const [right3, setRight3] = useState<boolean>(false)

    const states = [setRight1, setRight2, setRight3]


    const [value1, setValue1] = useState<string>("")
    const [value2, setValue2] = useState<string>("")
    const [value3, setValue3] = useState<string>("")

    const values = [value1, value2, value3]


    function check() {
        var correct = true //until its not!

        for (let i = 0; i < 3; i++) {
            const input = document.getElementById("i"+i)


            if (values[i] == answer) {
                
                states[i](true)

                input.disabled = true
            } else {
                correct = false
            }
        }
        if (correct) { 
            setTimeout(() => {
                onClose()
            }, 0.5);
        } 
    }
  
    return (
      <>
        <Modal id="modal" size={"xl"} closeOnEsc={false} closeOnOverlayClick={false} isOpen={open} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize={30}>{question}</ModalHeader>
  
            <ModalBody>

                <Box margin={5}>
                    <Text>Correct answer: {answer}</Text>
                    <Text>You wrote: {response}</Text>
                </Box>
                <Box id="rewriteBox" onKeyUp={check}>
                    <InputGroup margin="auto" width={"80%"} size='lg' fontSize="25" textAlign="center" marginBottom={1} >
                        <Input onChange={(e) => setValue1(e.target.value)}  onClick={onOpen} id="i0" placeholder='rewrite' fontSize="25" textAlign={"center"} />
                        <InputRightElement children={<Icon id="e0" as={right1 ? CheckIcon : RiEditLine } color={right1 ? "green.500" : "yellow.500" } />} />
                    </InputGroup>

                    <InputGroup margin="auto" width={"80%"} size='lg' fontSize="25" textAlign="center" marginBottom={1} >
                        <Input onChange={(e) => setValue2(e.target.value)} id="i1" placeholder='rewrite' fontSize="25" textAlign={"center"} />
                        <InputRightElement children={<Icon id="e1" as={right2 ? CheckIcon : RiEditLine } color={right2 ? "green.500" : "yellow.500" } />} />
                    </InputGroup>

                    <InputGroup margin="auto" width={"80%"} size='lg' fontSize="25" textAlign="center" marginBottom={1} >
                        <Input onChange={(e) => setValue3(e.target.value)} id="i2" placeholder='rewrite' fontSize="25" textAlign={"center"} />
                        <InputRightElement children={<Icon id="e2" as={right3 ? CheckIcon : RiEditLine } color={right3 ? "green.500" : "yellow.500" } />} />
                    </InputGroup>
                </Box>
                <Text margin={2}>rewrite three times to continue</Text>

            </ModalBody>

          </ModalContent>
        </Modal>
      </>
    )
}


export default function Questions() {

    return (
        <>
            <AskQuestionModal question="hello" answer="bonjour" />
            {/* <RewriteModal word="test" /> */}
        </>
    )

}