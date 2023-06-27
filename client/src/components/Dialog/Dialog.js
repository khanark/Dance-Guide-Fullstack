import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react';

import { useRef } from 'react';

const Dialog = ({ title, body, actionTitle, actionHandler, disclosure }) => {
    const cancelRef = useRef();

    return (
        <>
            <AlertDialog
                isOpen={disclosure.isOpen}
                leastDestructiveRef={cancelRef}
                onClose={disclosure.onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {title}
                        </AlertDialogHeader>

                        <AlertDialogBody>{body}</AlertDialogBody>

                        <AlertDialogFooter>
                            <Button
                                ref={cancelRef}
                                onClick={disclosure.onClose}
                            >
                                Назад
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={actionHandler}
                                ml={3}
                            >
                                {actionTitle}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default Dialog;
