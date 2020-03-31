class ParameterInjector {
  static instance = null;

  constructor() {
    this.params = {
      episodeParams: {
        framesPerTimeStep: 3,
        timeStepsPerEpisode: 100,
      },
      swarmParams: {
        numAgents: 50,
        mutation: 0.1,
        diseaseIntroductionRate: 0.01,
        forceOfAttraction: 0.002,
      },
      uiParams: {
        side: 300,
        fps: 60,
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
