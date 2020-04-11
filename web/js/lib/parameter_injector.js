class ParameterInjector {
  static instance = null;

  constructor() {
    this.params = {
      episodeParams: {
        framesPerTimeStep: 3,
        timeStepsPerEpisode: 100,
      },
      swarmParams: {
        numAgents: 100,
        mutation: 0.1,
        diseaseIntroductionRate: 0.01,
        forceOfAttraction: 0.002,  // global force
        diseaseIdentificationProbability: 0,
        contagionRate: 0,
        visualRange: 0,
        zombificationRate: 0,
        deathRate: 0,
        immunizationRate: 0,
        immunizationLossRate: 0,
      },
      uiParams: {
        side: 300,
        fps: 24,
      },
    };
    this.clients = [];
  }

  static getInstance() {
    if (ParameterInjector.instance === null)
      ParameterInjector.instance = new ParameterInjector();
    return ParameterInjector.instance;
  }

  register(client) {
    this.clients.push(client);
  }

  updateAll() {
    this.clients.forEach(client => client.updateParams());
  }

}
