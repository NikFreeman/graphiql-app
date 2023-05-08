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
} from '@chakra-ui/react';
import { useState } from 'react';
import { makeRequest } from '../utils/request';
// import { useAppDispatch } from '../store/hooks';
// import { setQuery } from '../store/slices/requestSlice';

export function EditorArea() {
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState('');
  const [variables, setVariables] = useState({});
  // const dispatch = useAppDispatch();
  const onSubmit = async () => {
    const resp = await makeRequest(request, variables);
    setResponse(JSON.stringify(resp, null, '\t'));
  };

  return (
    <Grid gridTemplateColumns={'1fr 50px 1fr'} gap={2}>
      <GridItem
        display={'flex'}
        flexDir={'column'}
        rowSpan={1}
        colSpan={1}
        minHeight={'70vh'}
        height={'100%'}
        gap={2}
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
                    <Textarea />
                  </TabPanel>
                </TabPanels>
              </AccordionPanel>
            </Tabs>
          </AccordionItem>
        </Accordion>
      </GridItem>
      <GridItem colStart={2} colEnd={3}>
        <Button colorScheme="pink" onClick={onSubmit}>
          ⯈
        </Button>
      </GridItem>
      <GridItem rowStart={1} colStart={3} colEnd={4} rowSpan={1}>
        <Textarea readOnly height={'100%'} value={response} />
      </GridItem>
    </Grid>
  );
}
