import PokDeng from "./game/pokDeng.js"
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    const pokDeng = new PokDeng();

    while(true) {
        // Handle bet input and play
        let bet;
        do {
            const input = await new Promise((input) => rl.question(`> Please put your bet:\n> `, input));
            bet = parseInt(input);
            if(isNaN(bet) || bet <= 0) {
                console.log("> Invalid bet, please enter a positive number.");
            }
        } while(isNaN(bet) || bet <= 0);

        console.log("> You bet:", bet);
        console.log('');

        pokDeng.play(bet);

        // Handle play again input
        let playAgain;
        do {
            playAgain = (await new Promise((input) => rl.question(`> Wanna play more (Yes/No)?\n> `, input))).toLowerCase();
            console.log('');

            if(playAgain === 'no' || playAgain === 'n') {
                if(pokDeng.totalChips >= 0) {
                    console.log(`> You won total ${pokDeng.totalChips} chips`);
                }
                else {
                    console.log(`> You lost total ${Math.abs(pokDeng.totalChips)} chips`);
                }
                rl.close();
                return;
            }
            else if(playAgain !== 'yes' && playAgain !== 'y') {
                console.log("> Invalid input, please enter Yes or No.");
            }
        } while(playAgain !== 'yes' && playAgain !== 'y');
    }
}

main();