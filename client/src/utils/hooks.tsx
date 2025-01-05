export function useErrorLogger() {
  return (error: string) => {
    console.error(error);
  };
}
