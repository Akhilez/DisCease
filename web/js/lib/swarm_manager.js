class SwarmManager {
  constructor(numAgents = 10, mutation = 0.01, diseaseIntroductionRate = 0.001) {
    this.agents = [];
    this.numAgents = numAgents;
    this.diseaseIntroductionRate = diseaseIntroductionRate;
    this.forceOfAttraction = 0.002;
    // TODO: Load the stored genes from JSON file at web/js/data/genes.json
    // TODO: Create all agents from the loaded genes.
  }

  initEpisode() {

    this.agents.sort((agent_1, agent_2) => agent_1.getScore() - agent_2.getScore());
    // TODO: Pick half of best

    // Add new agents into the mix
    for (let i = this.agents.length; i < this.numAgents; i++) {
      let agent = new Agent();
      // TODO: Give the new agent genes from roulette wheel (high prob to best gene (best = max of agent.getScore()))
      // TODO: Perform a perturbation of this.mutation on the genes.
      this.agents.push(agent);
    }

    for (let i = 0; i < this.numAgents; i++) {
      this.agents[i].location = createVector(random(10, width - 10), random(10, height - 10));
      this.agents[i].acceleration = createVector(random(-width, width), random(-height, height));
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

  displayAll() {
    this.agents.forEach(agent => agent.display());
  }

  introduceDisease(episodeManager) {
    if (episodeManager.timeStep === 0 || random() <= this.diseaseIntroductionRate) {
      let randomAgent = random(this.agents);
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
    return createVector(width / 2, height / 2); // This is a global center. Must be a group's center. group = agents of same health state
  }

  getGroupCenterVector(agent, center) {
    return p5.Vector.sub(center, agent.location).normalize().mult(this.forceOfAttraction); // Vector from agent to center.
  }

  reset(introductionRate) {
    this.diseaseIntroductionRate = introductionRate;
  }

}
