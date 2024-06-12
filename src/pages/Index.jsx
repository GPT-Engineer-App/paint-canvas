import React, { useRef, useState } from "react";
import { Container, VStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box, IconButton } from "@chakra-ui/react";
import { SketchPicker } from "react-color";
import { FaCog } from "react-icons/fa";

const Index = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    canvas.addEventListener("mousemove", draw);
  };

  const endDrawing = () => {
    const canvas = canvasRef.current;
    canvas.removeEventListener("mousemove", draw);
  };

  const draw = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  };

  return (
    <Container centerContent maxW="container.xl" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%" height="100%">
        <Box position="relative" width="100%" height="100%">
          <canvas
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={startDrawing}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
            style={{ border: "1px solid #000", cursor: "crosshair" }}
          />
          <IconButton
            aria-label="Settings"
            icon={<FaCog />}
            size="lg"
            position="absolute"
            top="10px"
            right="10px"
            onClick={onOpen}
          />
        </Box>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={4}>
              <SketchPicker color={color} onChangeComplete={(color) => setColor(color.hex)} />
            </Box>
            <Box>
              <Slider aria-label="brush-size-slider" defaultValue={brushSize} min={1} max={50} onChange={(val) => setBrushSize(val)}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;