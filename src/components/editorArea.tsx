import React, { Suspense, useState, useEffect } from 'react';
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
  SkeletonText,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { HiDocumentText, HiPlay } from 'react-icons/hi2';
import { makeRequest } from '../utils/request';
import { getSchema } from '../helpers/variables';
import { validationJSON } from '../utils/validationJson';

const Schema = React.lazy(() => import('./schema'));

export function EditorArea() {
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState('');
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');
  const [variablesError, setVariablesError] = useState('');
  const [headersError, setHeadersError] = useState('');
  const [isShowExtraAreas, setIsShowExtraAreas] = useState(false);
  const {
    isOpen: isDocumentationOpen,
    onOpen: onDocumentationOpen,
    onClose: onDocumentationClose,
  } = useDisclosure();
  const {
    isOpen: isPopoverVariablesOpen,
    onOpen: onPopoverVariablesOpen,
    onClose: onPopoverVariablesClose,
  } = useDisclosure();
  const {
    isOpen: isPopoverHeadersOpen,
    onOpen: onPopoverHeadersOpen,
    onClose: onPopoverHeadersClose,
  } = useDisclosure();

  const onSubmit = async () => {
    const isVariablesValid = validationJSON(variables).isValid;
    const isHeadersValid = validationJSON(headers).isValid;

    if (isVariablesValid && isHeadersValid) {
      const resp = await makeRequest(request, variables, headers);
      setResponse(JSON.stringify(resp, null, 2));
    } else if (!isVariablesValid) {
      const resp = await makeRequest(request, '', headers);
      setResponse(JSON.stringify(resp, null, 2));
      setVariablesError(validationJSON(variables).message);
      onPopoverVariablesOpen();
    } else if (!isHeadersValid) {
      const resp = await makeRequest(request, variables);
      setResponse(JSON.stringify(resp, null, 2));
      setHeadersError(validationJSON(headers).message);
      onPopoverHeadersOpen();
    }
  };

  useEffect(() => {
    async function loadDoc() {
      await getSchema();
    }
    loadDoc();
  }, []);

  const handleToggle = () => setIsShowExtraAreas(!isShowExtraAreas);

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
        <Textarea resize="none" height={'100%'} onChange={(e) => setRequest(e.target.value)} />
        <Accordion allowToggle>
          <AccordionItem>
            <Tabs isFitted variant="enclosed">
              <TabList pt={1}>
                <Popover
                  isOpen={isPopoverVariablesOpen}
                  onClose={onPopoverVariablesClose}
                  placement="top"
                >
                  <PopoverTrigger>
                    <Tab>Variables</Tab>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverCloseButton />
                    <PopoverHeader>Error in variable field</PopoverHeader>
                    <PopoverBody>{variablesError}</PopoverBody>
                    <PopoverArrow />
                  </PopoverContent>
                </Popover>
                <Popover
                  isOpen={isPopoverHeadersOpen}
                  onClose={onPopoverHeadersClose}
                  placement="top"
                >
                  <PopoverTrigger>
                    <Tab>Headers</Tab>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverCloseButton />
                    <PopoverHeader>Error in headers field</PopoverHeader>
                    <PopoverBody>{headersError}</PopoverBody>
                    <PopoverArrow />
                  </PopoverContent>
                </Popover>
                <AccordionButton flex="0.1" justifyContent="center" onClick={handleToggle}>
                  <AccordionIcon transform={isShowExtraAreas ? 'rotate(0)' : 'rotate(-180deg)'} />
                </AccordionButton>
              </TabList>
              <AccordionPanel px={0} pb={0}>
                <TabPanels>
                  <TabPanel p={0}>
                    <Textarea
                      resize="none"
                      minHeight={'25vh'}
                      onChange={(e) => setVariables(e.target.value)}
                    />
                  </TabPanel>
                  <TabPanel p={0}>
                    <Textarea
                      resize="none"
                      minHeight={'25vh'}
                      onChange={(e) => setHeaders(e.target.value)}
                    />
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
            <Icon as={HiPlay} />
          </Button>
          <Button my={2} colorScheme={'purple'} onClick={onDocumentationOpen}>
            <Icon as={HiDocumentText} />
          </Button>
          <Drawer isOpen={isDocumentationOpen} placement="left" onClose={onDocumentationClose}>
            <DrawerOverlay />
            <DrawerContent maxW={'lg'}>
              <DrawerCloseButton />
              <DrawerHeader>Docs</DrawerHeader>

              <DrawerBody>
                <Suspense
                  fallback={<SkeletonText mt="4" noOfLines={12} spacing="4" skeletonHeight="3" />}
                >
                  <Schema />
                </Suspense>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      </GridItem>
      <GridItem rowStart={1} colStart={3} colEnd={4} rowSpan={1} px={2}>
        <Textarea readOnly resize="none" minHeight={'100%'} value={response} />
      </GridItem>
    </Grid>
  );
}
