export function validationJSON(variable: string) {
  let result: object | null = null;
  let message = '';
  try {
    result = JSON.parse(variable ? variable : '{}');
  } catch (error) {
    if (error instanceof Error) {
      message = error.message;
    }
  }
  return { isValid: !!result, message };
}
