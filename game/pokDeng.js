import Deck from "./deck.js";

export default class PokDeng {
    constructor() {
        this.deck = new Deck();
        this.playerHand = [];
        this.dealerHand = [];
        this.totalChips = 0;
    }

    getHand(hand) {
        return `${hand[0].suit}-${hand[0].rank}, ${hand[1].suit}-${hand[1].rank}`;
    }

    getScore(hand) {
        let score = 0;
        for (const card of hand) {
            if (card.rank === 'King' || card.rank === 'Queen' || card.rank === 'Jack') {
                continue
            }
            else if (card.rank === 'Ace') {
                score += 1;
            }
            else {
                score += parseInt(card.rank);
            }
        }
        return score % 10;
    }

    play(bet) {
        this.deck.createDeck();
        this.deck.shuffle();

        this.playerHand = [this.deck.deal(), this.deck.deal()];
        this.dealerHand = [this.deck.deal(), this.deck.deal()];

        console.log("> You got", this.getHand(this.playerHand));
        console.log("> The dealer got", this.getHand(this.dealerHand));

        let result;

        const pScore = this.getScore(this.playerHand);
        const dScore = this.getScore(this.dealerHand);

        if(pScore > dScore) {
            console.log(`> You won!!!, received ${bet} chips\n`);
            result = bet;
        } 
        else if(pScore < dScore) {
            console.log(`> Dealer wins!, lost ${bet} chips\n`);
            result = -bet;
        }
        else {
            console.log(`> It's a tie! You get your chips back\n`);
            result = 0;
        }

        this.totalChips += result;
        return result;
    }
}
