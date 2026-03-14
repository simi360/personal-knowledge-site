type IconProps = {
  className?: string;
};

export function MailIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M4 6h16v12H4z" />
      <path d="m5 7 7 6 7-6" />
    </svg>
  );
}

export function GitHubIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.41-4.04-1.41-.55-1.38-1.34-1.75-1.34-1.75-1.09-.74.08-.72.08-.72 1.21.09 1.84 1.22 1.84 1.22 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.48-1.32-5.48-5.86 0-1.29.47-2.34 1.22-3.16-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.21A11.6 11.6 0 0 1 12 6.6c1.02 0 2.05.14 3.01.41 2.29-1.53 3.28-1.21 3.28-1.21.66 1.65.25 2.87.13 3.17.76.82 1.22 1.87 1.22 3.16 0 4.55-2.82 5.55-5.5 5.85.43.37.82 1.09.82 2.2v3.27c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

export function LinkedInIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5ZM.36 8.09h4.27V24H.36V8.09Zm6.95 0h4.09v2.17h.06c.57-1.08 1.96-2.22 4.03-2.22 4.31 0 5.11 2.79 5.11 6.42V24h-4.26v-7.98c0-1.9-.03-4.34-2.68-4.34-2.68 0-3.09 2.07-3.09 4.2V24H7.31V8.09Z" />
    </svg>
  );
}
