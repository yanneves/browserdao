const style = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "long",
  timeZone: "UTC",
});

export default function formatDate(date) {
  return style.format(new Date(date));
}
