new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameRunning: false,
        turns: [

        ]
    },
    methods: {
        startGame() {
            this.gameRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack() {
            // Player attack
            let damage = this.calculateHealthChange(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                // ! IMPORTANT - this object structure is how to bind to the <li> in the log.  Tricky :)
                isPlayer: true,
                text: `Player hits for for ${ damage } damage!`
            });
            console.log(this.turns);
            // check to see if monster damage causes win, if so, need to break out
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack();
        },
        specAttack() {
            // Special Player attack
            let specDamage = this.calculateHealthChange(5, 20);
            this.monsterHealth -= specDamage;
            // check to see if monster damage causes win, if so, need to break out
            if (this.checkWin()) {
                return;
            }
            this.turns.unshift({
                isPlayer: true,
                text: `Player lands a heroic blow for ${ specDamage } rending damage!!!`
            })
            this.monsterAttack();
        },
        // Calculate monster attack and check for win
        monsterAttack() {
            // Monster attack
            let damage = this.calculateHealthChange(5, 12);
            this.playerHealth -= damage;
            // check to see if monster won.
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: `Monster slashes for ${ damage } damage!`
            });
        },
        healPlayer() {
            // Heal action for player
            let heal = 10;
            if (this.playerHealth >= 90) {
                this.playerHealth = 100;
            }
            this.playerHealth += heal;
            this.turns.unshift({
                isPlayer: true,
                text: `Player regains ${ heal } soothing health!!`
            })
            this.monsterAttack();
        },
        // Ends the game status, resets view
        giveUp() {
            this.gameRunning = false;
            this.turns = [];
        },
        // helper function for calculating damage and healing
        calculateHealthChange(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        // helper function for checking win conditions
        checkWin() {
            if (this.monsterHealth <= 0) {
                if (confirm("You won! New Game??")) {
                    this.startGame();
                } else {
                    this.gameRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm("You lost! Another Game?")) {
                    this.startGame();
                } else {
                    this.gameRunning = false;
                }
                return true;
            }
            // need this, as we need a boolean for when we call this helper
            return false;
        }
    }
});
