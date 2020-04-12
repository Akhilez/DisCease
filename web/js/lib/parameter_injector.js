class ParameterInjector {
  static instance = null;

  constructor() {
    this.params = {
      episodeParams: {
        framesPerTimeStep: 3,
        timeStepsPerEpisode: 100,
      },
      swarmParams: {
        numAgents: 150,
        mutation: 0.1,
        diseaseIntroductionRate: 0.01,
        forceOfAttraction: 0.002,  // global force
        diseaseIdentificationProbability: 1,
        contagionRate: 0.1,
        visualRange: 30,
        zombificationRate: 0.0001,
        deathRate: 0,
        immunizationRate: 0.0005,
        immunizationLossRate: 0.0001,
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
