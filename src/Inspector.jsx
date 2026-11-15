import React, { useEffect, useState } from "react";
import { ROOMS } from "./data.js";
import { useI18n } from "./i18n.jsx";
import MoleculeViewer from "./MoleculeViewer.jsx";

export default function Inspector({ itemKey, item, discovered, onClose }) {
  const { t, language, roomName, itemText, chemicalText } = useI18n();
  const [selectedChem, setSelectedChem] = useState(null);
  const [wiki, setWiki] = useState(null);
  const roomLabel = roomName(item.room, ROOMS.find(room => room.id === item.room)?.label || item.room);
  const selectedChemicalName = selectedChem && chemicalText(selectedChem.wiki, "name", selectedChem.name);

  useEffect(() => {
    setSelectedChem(item.chemicals[0]);
  }, [item]);

  useEffect(() => {
    if (!selectedChem) return undefined;
    const controller = new AbortController();
    const wikiTitle = language === "en" ? selectedChem.wiki : selectedChemicalName;
    const wikiUrl = `https://${language}.wikipedia.org/wiki/${encodeURIComponent(wikiTitle.replaceAll(" ", "_"))}`;
    setWiki({ status: "loading", title: chemicalText(selectedChem.wiki, "name", selectedChem.name), description: t("fetchingWikipedia"), extract: "", url: wikiUrl });
    fetch(`https://${language}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error(`Wikipedia returned HTTP ${response.status}`);
        return response.json();
      })
      .then(data => setWiki({
        status: "ready",
        title: data.title || chemicalText(selectedChem.wiki, "name", selectedChem.name),
        description: data.description || t("chemicalCompound"),
        extract: data.extract || t("noSummary"),
        url: data.content_urls?.desktop?.page || wikiUrl,
      }))
      .catch(error => {
        if (error.name === "AbortError") return;
        setWiki({
          status: "offline",
          title: chemicalText(selectedChem.wiki, "name", selectedChem.name),
          description: t("wikipediaUnavailable"),
          extract: `${chemicalText(selectedChem.wiki, "name", selectedChem.name)} (${selectedChem.formula}) — ${chemicalText(selectedChem.wiki, "role", selectedChem.role)}.`,
          url: wikiUrl,
        });
      });
    return () => controller.abort();
  }, [selectedChem, selectedChemicalName, language, chemicalText, t]);

  return (
    <aside className="inspector open">
      <div className="inspector-header">
        <div>
          <div className="room-tag">{roomLabel}</div>
          <h2>{itemText(itemKey, "name", item.name)}</h2>
        </div>
        <button className="close-btn" title={t("close")} onClick={onClose}>✕</button>
      </div>
      <p className="item-summary">{itemText(itemKey, "summary", item.summary)}</p>
      <div className="section-label">{t("chemicalsInside")}</div>
      <div className="chem-list">
        {item.chemicals.map(chemical => (
          <button
            key={chemical.wiki}
            className={`chem-chip${selectedChem === chemical ? " active" : ""}`}
            onClick={() => setSelectedChem(chemical)}
          >
            <div className="chem-chip-top">
              <span>
                {chemicalText(chemical.wiki, "name", chemical.name)}
                {discovered.has(chemical.wiki) && <span className="new-badge">{t("found")}</span>}
              </span>
              <span className="formula">{chemical.formula}</span>
            </div>
            <div className="chem-role">{chemicalText(chemical.wiki, "role", chemical.role)}</div>
          </button>
        ))}
      </div>
      <div className="info-card">
        <div>
          <h3>{wiki?.title || selectedChemicalName}</h3>
          <p>{wiki?.description || t("loadingWikipedia")}</p>
        </div>
        <p>{wiki?.extract}</p>
        <a className="wiki-link" href={wiki?.url || "#"} target="_blank" rel="noopener noreferrer">
          {t("readWikipedia")}
        </a>
        <MoleculeViewer chemical={selectedChem} />
      </div>
    </aside>
  );
}
