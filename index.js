let player = {
    name: prompt("Hi, What is your name?"),
    chips: 100
    }

let cardPack = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

let cardPic = [
    "/images/ace-hearts.png", // 0
    "/images/2-hearts.png", // 1
    "/images/3-hearts.png", // 2
    "/images/4-hearts.png", // 3
    "/images/5-hearts.png", // 4
    "/images/6-hearts.png", // 5
    "/images/7-hearts.png", // 6
    "/images/8-hearts.png", // 7
    "/images/9-hearts.png", // 8
    "/images/10-hearts.png", // 9
    "/images/jack-hearts.png", // 10
    "/images/queen-hearts.png", // 11
    "/images/king-hearts.png", // 12
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

    if (houseSum === 21){
        houseBlackJack = true;
    }
    console.log(houseCards);
    // houseCardsEl.textContent = "Dealer's Cards: " + houseCards[0] + " -";
    displayCard(houseCard1[2] - 1, "house");
    displayCard(13, "house");
    houseSumEl.textContent = "Dealer's Sum: "
    console.log(houseCard1);
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

    randomNum[2] = Math.floor(Math.random() * 13 + 1);
    if (randomNum[2] === 1) {
        randomNum[0] = 11;
    } else if (randomNum[2] >= 11) {
        randomNum[0] = 10;
    } else {
        randomNum[0] = randomNum[2];
    }
    randomNum[1] = cardPack[randomNum[2]-1];
    return randomNum;
}