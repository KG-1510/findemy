export const truncateText = (
  text: string,
  maxLength: number,
  truncateValue: number
) => {
  return text.length > maxLength
    ? text.substring(0, truncateValue) + "..."
    : text;
};

export const sanitizedHtmlText = (text: string) => {
  return text.replace(/\\n/g, "<br />");
};
