# Schelling's model of segregation


### Parameters:
```yaml

Grid side (L): 50
Number of cells: 50 * 50 = 2500
Number of agents: 2500 * 0.9 = 2250
Number of agents of same type: 2250 / 2 = 1125

Random Relocation:
    maxNumberOfRandomChecks (q): 100

Social Relocation:
    Number of friends (n): 25
    Side of neighborhood square (q): 7

Number of epochs: 15
NUmber of trails: 30

```

### TODO
```yaml
 - Calculate the fraction of agents happy and draw those graphs.
 - Calculate standard deviation of the happiness, not just mean.
 - Vary n and p systematically.
    - n = [5, 10, 20, 25]
    - p = [3, 5, 7]
 - policy 2 cases in the same plot.

```
