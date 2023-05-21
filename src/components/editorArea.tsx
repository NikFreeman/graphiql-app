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
  SkeletonText,
  Icon,
} from '@chakra-ui/react';
import { HiDocumentText, HiPlay } from 'react-icons/hi2';
import { useState } from 'react';
import { makeRequest } from '../utils/request';
import { getSchema, schema } from '../helpers/variables';
import { useTranslation } from 'react-i18next';

const Schema = React.lazy(() => import('./schema'));

export function EditorArea() {
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState('');
  const [variables, setVariables] = useState({});
  const [headers, setHeaders] = useState({});
  const [isShowExtraAreas, setIsShowExtraAreas] = useState(false);
  const {
    isOpen: isDocumentationOpen,
    onOpen: onDocumentationOpen,
    onClose: onDocumentationClose,
  } = useDisclosure();

  const onSubmit = async () => {
    const resp = await makeRequest(request, variables, headers);
    setResponse(JSON.stringify(resp, null, 2));
  };

  const onDocLoadAndOpen = async () => {
    if (!schema) {
      await getSchema();
    }
    onDocumentationOpen();
  };

  const handleToggle = () => setIsShowExtraAreas(!isShowExtraAreas);

  const { t } = useTranslation();

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
                <Tab>{t('variables')}</Tab>
                <Tab>{t('headers')}</Tab>
                <AccordionButton flex="0.1" justifyContent="center" onClick={handleToggle}>
                  <AccordionIcon transform={isShowExtraAreas ? 'rotate(0)' : 'rotate(-180deg)'} />
                </AccordionButton>
              </TabList>
              <AccordionPanel px={0}>
                <TabPanels>
                  <TabPanel p={0}>
                    <Textarea
                      resize="none"
                      minHeight={'25vh'}
                      onChange={(e) => setVariables(JSON.parse(e.target.value))}
                    />
                  </TabPanel>
                  <TabPanel p={0}>
                    <Textarea
                      resize="none"
                      minHeight={'25vh'}
                      onChange={(e) => setHeaders(JSON.parse(e.target.value))}
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
          <Button my={2} colorScheme={'purple'} bgColor={'#695bd3'} onClick={onSubmit}>
            <Icon as={HiPlay} />
          </Button>
          <Button my={2} colorScheme={'purple'} bgColor={'#695bd3'} onClick={onDocLoadAndOpen}>
            <Icon as={HiDocumentText} />
          </Button>
          <Drawer isOpen={isDocumentationOpen} placement="left" onClose={onDocumentationClose}>
            <DrawerOverlay />
            <DrawerContent maxW={'lg'}>
              <DrawerCloseButton />
              <DrawerHeader>{t('docs')}</DrawerHeader>

              <DrawerBody px={'2%'}>
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
