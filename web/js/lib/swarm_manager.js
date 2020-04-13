class SwarmManager {

  constructor(game) {
    this.game = game;
    game.paramsInjector.register(this);

    this.updateParams();

    this.agents = [];

    // TODO: Load the stored genes from JSON file at web/js/data/genes.json
    // TODO: Create all agents from the loaded genes.
  }

  updateParams() {
    let params = this.game.paramsInjector.params.swarmParams;
    this.numAgents = params.numAgents;
    this.diseaseIntroductionRate = params.diseaseIntroductionRate;
    this.forceOfAttraction = params.forceOfAttraction;
    this.contagionRate = params.contagionRate;
    this.immunizationRate = params.immunizationRate;
    this.zombificationRate = params.zombificationRate;
    this.diseaseIdentificationProbability = params.diseaseIdentificationProbability;
    this.immunizationLossRate = params.immunizationLossRate;
    this.visualRange = params.visualRange;
    this.boxPadding = 10;
  }

  initEpisode() {

    this.populateWithAgents();

    // Randomize their positions and make them healthy
    this.agents.forEach((agent) => agent.initState());

  }

  populateWithAgents() {
    if (this.agents.length === 0) {
      for (let i = 0; i < this.numAgents; i++)
        this.agents.push(new Agent(this.game));
      return;
    }

    this.agents.sort((agent_1, agent_2) => agent_1.getScore() - agent_2.getScore());
    let nextGenAgents = this.agents.slice(0, this.numAgents / 2);
    this.mutate(nextGenAgents);

    // Add new agents into the mix
    let rouletteWheelAgents = this.getRouletteWheelAgents();
    for (let i = nextGenAgents.length; i < this.numAgents; i++) {
      if (Math.random() < 0.5) {
        nextGenAgents.push(new Agent(this.game));
      } else {
        nextGenAgents.push(new Agent(this.game));
        //nextGenAgents.push(rouletteWheelAgents[Math.floor(Math.random() * rouletteWheelAgents.length)]);
      }
    }

    this.agents = nextGenAgents;
  }

  getRouletteWheelAgents() {
    // Give the new agent genes from roulette wheel (high prob to best gene (best = max of agent.getScore()))
    let agentProbabilities = this.getRouletteWheelProbabilities();
    let agentToPick = [];
    for (let i = 0; i < agentProbabilities.length; i++) {
      let agentCount = agentProbabilities[i] * this.numAgents;
      for (let j = 0; j < agentCount; j++) {
        agentToPick.push(new Agent(this.game, this.agents[i].deflections));
      }
    }
    return agentToPick;
  }

  getRouletteWheelProbabilities() {
    let scores = this.agents.map((agent) => agent.getScore());
    let maxScore = Math.max(...scores);
    let minScore = Math.min(...scores);
    scores = scores.map((score) => (score - minScore) / (maxScore - minScore + 1));
    return scores;
  }

  mutate(agents) {
    // TODO: Perform a perturbation of this.mutation on the genes.

  }

  finishEpisode() {
    // TODO: Store genes to json file.

    // Remove dead ones.
    // this.aliveAgents = this.agents.filter(agent => agent.healthState !== state.dead);
  }

  updateAll(episodeManager) {
    this.introduceDisease(episodeManager);
    this.agents.forEach(agent => agent.update(this.agents));
    // let groupCenters = this.getGroupCenters();
    // this.agents.forEach(agent => agent.applyForce(this.getGroupCenterVector(agent, groupCenters[agent.healthState])))
  }

  displayAll(sketch) {
    this.agents.forEach(agent => agent.display(sketch));
    sketch.stroke(150);
    sketch.noFill();
    let side = this.game.paramsInjector.params.uiParams.side;
    sketch.rect(this.boxPadding, this.boxPadding, side - 2 * this.boxPadding, side - 2 * this.boxPadding);
  }

  introduceDisease(episodeManager) {
    if (episodeManager.timeStep === 0 || this.game.p5.random() <= this.diseaseIntroductionRate) {
      let randomAgent = this.game.p5.random(this.agents);
      if (randomAgent.healthState !== state.dead)
        randomAgent.healthState = state.diseased;
      else this.introduceDisease(episodeManager);
    }
  }

  getGroupCenters() {
    return {
      'diseased': this.getGroupCenter(state.diseased),
      'healthy': this.getGroupCenter(state.healthy),
      'immune': this.getGroupCenter(state.immune),
      'zombie': this.getGroupCenter(state.zombie),
      'dead': this.getGroupCenter(state.dead),
    }
  }

  getGroupCenter(group) {
    let side = this.game.paramsInjector.params.uiParams.side;
    return this.game.p5.createVector(side / 2, side / 2); // TODO: This is a global center. Must be a group's center. group = agents of same health state
  }

  getGroupCenterVector(agent, center) {
    return p5.Vector.sub(center, agent.location).normalize().mult(this.forceOfAttraction); // Vector from agent to center.
  }

  reset(introductionRate) {
    this.diseaseIntroductionRate = introductionRate;
  }

}
