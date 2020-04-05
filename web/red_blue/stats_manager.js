class StatsManager {
  constructor(game) {
    this.game = game;

    this.currentTrail = {epochs: []};
    this.currentEpoch = {timeSteps: []};
    this.data = {trails: []};

    /*
    // sample data:
    let data = {
      avgHappiness: 0,
      avgNumHappyAgents: 10,
      trails: [
        {  // Trail 1
          epochs: [
            {
              avgHappiness: 123,
              timeSteps: [143, 122],
              numHappyAgents: 10,
            }
          ],
          avgHappiness: 123,
          numHappyAgents: 10,
        }
      ]
    };
    */

  }

  perTimeStep() {
    let happiness = this.game.grid.getAvgHappiness();
    this.currentEpoch.timeSteps.push(happiness);
    this.game.ui.updateTimeStep(happiness);
  }

  perEpoch() {
    this.currentEpoch.avgHappiness = 0;
    this.currentEpoch.timeSteps.forEach(timeStepHappiness => {
      this.currentEpoch.avgHappiness += timeStepHappiness
    });
    this.currentEpoch.avgHappiness /= this.currentEpoch.timeSteps.length;

    this.currentEpoch.numHappyAgents = this.game.grid.getNumHappyAgents();

    this.currentTrail.epochs.push(this.currentEpoch);
    this.game.ui.updateEpoch(this.currentEpoch);
    this.currentEpoch = {timeSteps: []};

  }

  perTrail() {
    this.currentTrail.avgHappiness = 0;
    this.currentTrail.epochs.forEach(epoch => {
      this.currentTrail.avgHappiness += epoch.avgHappiness
    });
    this.currentTrail.avgHappiness /= this.currentTrail.epochs.length;

    this.currentTrail.numHappyAgents = this.currentTrail.epochs[this.currentTrail.epochs.length - 1].numHappyAgents;

    this.data.trails.push(this.currentTrail);
    this.game.ui.updateTrail(this.currentTrail);
    this.currentTrail = {epochs: []};
  }

  atEnd(){
    this.data.avgHappiness = 0;
    this.data.avgNumHappyAgents = 0;
    this.data.trails.forEach(trail => {
      this.data.avgHappiness += trail.avgHappiness;
      this.data.avgNumHappyAgents += trail.numHappyAgents
    });
    this.data.avgHappiness /= this.data.trails.length;
    this.data.avgNumHappyAgents /= this.data.trails.length;

    this.game.ui.updateAtEnd(this.data);
  }

}
