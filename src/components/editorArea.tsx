import { Textarea, Grid, GridItem, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { makeRequest } from '../utils/request';
// import { useAppDispatch } from '../store/hooks';
// import { setQuery } from '../store/slices/requestSlice';

export function EditorArea() {
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState('');
  // const dispatch = useAppDispatch();
  const onSubmit = async () => {
    const resp = await makeRequest(request);
    setResponse(JSON.stringify(resp, null, '\t'));
  };

  return (
    <Grid gridTemplateColumns={'1fr 1fr'} gridTemplateRows={'1fr 50px'} gap={6}>
      <GridItem colSpan={1}>
        <Textarea onChange={(e) => setRequest(e.target.value)} />
      </GridItem>
      <GridItem colStart={1} colEnd={2}>
        <Button onClick={onSubmit}>⯈</Button>
      </GridItem>
      <GridItem rowStart={1} colStart={2} colEnd={3} colSpan={1} rowSpan={2}>
        <Textarea height={'100%'} value={response} />
      </GridItem>
    </Grid>
  );
}
