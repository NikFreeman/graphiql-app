const url = 'https://rickandmortyapi.com/graphql';

export async function makeRequest(query: string, variables: object, headers?: object) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    ...headers,
    body: JSON.stringify({ query: query, variables: variables }),
  });
  return await res.json();
}
