import { Theme } from 'react-select';

export default function customTheme(theme: Theme) {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary25: '#D9F2FF',
      primary: '#0065DD',
    },
  }
}