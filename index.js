let player = {
    name: prompt("Hi, What is your name?"),
    chips: 100
    }

//let cardPack = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
let cardPack = ["A", "A", "A", "A", 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, "J", "J", "J", "J", "Q", "Q", "Q", "Q", "K", "K", "K", "K"];

let cardPic = [
    "/images/ace-hearts.png", // 0
    "/images/ace-clubs.png", // 0
    "/images/ace-spades.png", // 0
    "/images/ace-diamonds.png", // 0
    "/images/2-hearts.png", // 1
    "/images/2-clubs.png", // 1
    "/images/2-spades.png", // 1
    "/images/2-diamonds.png", // 1
    "/images/3-hearts.png", // 2
    "/images/3-clubs.png", // 2
    "/images/3-spades.png", // 2
    "/images/3-diamonds.png", // 2
    "/images/4-hearts.png", // 3
    "/images/4-clubs.png", // 3
    "/images/4-spades.png", // 3
    "/images/4-diamonds.png", // 3
    "/images/5-hearts.png", // 4
    "/images/5-clubs.png", // 4
    "/images/5-spades.png", // 4
    "/images/5-diamonds.png", // 4
    "/images/6-hearts.png", // 5
    "/images/6-clubs.png", // 5
    "/images/6-spades.png", // 5
    "/images/6-diamonds.png", // 5
    "/images/7-hearts.png", // 6
    "/images/7-clubs.png", // 6
    "/images/7-spades.png", // 6
    "/images/7-diamonds.png", // 6
    "/images/8-hearts.png", // 7
    "/images/8-clubs.png", // 7
    "/images/8-spades.png", // 7
    "/images/8-diamonds.png", // 7
    "/images/9-hearts.png", // 8
    "/images/9-clubs.png", // 8
    "/images/9-spades.png", // 8
    "/images/9-diamonds.png", // 8
    "/images/10-hearts.png", // 9
    "/images/10-clubs.png", // 9
    "/images/10-spades.png", // 9
    "/images/10-diamonds.png", // 9
    "/images/jack-hearts.png", // 10
    "/images/jack-clubs.png", // 10
    "/images/jack-spades.png", // 10
    "/images/jack-diamonds.png", // 10
    "/images/queen-hearts.png", // 11
    "/images/queen-clubs.png", // 11
    "/images/queen-spades.png", // 11
    "/images/queen-diamonds.png", // 11
    "/images/king-hearts.png", // 12
    "/images/king-clubs.png", // 12
    "/images/king-spades.png", // 12
    "/images/king-diamonds.png", // 12
    "/images/back-side.jpg" // 13
]

let age = 22
    guestCards = []
    hasBlackJack = false
    isAlive = false
    message = ""
    messageEl = document.getElementById('message-el')
    guestSumEl = document.getElementById('guest-sum-el')
    guestCardsEl = document.getElementById('guest-cards-el')
    playerEl = document.getElementById('player-el')
    guestSum = 0
    houseSumEl = document.getElementById('house-sum-el')
    houseCardsEl = document.getElementById('house-cards-el')
    houseSum = 0
    gameEnd = true
    guestCardImages = document.querySelector("#guest-card-images")
    houseCardImages = document.querySelector("#house-card-images");
    
playerEl.textContent = player.name + ": $" + player.chips;

function displayCard(crd, who) {
    let img = document.createElement("img");
    img.appendChild(document.createTextNode("Test"));
    img.src = cardPic[crd];
    if (who === "guest") {
        guestCardImages.appendChild(img);
    } else if (who === "house") {
        houseCardImages.appendChild(img);
    } else if (who === "house2") {
        houseCardImages.appendChild(img);
    }
}

function cleanTable() {
    while (guestCardImages.firstChild) {
        guestCardImages.removeChild(guestCardImages.firstChild);
    }
    while (houseCardImages.firstChild) {
        houseCardImages.removeChild(houseCardImages.firstChild);
    }
}

function dealGuest() {
    console.clear();
    cardPack = ["A", "A", "A", "A", 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, "J", "J", "J", "J", "Q", "Q", "Q", "Q", "K", "K", "K", "K"];

    let guestCard1 = getRandomCard()
        guestCard2 = getRandomCard()
        guestCards = [guestCard1[1], guestCard2[1]]
        isAlive = true
        hasBlackJack = false
        guestSum = guestCard1[0] + guestCard2[0];
    
    if (gameEnd === false) {
        youLose();
    }

    
    cleanTable();
    gameEnd = false;
    // guestCardsEl.textContent = "Your Cards: " + guestCards;
    displayCard(guestCard1[2] - 1, "guest");
    displayCard(guestCard2[2] - 1, "guest");
    guestSumEl.textContent = "Your Sum: " + guestSum;
    if (guestSum === 21) {
        hasBlackJack = true;
        renderGame();
    } else {
        dealHouse();
        messageEl.textContent = "Waiting for your next call...";
    }
}

function dealHouse() {
    let houseCard1 = getRandomCard()
        houseCard2 = getRandomCard()
        houseCards = [houseCard1[1], houseCard2[1]]
        houseAlive = true
        houseBlackJack = false
        houseSum = houseCard1[0] + houseCard2[0];

    if (houseSum === 21) {
        houseBlackJack = true;
    }
    //console.log(houseCards);
    // houseCardsEl.textContent = "Dealer's Cards: " + houseCards[0] + " -";
    displayCard(houseCard1[2] - 1, "house");
    displayCard(52, "house");
    houseSumEl.textContent = "Dealer's Sum: "
    //console.log(houseCard1);
}

function renderGame() {
    if (gameEnd === false) {
        newCardDealer()

        if (isAlive === true) { // guest alive
            if (houseAlive === true) { // house alive
                if (hasBlackJack === false) { // no guest BJ
                    if (houseBlackJack === false) { // no BJ at all
                        if (guestSum > houseSum) {
                            message = "You win this round!"; // W
                            youWin();
                        } else if (guestSum < houseSum) {
                            message = "You lose..."; // L
                            youLose();
                        } else { // equals
                            message = "It's a draw..."; // D
                            gameEnd = true;
                        }
                    } else { // only house BJ
                        message = "Dealer has BlackJack! You lose..."; // L
                        youLose();
                    }
                } else { // guest BJ
                    if (houseBlackJack === true) { // both BJ
                        message = "It's a draw..."; // D
                        gameEnd = true;
                    } else { // only guest BJ
                        message = "You've got BlackJack!"; // W
                        youWin();
                    }
                }
            } else { // only house burnt
                message = "You win this round!"; // W
                youWin();
            }
        } else { // guest burnt
            message = "Burnt! You lose..."; // L
            youLose();
        }
        messageEl.textContent = message;
    }

}

function youWin() {
    player.chips += 10;
    playerEl.textContent = player.name + ": $" + player.chips;
    gameEnd = true;
}

function youLose() {
    player.chips -= 10;
    playerEl.textContent = player.name + ": $" + player.chips;
    gameEnd = true;
}

function newCard() {
    if (isAlive === true && hasBlackJack === false && gameEnd === false) {
        let card = getRandomCard();

        guestCards.push(card[1]);
        guestSum += card[0];
        if (guestSum > 21) {
            isAlive = false;
            renderGame();
        }
        // guestCardsEl.textContent = "Your Cards: " + guestCards;
        displayCard(card[2] - 1, "guest");
        guestSumEl.textContent = "Your Sum: " + guestSum;
    }
}

function newCardDealer() {
    let cardHouse = houseCard2;

    houseCardImages.removeChild(houseCardImages.lastChild);
    displayCard(cardHouse[2] - 1, "house2");
    while (houseSum < 17) {
        cardHouse = getRandomCard();
        houseCards.push(cardHouse[1]);
        displayCard(cardHouse[2] - 1, "house2");
        houseSum += cardHouse[0];
    }
    if (houseSum > 21) {
        houseAlive = false;
    }
    // houseCardsEl.textContent = "Dealer's Cards: " + houseCards;
    houseSumEl.textContent = "Dealer's Sum: " + houseSum;
}

function getRandomCard() { // [value, name, position]
    let randomNum = [];

    randomNum[1] = "no";
    while (randomNum[1] === "no") {
        randomNum[2] = Math.floor(Math.random() * cardPack.length + 1);
        if ((randomNum[2] >= 1) && (randomNum[2] <= 4)) { // A
            randomNum[0] = 11;
        } else if (randomNum[2] >= 41) { // Picture
            randomNum[0] = 10;
        } else { // Number
            randomNum[0] = Math.floor(((randomNum[2]) / 4));
            if ((randomNum[2] % 4) !== 0) {randomNum[0]++}
        }
        randomNum[1] = cardPack[randomNum[2] - 1];
    }

    cardPack.splice(randomNum[2] - 1, 1, "no");
    console.log(`The card ${randomNum[1]} was chosen.`);
    console.log(`with position ${randomNum[2]} and value of ${randomNum[0]}`);
    console.log(cardPack);
    return randomNum;
}

console.log(cardPack);