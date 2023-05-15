import React, { Suspense } from 'react';
import {
  Textarea,
  Grid,
  GridItem,
  Button,
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import { makeRequest } from '../utils/request';
import { getSchema } from '../helpers/variables';

const Schema = React.lazy(() => import('./schema'));

export function EditorArea() {
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState('');
  const [variables, setVariables] = useState({});
  const [headers, setHeaders] = useState({});
  const [disabler, setDisabler] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onRequest = () => {
    getSchema();
    setDisabler(false);
  };

  const onSubmit = async () => {
    const resp = await makeRequest(request, variables, headers);
    setResponse(JSON.stringify(resp, null, '\t'));
  };

  return (
    <Grid gridTemplateColumns={'1fr 70px 1fr'} flexGrow={1}>
      <GridItem
        display={'flex'}
        flexDir={'column'}
        rowSpan={1}
        colSpan={1}
        height={'100%'}
        gap={2}
        px={2}
      >
        <Textarea height={'100%'} onChange={(e) => setRequest(e.target.value)} />
        <Accordion allowToggle>
          <AccordionItem>
            <Tabs isFitted variant="enclosed">
              <TabList pt={1}>
                <Tab>Variables</Tab>
                <Tab>Headers</Tab>
                <AccordionButton flex="0.1" justifyContent="center">
                  <AccordionIcon />
                </AccordionButton>
              </TabList>
              <AccordionPanel px={0}>
                <TabPanels>
                  <TabPanel p={0}>
                    <Textarea onChange={(e) => setVariables(JSON.parse(e.target.value))} />
                  </TabPanel>
                  <TabPanel p={0}>
                    <Textarea onChange={(e) => setHeaders(JSON.parse(e.target.value))} />
                  </TabPanel>
                </TabPanels>
              </AccordionPanel>
            </Tabs>
          </AccordionItem>
        </Accordion>
      </GridItem>
      <GridItem colStart={2} colEnd={3}>
        <Box>
          <Button my={2} colorScheme={'purple'} onClick={onSubmit}>
            ⯈
          </Button>
          <Button my={2} colorScheme={'purple'} onClick={onRequest} isDisabled={!disabler}>
            SDL
          </Button>
          <Button my={2} colorScheme={'purple'} onClick={onOpen} isDisabled={disabler}>
            🗎
          </Button>
          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent maxW={'lg'}>
              <DrawerCloseButton />
              <DrawerHeader>Docs</DrawerHeader>

              <DrawerBody>
                <Suspense
                  fallback={
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="green.300"
                      size="xl"
                    />
                  }
                >
                  <Schema />
                </Suspense>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      </GridItem>
      <GridItem rowStart={1} colStart={3} colEnd={4} rowSpan={1} px={2}>
        <Textarea readOnly height={'100%'} value={response} />
      </GridItem>
    </Grid>
  );
}
