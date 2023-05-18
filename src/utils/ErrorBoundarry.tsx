import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(e: Error): State {
    // Update state so the next render will show the fallback UI.
    console.log(e);
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error---:', error, '-/-', errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Error</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
