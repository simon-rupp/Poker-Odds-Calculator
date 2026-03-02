const CARD_IMAGES = import.meta.glob(
  "../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/*.png",
  { eager: true, import: "default" },
);

const SUITS = [
  { code: "s", filename: "spades", name: "spades" },
  { code: "h", filename: "hearts", name: "hearts" },
  { code: "c", filename: "clubs", name: "clubs" },
  { code: "d", filename: "diamonds", name: "diamonds" },
];

const RANKS = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

const RANK_FILENAME = {
  A: "ace",
  K: "king",
  Q: "queen",
  J: "jack",
  T: "10",
  9: "9",
  8: "8",
  7: "7",
  6: "6",
  5: "5",
  4: "4",
  3: "3",
  2: "2",
};

const CARD_IMAGE_PREFIX =
  "../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi";

export const CARDS = SUITS.flatMap((suit) =>
  RANKS.map((rank) => {
    const imagePath = `${CARD_IMAGE_PREFIX}/${suit.filename}_${RANK_FILENAME[rank]}.png`;
    const src = CARD_IMAGES[imagePath];

    if (!src) {
      throw new Error(`Missing card image: ${imagePath}`);
    }

    return {
      id: `${rank}${suit.code}`,
      rank,
      suit: suit.code,
      suitName: suit.name,
      src,
    };
  }),
);

export const CARD_BACK = new URL(
  "../assets/svg_playing_cards/svg_playing_cards/backs/png_96_dpi/red.png",
  import.meta.url,
).href;
