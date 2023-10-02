export const useTitle = (title: string) => {
  if (typeof document !== 'undefined') {
    document.title = `GitHub Snooper | ${title}`;
  }
}