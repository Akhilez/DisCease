class SwarmManager {

  constructor(game) {
    this.game = game;
    game.paramsInjector.register(this);

    this.numAgents = null;
    this.diseaseIntroductionRate = null;
    this.forceOfAttraction = null;
    this.contagionRate = null;

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
  }

  initEpisode(diseaseProbability, deathRate, ImmunizationRate) {

    this.agents.sort((agent_1, agent_2) => agent_1.getScore() - agent_2.getScore());
    // TODO: Pick half of best

    // Add new agents into the mix
    for (let i = this.agents.length; i < this.numAgents; i++) {
      let agent = new Agent(this.game, diseaseProbability, deathRate, ImmunizationRate);
      // TODO: Give the new agent genes from roulette wheel (high prob to best gene (best = max of agent.getScore()))
      // TODO: Perform a perturbation of this.mutation on the genes.
      this.agents.push(agent);
    }

    for (let i = 0; i < this.numAgents; i++) {
      let side = this.game.paramsInjector.params.uiParams.side;
      this.agents[i].location = this.game.p5.createVector(this.game.p5.random(10, side - 10), this.game.p5.random(10, side - 10));
      this.agents[i].acceleration = this.game.p5.createVector(this.game.p5.random(-side, side), this.game.p5.random(-side, side));
      this.agents[i].healthState = state.healthy;
    }

  }

  finishEpisode() {
    // TODO: Store genes to json file.

    // Remove dead ones.
    this.agents = this.agents.filter(agent => agent.healthState !== state.dead);
  }

  updateAll(episodeManager) {
    this.introduceDisease(episodeManager);
    this.agents.forEach(agent => agent.update(this.agents));
    let groupCenters = this.getGroupCenters();
    this.agents.forEach(agent => agent.applyForce(this.getGroupCenterVector(agent, groupCenters[agent.healthState])))
  }

  displayAll(sketch) {
    this.agents.forEach(agent => agent.display(sketch));
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
    return this.game.p5.createVector( side / 2, side / 2); // This is a global center. Must be a group's center. group = agents of same health state
  }

  getGroupCenterVector(agent, center) {
    return p5.Vector.sub(center, agent.location).normalize().mult(this.forceOfAttraction); // Vector from agent to center.
  }

  reset(introductionRate) {
    this.diseaseIntroductionRate = introductionRate;
  }

}
