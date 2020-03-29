# DisCease

By Akhil Devarshetti and Jenna Sawaf

A Complex Systems Project

### Main Idea
Our project is a genetic algorithm that optimizes the rules to minimize the deaths by an infection.

## Implementation:
### World:
  - Consists of freely moving agents.
  - An episode lasts for 30 seconds.
  - Has 2 global variables: Infection rate and immunization rate.
  - At time 0, a random agent would be infected.
  - The score of an episode = 1 - Total number of deaths / Total population.
  - Population for the next episode is chosen in a hybrid fashion - a mix of the most robust agents, a roulette wheel probability with mutations. We would also add random agents to balance out the dead ones.
### Agent:
  - Can move at a variable speed.
  - Never bumps into anything in the environment.
  - Can see other agents within a range.
  - Internal state:
    - One variable to store the agent’s current health status.
    - Number of times diseased.
    - Number of episodes survived.
  - Can identify whether an agent seen is [diseased, healthy, immunized] with a certain probability.
  - Disease may be transmitted from a neighbouring infected agent with a probability multiplied by infection rate.
  - If diseased, an agent can recover with a probability of (1 - immunization rate) within 5 seconds or get immunized by a probability multiplied by immunization rate or die.
  - For each neighbouring agent S of an agent A, A can move away or closer to S based on S’ health condition with a unique and fixed probability.
    - For example, an agent might move away from an infected agent with probability 0.7, it might move closer to a healthy agent with probability 0.4 and away from an immunized person with 0.6 probability.
  - The direction and magnitude of an agent’s next move will be an average of all of its direction vectors.
  - An agent’s genetic information will include an array of 3 probability numbers, one for each medical condition of a neighbour. A positive probability is attraction, negative probability is repulsion.
  - The emergent phenomenon we’re hoping to find is:
      - All infected agents will form a cluster and all healthy/immunized will form another cluster.
      - If we introduce an immunocompromised sub-population, we would love to see this group guarded by a layer of immunized agents.

## Purpose of our idea
Our project will be able to show us the impact of spreading diseases based on changeable parameters such as population, rate of disease growth, rate of immunization, etc. 
When you get immunized, you do it for your own safety. But the side effect of getting immunization is that you not only get immune to the disease, but you also stop spreading the disease to others in the surrounding. This will result in suppression of the disease. This phenomenon is called herd immunity.
## Importance of our idea.
This topic is important because it will keep the general population informed on viruses that are spreading. For example, during 2020 the spread of the Corona Virus has been something people are terrified of. Applying complex systems thinking to dealing with viruses would help understanding the nature of epidemics and estimate the parameters required to eradicate the disease. This will also help people understand that taking a vaccine is not only helpful to the individual, but also beneficial for the people they interact with. This might also help discover potential new rules to follow to eradicate certain diseases.

## Bibliography
[1] http://rocs.hu-berlin.de/D3/herd/

[2] https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3154209/

[3] https://bmcpublichealth.biomedcentral.com/articles/10.1186/s12889-018-5709-x

[4]https://towardsdatascience.com/modelling-the-coronavirus-epidemic-spreading-in-a-city-with-python-babd14d82fa2 (all about corona)

[5] The PCA algorithm.

# TODO:
 - Go through the following resources:
   - https://youtu.be/gxAaO2rsdIs
   - https://twitter.com/harry_stevens/status/1238940084994523136?s=12
   - https://www.whitehouse.gov/briefings-statements/call-action-tech-community-new-machine-readable-covid-19-dataset/?utm_source=link&utm_medium=header
