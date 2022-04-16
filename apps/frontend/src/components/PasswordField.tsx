import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
  useColorModeValue,
  FormErrorMessage
} from '@chakra-ui/react';
import { Field, FormikErrors, FormikTouched } from 'formik';
import React from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const RefInput = ({ innerRef, ...props }: { innerRef: ((node: HTMLInputElement | null) => void) | null }) => {
  return (
    <Input ref={innerRef} {...props} />
  )
}

type InputTypes = {
  username: string,
  password: string;
} | {
  email: string,
  name: string,
  password: string,
}

interface IPasswordFieldProps<T> extends InputProps {
  errors: FormikErrors<T>;
  touched: FormikTouched<T>;
}

export const PasswordField = React.forwardRef<HTMLInputElement, IPasswordFieldProps<InputTypes>>((props, ref) => {
  const { isOpen, onToggle } = useDisclosure();
  const { errors, touched } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);

  const mergeRef = useMergeRefs(inputRef, ref);
  const onClickReveal = () => {
    onToggle()
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  }

  return (
    <FormControl isInvalid={!!errors.password && touched.password}>
      <FormLabel htmlFor="password">Password</FormLabel>
      <InputGroup>
        <InputRightElement>
          <IconButton
            variant="link"
            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Field
          as={RefInput}
          id="password"
          innerRef={mergeRef}
          name="password"
          type={isOpen ? 'text' : 'password'}
          autoComplete="current-password"
          required
          bg={useColorModeValue(undefined, 'RGBA(0, 0, 0, 0.16)')}
          validate={(value: any) => {
            let error;

            if (value.length < 6) {
              error = "Password must contain at least 6 characters";
            }

            return error;
          }}
          {...props}
        />
      </InputGroup>
      <FormErrorMessage>{errors.password}</FormErrorMessage>
    </FormControl>
  )
});

PasswordField.displayName = 'PasswordField';