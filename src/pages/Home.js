import {CardGroup, OddsCalculator} from 'poker-odds-calculator';
import { useState, useEffect } from 'react';
import AceofSpades from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/spades_ace.png';
import KingofSpades from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/spades_king.png';
import QueenofSpades from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/spades_queen.png';
import JackofSpades from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/spades_jack.png';
import TenofSpades from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/spades_10.png';
import NineofSpades from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/spades_9.png';
import EightofSpades from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/spades_8.png';
import SevenofSpades from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/spades_7.png';
import SixofSpades from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/spades_6.png';
import FiveofSpades from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/spades_5.png';
import FourofSpades from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/spades_4.png';
import ThreeofSpades from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/spades_3.png';
import TwoofSpades from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/spades_2.png';
import AceofHearts from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/hearts_ace.png';
import KingofHearts from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/hearts_king.png';
import QueenofHearts from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/hearts_queen.png';
import JackofHearts from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/hearts_jack.png';
import TenofHearts from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/hearts_10.png';
import NineofHearts from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/hearts_9.png';
import EightofHearts from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/hearts_8.png';
import SevenofHearts from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/hearts_7.png';
import SixofHearts from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/hearts_6.png';
import FiveofHearts from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/hearts_5.png';
import FourofHearts from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/hearts_4.png';
import ThreeofHearts from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/hearts_3.png';
import TwoofHearts from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/hearts_2.png';
import AceofDiamonds from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/diamonds_ace.png';
import KingofDiamonds from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/diamonds_king.png';
import QueenofDiamonds from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/diamonds_queen.png';
import JackofDiamonds from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/diamonds_jack.png';
import TenofDiamonds from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/diamonds_10.png';
import NineofDiamonds from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/diamonds_9.png';
import EightofDiamonds from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/diamonds_8.png';
import SevenofDiamonds from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/diamonds_7.png';
import SixofDiamonds from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/diamonds_6.png';
import FiveofDiamonds from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/diamonds_5.png';
import FourofDiamonds from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/diamonds_4.png';
import ThreeofDiamonds from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/diamonds_3.png';
import TwoofDiamonds from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/diamonds_2.png';
import AceofClubs from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/clubs_ace.png';
import KingofClubs from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/clubs_king.png';
import QueenofClubs from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/clubs_queen.png';
import JackofClubs from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/clubs_jack.png';
import TenofClubs from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/clubs_10.png';
import NineofClubs from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/clubs_9.png';
import EightofClubs from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/clubs_8.png';
import SevenofClubs from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/clubs_7.png';
import SixofClubs from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/clubs_6.png';
import FiveofClubs from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/clubs_5.png';
import FourofClubs from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/clubs_4.png';
import ThreeofClubs from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/clubs_3.png';
import TwoofClubs from '../assets/svg_playing_cards/svg_playing_cards/fronts/png_96_dpi/clubs_2.png';
import BackofCard from '../assets/svg_playing_cards/svg_playing_cards/backs/png_96_dpi/red.png';



const Home = () => {

  const cards = [
    { rank: 'K', suit: 's', src: KingofSpades },
    { rank: 'Q', suit: 's', src: QueenofSpades },
    { rank: 'J', suit: 's', src: JackofSpades },
    { rank: 'T', suit: 's', src: TenofSpades },
    { rank: '9', suit: 's', src: NineofSpades },
    { rank: '8', suit: 's', src: EightofSpades },
    { rank: '7', suit: 's', src: SevenofSpades },
    { rank: '6', suit: 's', src: SixofSpades },
    { rank: '5', suit: 's', src: FiveofSpades },
    { rank: '4', suit: 's', src: FourofSpades },
    { rank: '3', suit: 's', src: ThreeofSpades },
    { rank: '2', suit: 's', src: TwoofSpades },
    { rank: 'A', suit: 's', src: AceofSpades },
    { rank: 'K', suit: 'h', src: KingofHearts },
    { rank: 'Q', suit: 'h', src: QueenofHearts },
    { rank: 'J', suit: 'h', src: JackofHearts },
    { rank: 'T', suit: 'h', src: TenofHearts },
    { rank: '9', suit: 'h', src: NineofHearts },
    { rank: '8', suit: 'h', src: EightofHearts },
    { rank: '7', suit: 'h', src: SevenofHearts },
    { rank: '6', suit: 'h', src: SixofHearts },
    { rank: '5', suit: 'h', src: FiveofHearts },
    { rank: '4', suit: 'h', src: FourofHearts },
    { rank: '3', suit: 'h', src: ThreeofHearts },
    { rank: '2', suit: 'h', src: TwoofHearts },
    { rank: 'A', suit: 'h', src: AceofHearts },
    { rank: 'K', suit: 'c', src: KingofClubs },
    { rank: 'Q', suit: 'c', src: QueenofClubs },
    { rank: 'J', suit: 'c', src: JackofClubs },
    { rank: 'T', suit: 'c', src: TenofClubs },
    { rank: '9', suit: 'c', src: NineofClubs },
    { rank: '8', suit: 'c', src: EightofClubs },
    { rank: '7', suit: 'c', src: SevenofClubs },
    { rank: '6', suit: 'c', src: SixofClubs },
    { rank: '5', suit: 'c', src: FiveofClubs },
    { rank: '4', suit: 'c', src: FourofClubs },
    { rank: '3', suit: 'c', src: ThreeofClubs },
    { rank: '2', suit: 'c', src: TwoofClubs },
    { rank: 'A', suit: 'c', src: AceofClubs },
    { rank: 'K', suit: 'd', src: KingofDiamonds },
    { rank: 'Q', suit: 'd', src: QueenofDiamonds },
    { rank: 'J', suit: 'd', src: JackofDiamonds },
    { rank: 'T', suit: 'd', src: TenofDiamonds },
    { rank: '9', suit: 'd', src: NineofDiamonds },
    { rank: '8', suit: 'd', src: EightofDiamonds },
    { rank: '7', suit: 'd', src: SevenofDiamonds },
    { rank: '6', suit: 'd', src: SixofDiamonds },
    { rank: '5', suit: 'd', src: FiveofDiamonds },
    { rank: '4', suit: 'd', src: FourofDiamonds },
    { rank: '3', suit: 'd', src: ThreeofDiamonds },
    { rank: '2', suit: 'd', src: TwoofDiamonds },
    { rank: 'A', suit: 'd', src: AceofDiamonds },
  ];

  const [winningOdds, setWinningOdds] = useState([]);
  const [hand1Percentage, hand2Percentage] = winningOdds.map((odds) => odds.wins);
  const [selected, setSelected] = useState([]);
  const numPlaceHolders = 9 - selected.length;

  const handleCardSelect = (card) => {
    
    
    // Check if the card is already selected
    const isSelected = selected.some(
      (selectedCard) => selectedCard.rank === card.rank && selectedCard.suit === card.suit);

    // Update the state based on the card selection
    if (isSelected) {
      //remove card from selected array
      setSelected(selected.filter((selectedCard) => selectedCard.rank !== card.rank || selectedCard.suit !== card.suit));
    } else  if (selected.length === 9) {
        return;
    } else {
      setSelected([...selected, card]);
    }
  };


  const updateOdds = () => {
    if (selected.length >= 4 && selected.length !== 6 && selected.length !== 5 && selected.length <= 9) {
      const modifiedHand1 = selected.slice(0, 2).map((card) => card.rank + card.suit);
      const modifiedHand2 = selected.slice(2, 4).map((card) => card.rank + card.suit);
      const modifiedBoard = selected.slice(4).map((card) => card.rank + card.suit);
      const hands = [
        CardGroup.fromString(modifiedHand1.join('')),
        CardGroup.fromString(modifiedHand2.join(''))
      ];
      const newBoard = CardGroup.fromString(modifiedBoard.join(''));
      const result = OddsCalculator.calculate(hands, newBoard);

      const updatedWinningOdds = result.equities.map((equity, index) => ({
        hand: hands[index].toString(),
        wins: equity.toString()
      }));

      setWinningOdds(updatedWinningOdds);
    } else {
      setWinningOdds([]);
    }
  };

  useEffect(() => {
    updateOdds();
  }, [selected]);

  const renderPlaceholders = (count) => {
    return Array.from({ length: count }, (_, index) => (
      <div key={index} className="Placecard">
        <img className="cardImage" src={BackofCard} alt="Placeholder" />
      </div>
    ));
  };

    return (
      <div>
        <h1>Heads Up Poker Odds Calculator</h1>
        <p className='directions'>Click the cards to create the hands and board. The board must have 0, 3, 4, or 5 cards to calculate the odds.</p>
        <div className='mainBody'>
        <div className='leftColumn'>
          <div className='displayHand'>
            <h3>Hand 1:</h3>
            
              <div>
                {selected.slice(0, 2).map((card, index) => (
                  <div key={index} className='Selectedcard'>
                    <img className="cardImage" src={card.src} alt={`${card.rank} of ${card.suit}`} />
                  </div>
                  
                ))}
                {renderPlaceholders(2 - selected.slice(0, 2).length)}
              </div>
            <p>Win Percentage: {hand1Percentage}</p>
          </div>
          <div className='displayHand'>
            <h3>Hand 2:</h3>
            <div>
              {selected.slice(2, 4).map((card, index) => (
                <div key={index} className='Selectedcard'>
                  <img className="cardImage" src={card.src} alt={`${card.rank} of ${card.suit}`} />
                </div>
              ))}
              {renderPlaceholders(2 - selected.slice(2, 4).length)}
            </div>
            <p>Win Percentage: {hand2Percentage}</p>
          </div>
          <div className='displayBoard'>
            <h3>Board:</h3>
              <div>
                {selected.slice(4,9).map((card, index) => (
                  <div key={index} className='Selectedcard'>
                    <img className="cardImage" src={card.src} alt={`${card.rank} of ${card.suit}`} />
                  </div>
                ))}
                {renderPlaceholders(5 - selected.slice(4, 9).length)}
                </div>
          </div>
          <div className='resetDiv'><div className='resetContainer'><button className='resetButton' onClick={() => setSelected([])}>Reset</button></div></div>
          </div>
        <div className='rightColumn'>
                  <div className='spacer'></div>
        {cards.map((card, index) => (
            <button key={index} 
              className={`cardbutton ${selected.some(
                (selectedCard) => selectedCard.rank === card.rank && selectedCard.suit === card.suit) ? "selected" : ""}`} 
              onClick={() => handleCardSelect(card)}>
                <img className="cardImage" src={card.src} alt={`${card.rank} of ${card.suit}`} />  
            </button>
        ))}
        </div>
        </div>
        
      </div>
    );

}

export default Home;