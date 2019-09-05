new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack() {
      let damage = this.calculateDamage(3, 10)
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits monster for ${damage}`
      })
      if (this.checkWin()) {
        return;
      }
      this.playerHealth -= this.calculateDamage(5, 12);

      this.checkWin();
    },
    specialAttack() {
      let damage = this.calculateDamage(3, 10);
      this.turns.unshift({
        isPlayer: false,
        text: `Player hits monster HARD for ${damage}`
      })
      this.monsterHealth -= this.calculateDamage(10, 20)
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks()
    },
    heal() {
      this.turns.unshift({
        isPlayer: false,
        text: `Player heals himself for 10`
      })
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100
      }
      // this.playerHealth += 10;
      this.monsterAttacks();
    },
    giveUp() {
      if (confirm('Are you sure you want to give up')) {
        this.gameIsRunning = false;
      }
    },
    monsterAttacks() {
      let damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: `Monster hits player for ${damage}`
      })
    },
    calculateDamage(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm('You won! New game??')) {
          this.startGame()
        } else {
          this.gameIsRunning = false
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm('You lost! New game??')) {
          this.startGame()
        } else {
          this.gameIsRunning = false
        }
        return true;
      }
      return false;
    }
  },
})