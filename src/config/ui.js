export const uiConfig = {
  theme: {
    primary: '#0d6efd',
    secondary: '#6c757d',
    success: '#198754',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#0dcaf0',
    light: '#f8f9fa',
    dark: '#212529'
  },
  layout: {
    sidebarWidth: '250px',
    headerHeight: '70px',
    footerHeight: '60px',
    containerMaxWidth: '1200px'
  },
  breakpoints: {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px'
  }
} as const;
