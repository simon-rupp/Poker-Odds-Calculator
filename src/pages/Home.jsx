import { CardGroup, OddsCalculator } from "poker-odds-calculator";
import { useEffect, useState } from "react";
import { CARD_BACK, CARDS } from "../lib/cards";

const MAX_SELECTED_CARDS = 9;
const VALID_SELECTION_COUNTS = new Set([4, 7, 8, 9]);
const MIN_LOADING_VISIBLE_MS = 150;
const BOARD_SLOT_LABELS = ["Flop 1", "Flop 2", "Flop 3", "Turn", "River"];

const CARD_BY_ID = Object.fromEntries(CARDS.map((card) => [card.id, card]));

const isSameCard = (cardA, cardB) =>
  cardA.rank === cardB.rank && cardA.suit === cardB.suit;

const toCardToken = (card) => `${card.rank}${card.suit}`;

const canonicalizeCardToken = (token) => {
  if (!token || token.length !== 2) {
    return null;
  }

  const rank = token[0].toUpperCase();
  const suit = token[1].toLowerCase();

  if (!"23456789TJQKA".includes(rank) || !"shcd".includes(suit)) {
    return null;
  }

  return `${rank}${suit}`;
};

const parseCardGroup = (rawValue, maxCount, usedTokens) => {
  if (!rawValue) {
    return [];
  }

  const cleaned = rawValue.replace(/[^a-zA-Z0-9]/g, "");
  const parsed = [];

  for (let index = 0; index + 1 < cleaned.length && parsed.length < maxCount; index += 2) {
    const token = canonicalizeCardToken(cleaned.slice(index, index + 2));

    if (!token || usedTokens.has(token) || !CARD_BY_ID[token]) {
      continue;
    }

    usedTokens.add(token);
    parsed.push(CARD_BY_ID[token]);
  }

  return parsed;
};

const getSelectedFromSearch = (search) => {
  const params = new URLSearchParams(search);
  const usedTokens = new Set();

  const hand1 = parseCardGroup(params.get("h1"), 2, usedTokens);
  const hand2 = parseCardGroup(params.get("h2"), 2, usedTokens);
  const board = parseCardGroup(params.get("b") ?? params.get("board"), 5, usedTokens);

  return [...hand1, ...hand2, ...board];
};

const buildSearchFromSelected = (selected) => {
  const params = new URLSearchParams();
  const hand1 = selected.slice(0, 2).map(toCardToken).join("");
  const hand2 = selected.slice(2, 4).map(toCardToken).join("");
  const board = selected.slice(4, MAX_SELECTED_CARDS).map(toCardToken).join("");

  if (hand1) {
    params.set("h1", hand1);
  }

  if (hand2) {
    params.set("h2", hand2);
  }

  if (board) {
    params.set("b", board);
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
};

const calculateWinningOdds = (selected) => {
  if (selected.length < 4) {
    return {
      odds: [],
      status: "Choose 2 cards for each hand.",
    };
  }

  if (!VALID_SELECTION_COUNTS.has(selected.length)) {
    return {
      odds: [],
      status: "Board must have 0, 3, 4, or 5 cards.",
    };
  }

  try {
    const hands = [
      CardGroup.fromString(selected.slice(0, 2).map(toCardToken).join("")),
      CardGroup.fromString(selected.slice(2, 4).map(toCardToken).join("")),
    ];
    const board = CardGroup.fromString(
      selected.slice(4, MAX_SELECTED_CARDS).map(toCardToken).join(""),
    );
    const result = OddsCalculator.calculate(hands, board);

    return {
      odds: result.equities.map((equity) => ({
        wins: equity.toString(),
      })),
      status: "Odds updated.",
    };
  } catch (_error) {
    return {
      odds: [],
      status: "Could not calculate odds for the current selection.",
    };
  }
};

function Home() {
  const [selected, setSelected] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    return getSelectedFromSearch(window.location.search);
  });
  const [oddsState, setOddsState] = useState({
    odds: [],
    status: "Choose 2 cards for each hand.",
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const nextSlotIndex =
    selected.length < MAX_SELECTED_CARDS ? selected.length : -1;

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== "Backspace") {
        return;
      }

      if (event.target instanceof HTMLElement) {
        const tagName = event.target.tagName;
        if (
          event.target.isContentEditable ||
          tagName === "INPUT" ||
          tagName === "TEXTAREA" ||
          tagName === "SELECT"
        ) {
          return;
        }
      }

      event.preventDefault();
      setSelected((previous) =>
        previous.length > 0 ? previous.slice(0, previous.length - 1) : previous,
      );
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const nextSearch = buildSearchFromSelected(selected);
    if (nextSearch === window.location.search) {
      return;
    }

    const nextUrl = `${window.location.pathname}${nextSearch}${window.location.hash}`;
    window.history.replaceState(null, "", nextUrl);
  }, [selected]);

  useEffect(() => {
    let isCancelled = false;
    let calculateTimeoutId = 0;
    let finalizeTimeoutId = 0;
    const shouldShowLoadingOverlay = selected.length === 4;

    if (!VALID_SELECTION_COUNTS.has(selected.length) || selected.length < 4) {
      setIsCalculating(false);
      setOddsState(calculateWinningOdds(selected));
      return () => {
        isCancelled = true;
      };
    }

    if (!shouldShowLoadingOverlay) {
      setIsCalculating(false);
      setOddsState(calculateWinningOdds(selected));
      return () => {
        isCancelled = true;
      };
    }

    const loadingStartedAt = performance.now();
    setIsCalculating(true);

    // Defer the heavy calculation to a later task so loading UI can paint first.
    calculateTimeoutId = window.setTimeout(() => {
      const nextOddsState = calculateWinningOdds(selected);
      if (isCancelled) {
        return;
      }

      const elapsedMs = performance.now() - loadingStartedAt;
      const remainingVisibleMs = Math.max(0, MIN_LOADING_VISIBLE_MS - elapsedMs);

      finalizeTimeoutId = window.setTimeout(() => {
        if (isCancelled) {
          return;
        }

        setOddsState(nextOddsState);
        setIsCalculating(false);
      }, remainingVisibleMs);
    }, 16);

    return () => {
      isCancelled = true;
      window.clearTimeout(calculateTimeoutId);
      window.clearTimeout(finalizeTimeoutId);
    };
  }, [selected]);

  const [calculatedHand1Percentage = "-", calculatedHand2Percentage = "-"] = oddsState.odds.map(
    (equity) => equity.wins,
  );
  const hand1Percentage = isCalculating ? "..." : calculatedHand1Percentage;
  const hand2Percentage = isCalculating ? "..." : calculatedHand2Percentage;
  const oddsStatus = isCalculating ? "Calculating odds..." : oddsState.status;

  const hand1 = selected.slice(0, 2);
  const hand2 = selected.slice(2, 4);
  const board = selected.slice(4, MAX_SELECTED_CARDS);

  const handleCardSelect = (card) => {
    setSelected((previous) => {
      const existingIndex = previous.findIndex((selectedCard) =>
        isSameCard(selectedCard, card),
      );

      if (existingIndex !== -1) {
        const next = [...previous];
        next.splice(existingIndex, 1);
        return next;
      }

      if (previous.length >= MAX_SELECTED_CARDS) {
        return previous;
      }

      return [...previous, card];
    });
  };

  const removeLastCard = () => {
    setSelected((previous) =>
      previous.length > 0 ? previous.slice(0, previous.length - 1) : previous,
    );
  };

  const renderCardGroup = (cards, totalSlots, startIndex, slotLabels = []) => (
    <>
      {Array.from({ length: totalSlots }, (_, index) => {
        const card = cards[index];
        const slotIndex = startIndex + index;
        const isNextSlot = slotIndex === nextSlotIndex;
        const slotClassName = card ? "Selectedcard" : "Placecard";
        const slotLabel = slotLabels[index];

        return (
          <div key={`slot-${startIndex}-${index}`} className="slotWrap">
            {slotLabel && <span className="slotLabel">{slotLabel}</span>}
            <div className={`${slotClassName} ${isNextSlot ? "nextSlot" : ""}`.trim()}>
              <img
                className={`cardImage ${card ? "" : "placeholderCardImage"}`}
                src={card ? card.src : CARD_BACK}
                alt={
                  card
                    ? `${card.rank} of ${card.suitName}`
                    : `Placeholder card ${slotIndex + 1}`
                }
              />
            </div>
          </div>
        );
      })}
    </>
  );

  return (
    <div className={`appShell ${isCalculating ? "isBusy" : ""}`}>
      <header className="topBar">
        <div>
          <h1>Heads Up Poker Odds</h1>
          <p className="directions">
            Click cards in order to fill Hand 1, Hand 2, then Board. Click a
            selected card again to remove it.
          </p>
        </div>
        <div className="statusPillRow">
          <p className={`selectionStatus statusPill ${isCalculating ? "loading" : ""}`}>
            {oddsStatus}
          </p>
          <p className="statusPill counterPill">
            {selected.length}/{MAX_SELECTED_CARDS} selected
          </p>
        </div>
      </header>

      <div className="mainBody">
        <section className="leftColumn panel">
          <div className="displayHand handBlock">
            <h3>Hand 1</h3>
            <div className="cardRow">{renderCardGroup(hand1, 2, 0)}</div>
            <p className="oddsValue">
              Win %: <strong>{hand1Percentage}</strong>
            </p>
          </div>

          <div className="displayHand handBlock">
            <h3>Hand 2</h3>
            <div className="cardRow">{renderCardGroup(hand2, 2, 2)}</div>
            <p className="oddsValue">
              Win %: <strong>{hand2Percentage}</strong>
            </p>
          </div>

          <div className="displayBoard handBlock">
            <h3>Board</h3>
            <div className="cardRow boardRow">
              {renderCardGroup(board, 5, 4, BOARD_SLOT_LABELS)}
            </div>
          </div>

          <div className="resetDiv">
            <div className="resetContainer">
              <button className="resetButton" type="button" onClick={removeLastCard}>
                Undo Last
              </button>
              <button className="resetButton" type="button" onClick={() => setSelected([])}>
                Reset
              </button>
            </div>
          </div>
        </section>

        <section className="rightColumn panel">
          <div className="deckHeader">
            <h3>Deck</h3>
            <p className="deckHint">
              Use Backspace or Undo Last to quickly rewind spot setups
            </p>
          </div>
          <div className="deckGrid">
            {CARDS.map((card) => {
              const isSelected = selected.some((selectedCard) =>
                isSameCard(selectedCard, card),
              );

              return (
                <button
                  key={card.id}
                  type="button"
                  className={`cardbutton ${isSelected ? "selected" : ""}`}
                  onClick={() => handleCardSelect(card)}
                >
                  <img
                    className="cardImage"
                    src={card.src}
                    alt={`${card.rank} of ${card.suitName}`}
                  />
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {isCalculating && (
        <div className="loadingOverlay" role="status" aria-live="polite" aria-busy="true">
          <div className="loadingCard">
            <div className="chipSpinner" aria-hidden="true" />
            <p className="loadingTitle">Calculating Odds</p>
            <p className="loadingSubtitle">Running simulation across the remaining outcomes</p>
            <div className="loadingTrack">
              <div className="loadingFill" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
