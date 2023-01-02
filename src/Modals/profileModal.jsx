import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";

export function ProfileModal({ profileData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button color="navy" variant="link" onClick={onOpen}>
        View Profile
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>
              Name :{profileData.length !== 0 ? profileData.name : ""}
            </Text>
            <Text>
              UserName :{profileData.length !== 0 ? profileData.username : ""}
            </Text>
            <Text>
              Email :{profileData.length !== 0 ? profileData.email : ""}
            </Text>
            <Text>
              Mobile No :{profileData.length !== 0 ? profileData.mobile : ""}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Image
                src={
                  profileData?.length !== 0
                    ? profileData.description
                    : "https://img.icons8.com/fluency/2x/microsoft-todo-2019.png"
                }
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
