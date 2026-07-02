const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTZXM3IndjlYxSQ792Q67fmotwUXvVtIRDKaOCWYBA38S7Rd4CBlD8PBd2uxmXrgkeT8wKhbfwm-76S/pub?gid=2016249908&single=true&output=csv";

export async function getPlayers() {
  const res = await fetch(CSV_URL);
  const text = await res.text();

  const rows = text
    .trim()
    .split("\n")
    .map((row) => row.split(","));

  rows.shift();

  return rows.map((row) => {
    return {
      id: row[0],
      name: row[1],
      photo: row[2],
      total: Number(row[3]) || 0,
      rank: row[4],
      mom: Number(row[5]) || 0,
      latestMom: row[6] === "TRUE",
      matches: Number(row[7]) || 0,
      goals: Number(row[8]) || 0,
      rate: Number(row[9]) || 0,
    };
  });
}