const url = 'https://rickandmortyapi.com/graphql';

export async function makeRequest(query: string, variables: string, optionalHeaders?: string) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        ...JSON.parse(optionalHeaders ? optionalHeaders : '{}'),
      },
      body: JSON.stringify({ query: query, variables: JSON.parse(variables ? variables : '{}') }),
    });
    return res.json();
  } catch (error) {
    return error;
  }
}
