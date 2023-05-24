import { withErrorBoundary, useErrorBoundary } from 'react-use-error-boundary';

interface ErrorBoundaryProps {
  children: JSX.Element;
}

export const ErrorBoundary = withErrorBoundary(({ children }: ErrorBoundaryProps) => {
  const [error] = useErrorBoundary();

  if (error) {
    return (
      <div>
        <p>{error as string}</p>
      </div>
    );
  }

  return <div>{children}</div>;
});
