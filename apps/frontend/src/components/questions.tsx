import {
    Box,
    Text,
    Button,
    Input, 
    Modal, 
    ModalOverlay, 
    ModalBody,
    ModalHeader,
    ModalContent,
    useDisclosure,  
    InputGroup,
    InputRightElement,
    Center,
    HStack
} from "@chakra-ui/react"

import { CheckIcon, Icon } from "@chakra-ui/icons"

import { RiEditLine } from "react-icons/ri"

import { useState } from "react"
import { Field, Formik } from "formik";

function AskQuestionModal({ question, answer }: {question: string, answer: string}) {
    const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen:true});

    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");

    function submit() {
        if (value === answer) {
            onClose();
        } else {
            onClose();
            setOpen(true);
        }
    }

    return (
        <>
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
                        value={value}
                        onKeyPress={(e) => e.key === "enter" && submit()}
                        onChange={(e) => setValue(e.target.value)} 
                    />
                    <Button onClick={submit} margin={2} colorScheme='blue' width="80%">
                        Submit
                    </Button>
                </ModalBody>

                </ModalContent>
            </Modal>
            <RewriteModal question={question} answer={answer} response={value} open={open} setOpen={setOpen} />
        </>
    )
}

function RewriteModal({ question, answer, response, open, setOpen }: { question: string, answer: string, response:string, open: boolean, setOpen: any }) {
    function isCorrect(inp: string) {
        return inp === answer;
    }

    function checkCorrect(values: {
        i1: string,
        i2: string,
        i3: string
    }, e: any) {
        if (Object.entries(values).reduce((prev, cur) => {
            if (!prev) return false;
            if (cur[0] === e.target.name) {
                return e.target.value === answer;
            } else if (cur[1] === answer) {
                return true;
            } else {
                return false;
            }
        }, true)) {
            setOpen(false);
        }
    }

    return (
      <>
        <Modal size={"xl"} closeOnEsc={false} closeOnOverlayClick={false} isOpen={open} onClose={() => void(0)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize={30}>{question}</ModalHeader>
            <ModalBody>
                <Box margin={5}>
                    <Center>
                        <HStack spacing={1}>
                            <Text>Correct answer: </Text>
                            <Text color="green.500">{answer}</Text>
                        </HStack>
                    </Center>
                    <Center>
                        <HStack spacing={1}>
                            <Text>You wrote: </Text>
                            <Text color="red.500">{response}</Text>
                        </HStack>
                    </Center>
                </Box>
                <Formik
                    initialValues={{
                        "i1": "",
                        "i2": "",
                        "i3": ""
                    }}
                    onSubmit={() => void(0)}
                >
                    {({ handleChange, values }) => (
                        <>
                            <InputGroup margin="auto" width={"80%"} size='lg' fontSize="25" textAlign="center" marginBottom={1} >
                                <Field as={Input} onChange={(e: any) => [handleChange(e), checkCorrect(values, e)]} value={values.i1} name="i1" placeholder='rewrite' fontSize="25" textAlign={"center"} />
                                <InputRightElement>{<Icon as={isCorrect(values.i1) ? CheckIcon : RiEditLine} color={isCorrect(values.i1) ? "green.500" : "yellow.500" } />}</InputRightElement>
                            </InputGroup>

                            <InputGroup margin="auto" width={"80%"} size='lg' fontSize="25" textAlign="center" marginBottom={1} >
                                <Field as={Input} onChange={(e: any) => [handleChange(e), checkCorrect(values, e)]} value={values.i2} name="i2" placeholder='rewrite' fontSize="25" textAlign={"center"} />
                                <InputRightElement>{<Icon as={isCorrect(values.i2) ? CheckIcon : RiEditLine } color={isCorrect(values.i2) ? "green.500" : "yellow.500" } />}</InputRightElement>
                            </InputGroup>

                            <InputGroup margin="auto" width={"80%"} size='lg' fontSize="25" textAlign="center" marginBottom={1} >
                                <Field as={Input} onChange={(e: any) => [handleChange(e), checkCorrect(values, e)]} value={values.i3} name="i3" placeholder='rewrite' fontSize="25" textAlign={"center"} />
                                <InputRightElement>{<Icon as={isCorrect(values.i3) ? CheckIcon : RiEditLine } color={isCorrect(values.i3) ? "green.500" : "yellow.500" } />}</InputRightElement>
                            </InputGroup>
                        </>
                    )}
                </Formik>
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