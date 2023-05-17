const url = 'https://rickandmortyapi.com/graphql';

export async function makeRequest(query: string, variables: object, optionalHeaders?: object) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      ...optionalHeaders,
    },
    body: JSON.stringify({ query: query, variables: variables }),
  });
  return res.json();
}
