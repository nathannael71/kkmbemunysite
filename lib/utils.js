import { format, parseISO } from 'date-fns';
import { id as localeId } from 'date-fns/locale/id';

export function formatDate(dateString, formatStr = 'MMMM dd, yyyy') {
  if (!dateString) return '';
  
  const date = typeof dateString === 'string' 
    ? parseISO(dateString) 
    : dateString;
  
  return format(date, formatStr, { locale: localeId });
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export function isDarkMode() {
  if (typeof window === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
}

export function toggleDarkMode() {
  if (typeof window === 'undefined') return;
  
  const isDark = document.documentElement.classList.contains('dark');
  
  if (isDark) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
}

export function initializeDarkMode() {
  if (typeof window === 'undefined') return;
  
  // Check for saved theme preference or prefer-color-scheme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  // Listen for OS theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (!localStorage.getItem('theme')) { // Only if user hasn't manually set theme
      if (event.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });
}
