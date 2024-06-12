import React, { useRef, useState } from "react";
import { Box, Button, Container, HStack, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Slider, SliderFilledTrack, SliderThumb, SliderTrack, useDisclosure, VStack } from "@chakra-ui/react";
import { FaCog } from "react-icons/fa";

const Index = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!drawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    const context = canvasRef.current.getContext("2d");
    context.closePath();
    setDrawing(false);
  };

  return (
    <Container maxW="full" height="100vh" p={0} m={0} centerContent>
      <Box position="relative" width="100%" height="100%">
        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          style={{ border: "1px solid #000", display: "block" }}
        />
        <IconButton
          icon={<FaCog />}
          position="absolute"
          top={4}
          right={4}
          onClick={onOpen}
          aria-label="Settings"
        />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <HStack>
                <label htmlFor="colorPicker">Brush Color:</label>
                <input
                  type="color"
                  id="colorPicker"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </HStack>
              <HStack>
                <label htmlFor="brushSize">Brush Size:</label>
                <Slider
                  id="brushSize"
                  defaultValue={brushSize}
                  min={1}
                  max={50}
                  onChange={(val) => setBrushSize(val)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </HStack>
            </VStack>
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