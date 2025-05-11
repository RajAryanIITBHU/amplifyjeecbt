export const getOrCreateBatchId = async (batchName) => {
  const res = await fetch("/api/getOrCreateBatchId", {
    method: "POST",
    body: JSON.stringify({ batchName }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to get batch ID");

  return data.batchId;
};
