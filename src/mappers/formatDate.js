export function formatDate(dateStr) {
    const date = new Date(dateStr);
    const month = `${date.getMonth()<10?'0':''}${date.getMonth()+1}`;
    const day =  `${date.getDate()<10?'0':''}${date.getDate()}`;
    const year = date.getFullYear();
    
    
    return `${year}-${month}-${day}`;
  }