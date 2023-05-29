/** 
 * *
 * Format Date
 * @description 
    - Converts a Date object to a custom string for display 
      in the AccordionSummary component of the report 
      entries.
 * TODO: Test the format with browser in other languages
 * @listens Reports.jsx
 */

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const formatDate = (date) => {
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export default formatDate;
