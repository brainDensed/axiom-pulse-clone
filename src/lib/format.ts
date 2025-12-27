export function formatMarketCap(num: number): string {
   if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + 'B';
   }
   if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
   }
   if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
   }
   return num.toFixed(2);
}

export function formatCurrency(num: number): string {
   return num >= 1_000_000_000 ? formatMarketCap(num) : num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
