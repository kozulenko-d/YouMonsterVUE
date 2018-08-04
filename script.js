new Vue ({
    el: '#app',
    data : {
        gameOn: false,
        yourHealth: 100,
        monstersHealth: 100,
        gameLog: [],
        end: false,
        victory: ''
    },
    methods: {
        attacking() {
            return Math.floor(Math.random() * (8 - 4)) + 4;
        },
        specialAttacking() {
            return Math.floor(Math.random() * (11 - 1)) + 1;
        },
        healing(){
            return Math.floor(Math.random() * (7 - 5)) + 5;
        },
        attack() {
            let you = this.attacking();
            let monster = this.attacking();
            this.yourHealth -= monster;
            this.monstersHealth -= you;
            this.gameLog.push({
                text: `You hit monster (${you} points)`,
                class: 'player-turn'
            });
            this.gameLog.push({
                text: `Monster hit you (${monster} points)`,
                class: `monster-turn`
            });
        },
        specialAttack() {
            let you = this.specialAttacking();
            let monster = this.attacking();
            this.yourHealth -= monster;
            this.monstersHealth -= you;
            this.gameLog.push({
                text: `You hit monster (${you} points)`,
                class: 'player-turn'
            });
            this.gameLog.push({
                text: `Monster hit you (${monster} points)`,
                class: `monster-turn`
            });
        },
        heal() {
            let you = this.healing();
            let monster = this.attacking();
            this.yourHealth = this.yourHealth + you - monster;
            this.gameLog.push({
                text: `You heal yourself (${you} points)`,
                class: 'player-turn'
            });
            this.gameLog.push({
                text: `Monster hit you (${monster} points)`,
                class: `monster-turn`
            });
        },
        toStart(b) {
            this.gameOn = b;
            this.end = false;
            this.gameLog = [];
            this.yourHealth = 100;
            this.monstersHealth = 100;
        }
    },
    computed: {
        list() {
            return [...this.gameLog].reverse();
        }
    },
    watch: {
        yourHealth() {
            if (this.yourHealth < 1) {
                this.end = true;
                this.victory = 'MONSTER WON!';
            }
        },
        monstersHealth() {
            if (this.monstersHealth < 1) {
                this.end = true;
                this.victory = 'YOU WON!'
            }
        }
    }
});