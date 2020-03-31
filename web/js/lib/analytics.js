class Stats {
  constructor(game) {
    this.game = game;
  }

  update() {
    $("#message_p").html("Episode: " + this.game.episodeManager.episode);
  }
}


