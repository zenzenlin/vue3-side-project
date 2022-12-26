export function dateToRelative(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now - date;

  if (diff < 1000 * 60) {
    const seconds = Math.floor(diff / 1000);
    return `${seconds}秒前`;
  }
  if (diff < 1000 * 60 * 60) {
    const seconds = Math.floor(diff / (1000 * 60));
    return `${seconds}分鐘前`;
  }
  if (diff < 1000 * 60 * 60 * 24) {
    const seconds = Math.floor(diff / (1000 * 60 * 60));
    return `${seconds}小時前`;
  }

  // 小時前以外的時間以 1999-01-01 呈現
  return `${date.getFullYear()}
  -${("0" + (date.getMonth() + 1)).slice(-2)}
  -${("0" + (date.getDate() + 1)).slice(-2)}`;
}
