// (c) 2020 Henry Gressmann
// This code is licensed under MIT license (see LICENSE.txt for details)

const model = require("./ThreatDragonModels/Etournity Threat Model/Etournity Threat Model.json");

const types = {
  "tm.Process": "Process",
  "tm.Actor": "External Actor",
  "tm.Flow": "Data Flow",
  "tm.Flow": "Data Flow",
  "tm.Store": "Data Store",
};

const indent = string => string.split("\n").map(s => `    ${s}`).join("\n")

const report = model.detail.diagrams[0].diagramJson.cells.map((cell) => {
  const label = cell.attrs?.text?.text || cell.labels?.[0]?.attrs?.text?.text;
  const hasThreats = cell?.threats?.length;

  if (label && hasThreats) {
    const threats = cell.threats
      .map(
        (cell) => `* ### ${cell.title} (*${cell.type}, ${cell.status}, ${cell.severity} Serverity*)<br/>
${cell.description && indent(`**Description:**\n${cell.description}\n`) || ''}
${cell.mitigation && indent(`**Mitigation:**\n${cell.mitigation}\n`) || ''}`
      )
      .join("\n");

    return `## ${label} (${types[cell.type]})\n${threats}</br>\n`;
  }
  return "";
}).join("");

console.log(report);