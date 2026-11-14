import React, { useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CHEMICALS, ITEMS, QUESTS, ROOMS } from "./data.js";
import Inspector from "./Inspector.jsx";
import { LANGUAGES, useI18n } from "./i18n.jsx";
import { ITEM_CREDITS } from "./itemAssets.js";
import { FURNITURE_CREDITS } from "./furnitureAssets.js";
import SceneCanvas from "./Scene.jsx";

const STORAGE_KEY = "chemhouse_discovered_v1";

function readDiscovered() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return new Set(Array.isArray(saved) ? saved : []);
  } catch {
    return new Set();
  }
}

export default function App() {
  const { language, setLanguage, t, roomName, itemText, chemicalText, questText } = useI18n();
  const [room, setRoom] = useState("kitchen");
  const [selectedKey, setSelectedKey] = useState(null);
  const [hover, setHover] = useState(null);
  const [score, setScore] = useState(0);
  const [discovered, setDiscovered] = useState(readDiscovered);
  const [questIndex, setQuestIndex] = useState(0);
  const [activeQuest, setActiveQuest] = useState(QUESTS[0]);
  const [feedback, setFeedback] = useState(null);
  const [ask, setAsk] = useState("");
  const [dexOpen, setDexOpen] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [toast, setToast] = useState("");
  const controls = useRef();
  const toastTimer = useRef();

  const notify = useCallback(message => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2400);
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const onHover = useCallback((key, x, y) => {
    setHover(key ? { key, x, y } : null);
  }, []);

  const selectItem = useCallback(key => {
    const item = ITEMS[key];
    if (!item) return;
    const itemName = itemText(key, "name", item.name);
    setSelectedKey(key);
    setHover(null);

    const nextDiscovered = new Set(discovered);
    const newlyUnlocked = item.chemicals.filter(chemical => !nextDiscovered.has(chemical.wiki));
    newlyUnlocked.forEach(chemical => nextDiscovered.add(chemical.wiki));
    if (newlyUnlocked.length) {
      setDiscovered(nextDiscovered);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...nextDiscovered]));
      setScore(value => value + newlyUnlocked.length * 25);
      notify(t(newlyUnlocked.length === 1 ? "newChemical" : "newChemicals", { count: newlyUnlocked.length }));
    }

    if (!activeQuest.solved) {
      if (activeQuest.answers.includes(key)) {
        setActiveQuest(value => ({ ...value, solved: true }));
        setScore(value => value + 100);
        setFeedback({ type: "success", text: t("questCorrect", { item: itemName }) });
      } else {
        const chemicalNames = item.chemicals
          .map(chemical => chemicalText(chemical.wiki, "name", chemical.name))
          .join(", ");
        setFeedback({ type: "miss", text: t("questWrong", { item: itemName, chemicals: chemicalNames }) });
      }
    }
  }, [activeQuest, discovered, itemText, chemicalText, notify, t]);

  const changeRoom = key => {
    setRoom(key);
    setHover(null);
  };

  const nextQuest = () => {
    const next = (questIndex + 1) % QUESTS.length;
    setQuestIndex(next);
    setActiveQuest(QUESTS[next]);
    setFeedback(null);
  };

  const submitAsk = event => {
    event.preventDefault();
    const query = ask.trim().toLowerCase();
    if (!query) return;
    const matches = Object.entries(ITEMS)
      .filter(([key, item]) => [
        item.name, itemText(key, "name", item.name),
        ROOMS.find(candidate => candidate.id === item.room)?.label,
        roomName(item.room, item.room), item.summary,
        itemText(key, "summary", item.summary),
        ...item.tags,
        ...item.chemicals.flatMap(chemical => [
          chemical.name, chemical.formula, chemical.role,
          chemicalText(chemical.wiki, "name", chemical.name),
          chemicalText(chemical.wiki, "role", chemical.role),
        ]),
      ].join(" ").toLowerCase().includes(query))
      .map(([key]) => key);

    if (!matches.length) {
      setFeedback({ type: "miss", text: t("noItemsMatch", { query: ask }) });
      return;
    }
    const roomHints = [...new Set(matches.map(key => roomName(ITEMS[key].room, ITEMS[key].room)))].join(language === "es" ? " o " : " or ");
    setActiveQuest({
      prompt: t("customPrompt", { query: ask, count: matches.length }),
      answers: matches,
      hint: t("customHint", { rooms: roomHints }),
      solved: false,
    });
    setQuestIndex(-1);
    setFeedback(null);
    setAsk("");
  };

  const resetDex = () => {
    setDiscovered(new Set());
    localStorage.removeItem(STORAGE_KEY);
    setScore(0);
    notify(t("progressReset"));
  };

  const modelError = useCallback(error => {
    console.error("Could not load a room GLB model:", error);
    notify(t("modelLoadError"));
  }, [notify, t]);

  const selectedItem = selectedKey ? ITEMS[selectedKey] : null;
  const currentPrompt = questIndex < 0
    ? activeQuest.prompt
    : questText(questIndex, "prompt", activeQuest.prompt);
  const currentHint = questIndex < 0
    ? activeQuest.hint
    : questText(questIndex, "hint", activeQuest.hint);
  const formatNumber = value => new Intl.NumberFormat(language).format(value);

  return (
    <main className="app">
      <Canvas
        className="scene"
        shadows
        orthographic
        camera={{
          position: [14, 12.5, 14],
          zoom: window.innerWidth < 760 ? 56 : 62,
          near: .1,
          far: 100,
        }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))}
      >
        <SceneCanvas
          room={room}
          onSelect={selectItem}
          onHover={onHover}
          controls={controls}
          onModelError={modelError}
        />
        <OrbitControls
          ref={controls}
          makeDefault
          enableDamping
          dampingFactor={.08}
          minZoom={42}
          maxZoom={150}
          maxPolarAngle={Math.PI / 2.15}
          minPolarAngle={Math.PI / 6}
          target={[0, .9, 0]}
        />
      </Canvas>

      <header className="hud-top">
        <div className="hud-row">
          <div className="brand"><h1>⚗️ ChemHouse 3D</h1></div>
          <button className="chemdex-pill" onClick={() => setDexOpen(true)} title={t("openChemDex")}>
            <span>🧪 {t("chemDex")}: <strong>{formatNumber(discovered.size)} / {formatNumber(CHEMICALS.length)}</strong></span>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${discovered.size / CHEMICALS.length * 100}%` }} />
            </div>
          </button>
          <div className="score-pill">⭐ {t("points", { count: formatNumber(score) })}</div>
          <label className="language-control">
            <span>{t("language")}</span>
            <select value={language} onChange={event => setLanguage(event.target.value)} aria-label={t("language")}>
              {LANGUAGES.map(option => <option key={option.code} value={option.code}>{option.label}</option>)}
            </select>
          </label>
          <button className="mini-btn credits-btn" onClick={() => setCreditsOpen(true)} title={t("credits")}>
            🎨 {t("credits")}
          </button>
        </div>
        <nav className="room-nav">
          {ROOMS.map(candidate => (
            <button
              key={candidate.id}
              className={`room-btn${room === candidate.id ? " active" : ""}`}
              onClick={() => changeRoom(candidate.id)}
            >
              {candidate.icon} {roomName(candidate.id, candidate.label)}
            </button>
          ))}
        </nav>
      </header>

      <section className="quest-card">
        <div className="quest-top">
          <span className="quest-badge">
            {questIndex < 0 ? `🔍 ${t("customChallenge")}` : `🎯 ${t("quest", { current: formatNumber(questIndex + 1), total: formatNumber(QUESTS.length) })}`}
          </span>
          <div className="quest-actions">
            <button
              className="mini-btn"
              onClick={() => activeQuest && setFeedback({ type: "hint", text: `💡 ${t("hint")}: ${currentHint}` })}
            >
              💡 {t("hint")}
            </button>
            <button className="mini-btn" onClick={nextQuest}>{t("next")}</button>
          </div>
        </div>
        <p className="quest-prompt">{currentPrompt}</p>
        {feedback && <div className={`feedback ${feedback.type}`}>{feedback.text}</div>}
        <form className="ask-row" onSubmit={submitAsk}>
          <input
            className="ask-input"
            value={ask}
            onChange={event => setAsk(event.target.value)}
            placeholder={t("findChemical")}
            aria-label={t("findChemical")}
          />
          <button className="ask-btn" type="submit">{t("ask")}</button>
        </form>
      </section>

      {hover && <div className="tooltip" style={{ left: hover.x + 14, top: hover.y + 14 }}>🔬 {itemText(hover.key, "name", ITEMS[hover.key].name)}</div>}
      {selectedItem && (
        <Inspector
          key={selectedKey}
          itemKey={selectedKey}
          item={selectedItem}
          discovered={discovered}
          onClose={() => setSelectedKey(null)}
        />
      )}
      {dexOpen && (
        <div className="modal-backdrop" onClick={event => {
          if (event.target === event.currentTarget) setDexOpen(false);
        }}>
          <section className="modal">
            <div className="modal-header">
              <div>
                <h2>🧪 {t("encyclopedia")}</h2>
                <p>{t("discoveredAcross", { found: formatNumber(discovered.size), total: formatNumber(CHEMICALS.length) })}</p>
              </div>
              <div className="quest-actions">
                <button className="mini-btn" onClick={resetDex}>{t("resetProgress")}</button>
                <button className="close-btn" title={t("close")} onClick={() => setDexOpen(false)}>✕</button>
              </div>
            </div>
            <div className="dex-grid">
              {CHEMICALS.map(chemical => {
                const unlocked = discovered.has(chemical.wiki);
                const sourceItemKey = Object.keys(ITEMS).find(key => ITEMS[key].chemicals.some(entry => entry.wiki === chemical.wiki));
                const roomId = ROOMS.find(candidate => candidate.label === chemical.room)?.id;
                return (
                  <div key={chemical.wiki} className={`dex-item ${unlocked ? "unlocked" : "locked"}`}>
                    <div className="dex-name">{unlocked ? `✅ ${chemicalText(chemical.wiki, "name", chemical.name)}` : "🔒 ???"}</div>
                    <div className="dex-meta">
                      {unlocked
                        ? `${chemical.formula} • ${sourceItemKey ? itemText(sourceItemKey, "name", chemical.foundIn) : chemical.foundIn} (${roomId ? roomName(roomId, chemical.room) : chemical.room})`
                        : t("exploreToUnlock", { room: roomId ? roomName(roomId, chemical.room) : chemical.room })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
      {creditsOpen && (
        <div className="modal-backdrop" onClick={event => {
          if (event.target === event.currentTarget) setCreditsOpen(false);
        }}>
          <section className="modal credits-modal">
            <div className="modal-header">
              <div>
                <h2>🎨 {t("creditsTitle")}</h2>
                <p>{t("creditsIntro")}</p>
              </div>
              <button className="close-btn" title={t("close")} onClick={() => setCreditsOpen(false)}>✕</button>
            </div>
            <div className="credits-scroll">
              <h3 className="credits-subtitle">{t("itemCredits")}</h3>
              <div className="dex-grid credits-grid">
                {ITEM_CREDITS.map(credit => (
                  <div key={credit.key} className="dex-item unlocked">
                    <div className="dex-name">{credit.title}</div>
                    <div className="dex-meta">{credit.author} • {credit.license}</div>
                    <a className="credit-link" href={credit.url} target="_blank" rel="noreferrer">
                      {t("viewSource")} ↗
                    </a>
                  </div>
                ))}
              </div>
              <h3 className="credits-subtitle">{t("furnitureCredits")}</h3>
              <div className="dex-grid credits-grid">
                {FURNITURE_CREDITS.map(credit => (
                  <div key={credit.key} className="dex-item unlocked">
                    <div className="dex-name">{credit.title}</div>
                    <div className="dex-meta">{credit.author} • {credit.license}</div>
                    <a className="credit-link" href={credit.url} target="_blank" rel="noreferrer">
                      {t("viewSource")} ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <p className="credit-note">{t("creditsNote")}</p>
          </section>
        </div>
      )}
      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}
