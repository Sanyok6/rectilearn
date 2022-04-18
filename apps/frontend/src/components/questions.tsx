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
    InputGroup,
    InputRightElement,
    Center,
    HStack,
    chakra
} from "@chakra-ui/react"

import { CheckIcon, Icon } from "@chakra-ui/icons"

import { RiEditLine } from "react-icons/ri"

import { useState } from "react"
import { Field, Formik } from "formik";
import { StudySetQuestion } from "./Dashboard/Card";

const InputGroupExt = chakra(InputGroup, {
    baseStyle: {
        margin: "auto",
        width: "80%",
        size: "lg",
        fontSize: "25",
        textAlign: "center",
        marginBottom: 1
    }
})


function AskQuestionModal({ newQ, question, answers, isOpen, questionOpen, setOpen, value, setValue }: { newQ: () => void, question: string, answers: string[], isOpen: boolean, questionOpen: any, setOpen: any, value: any, setValue: any }) {
    function submit() {
        if (answers.map((i) => i.toLowerCase()).includes(value.toLowerCase().trim())) {
            newQ();
            setValue("");
            questionOpen(false);
        } else {
            questionOpen(false);
            setOpen(true);
        }
    }

    return (
        <>

            <Modal size={"xl"} closeOnEsc={false} closeOnOverlayClick={false} isOpen={isOpen}  onClose={() => void(0)}>
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
                        onKeyPress={(e) => e.key === "Enter" && submit()}
                        onChange={(e) => setValue(e.target.value)} 
                        autoComplete={"off"}
                    />
                    <Button onClick={submit} margin={2} colorScheme='blue' width="80%">
                        Submit
                    </Button>
                </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
}

function RewriteModal({ newQ, question, answers, response, open, setOpen, setValue }: { newQ: () => void, question: string, answers: string[], response:string, open: boolean, setOpen: any, setValue: any }) {
    function isCorrect(inp: string) {
        const answersLowerCase = answers.map((i) => i.toLowerCase());
        return answersLowerCase.includes(inp.toLowerCase().trim());
    }

    function checkCorrect(values: {
        i1: string,
        i2: string,
        i3: string
    }, e: any) {
        if (Object.entries(values).reduce((prev, cur) => {
            if (!prev) return false;
            if (cur[0] === e.target.name) {
                return isCorrect(e.target.value);
            } else if (answers.map((i) => i.toLowerCase()).includes(cur[1].trim().toLowerCase())) {
                return true;
            } else {
                return false;
            }
        }, true)) {
            newQ();
            setValue("");
            setOpen(false);
        }
    }

    return (
      <>
        <Modal size={"xl"} closeOnEsc={false} closeOnOverlayClick={false} isOpen={open} onClose={() => void(0)} >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize={30}>{question}</ModalHeader>
            <ModalBody>
                <Box margin={5}>
                    <Center>
                        <HStack spacing={1}>
                            <Text>Correct answers: </Text>
                            <Text color="green.500">{answers.join(", ")}</Text>
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
                            {
                                [["i1", values.i1], ["i2", values.i2], ["i3", values.i3]].map((i, ind) => (
                                    <InputGroupExt key={ind}>
                                        <Field as={Input} onChange={(e: any) => [handleChange(e), checkCorrect(values, e)]} value={i[1]} name={i[0]} placeholder='rewrite' fontSize="25" textAlign={"center"} autoComplete={"off"} />
                                        <InputRightElement>{<Icon as={isCorrect(i[1]) ? CheckIcon : RiEditLine} color={isCorrect(i[1]) ? "green.500" : "yellow.500" } />}</InputRightElement>
                                    </InputGroupExt>
                                ))
                            }
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

export default function Questions({ questions, open, isOpen }: { questions: any[], open: boolean, isOpen: any }) {
    const [question, setQ] = useState<StudySetQuestion>(questions[Math.floor(Math.random() * questions.length)]);
    const [op, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");
    function newQ() {
        setQ(questions[Math.floor(Math.random() * questions.length)]);
    }
    return (
        <>
            <AskQuestionModal newQ={newQ} question={question.question} answers={question.answers} isOpen={open} questionOpen={isOpen} setOpen={setOpen} value={value} setValue={setValue} />
            <RewriteModal newQ={newQ} question={question.question} answers={question.answers} response={value} open={op} setOpen={setOpen} setValue={setValue} />
        </>
    )
}