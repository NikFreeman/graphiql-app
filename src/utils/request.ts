const url = 'https://rickandmortyapi.com/graphql';

export async function makeRequest(query: string) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query: query }),
  });
  return await res.json();
}
