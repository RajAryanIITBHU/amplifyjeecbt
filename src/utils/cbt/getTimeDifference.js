export function getTimeDifference(startIso, endIso) {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const diffMs = Math.abs(end.getTime() - start.getTime()); 

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let result = "";
  if (hours > 0) result += `${hours} hour${hours !== 1 ? "s" : ""}`;
  if (minutes > 0)
    result += `${hours > 0 ? " " : ""}${minutes} min${
      minutes !== 1 ? "s" : ""
    }`;
  return result || "0 mins";
}
