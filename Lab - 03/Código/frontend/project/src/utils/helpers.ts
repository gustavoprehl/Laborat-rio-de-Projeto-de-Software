export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const generateRedemptionCode = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  
  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return code;
};

export const sendEmail = (to: string, subject: string, body: string): Promise<boolean> => {
  console.log(`Email sent to ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);
  
  return new Promise(resolve => {
    setTimeout(() => resolve(true), 1000);
  });
};

export const formatCoins = (amount: number): string => {
  return `${amount} ${amount === 1 ? 'coin' : 'coins'}`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

export const parseQueryParams = (queryString: string): Record<string, string> => {
  const params: Record<string, string> = {};
  
  if (!queryString || queryString === '?') {
    return params;
  }
  
  const searchParams = new URLSearchParams(queryString.startsWith('?') ? queryString.substring(1) : queryString);
  
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  
  return params;
};