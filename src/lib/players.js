const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTZXM3IndjlYxSQ792Q67fmotwUXvVtIRDKaOCWYBA38S7Rd4CBlD8PBd2uxmXrgkeT8wKhbfwm-76S/pub?gid=2016249908&single=true&output=csv";

function parseCsv(text) {
  return text
    .trim()
    .split("\n")
    .map((row) => row.split(","));
}

export async function getPageData() {
  const res = await fetch(CSV_URL);

  if (!res.ok) {
    throw new Error(`CSVの取得に失敗しました: ${res.status}`);
  }

  const text = await res.text();
  const rows = parseCsv(text);

  const dataRows = rows.slice(1);

  const players = dataRows
    .filter((row) => row[0])
    .map((row) => ({
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
    }));

  const siteData = {
    displayMonth: rows[0]?.[12] || "",
    updatedDate: rows[1]?.[12] || "",
    latestMatch: rows[2]?.[12] || "",
  };

  return {
    players,
    siteData,
  };
}