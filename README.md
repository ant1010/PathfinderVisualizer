# PathfinderVisualizer

Welcome! This is my pathfinding visualizer I build with react. Inspiration behind it was simply to familiraize myself with react and to strengthen my familiarity with pathfinding algorithms. I found the nature of these algorithms to be easier understood when applied visually. This project is still being worked on  but you can test out the application here! [Pathfinding Visualizer](https://pathfinder-visualizer-theta.vercel.app)

##What was learned?
Aside from learning react basics. Applying pathfinding algorithms visually was a valuable experience. I leaarned It's important not only to know how these algorithms work but also to implement them efficiently depending on your needs. For example, I ran into performance and "lag" issues when animating the pathfinder in action. My first few implementations where "naive"; These required me to further analyze time complexitites of the algorithms in order isolate relevent bottlenecks. Also, understaning how react interacts with the DOM and the relationship between state and what is rendered and when, was crucial to nail delay and timing issues.

##Algorithms Explored
- Djikstras : A greedy pathfinding algorithm that chooses the lowest local path while updating nodes on that path.
- A* : A pathfinding algorithm that uses hueristics to find the best local path, a bit like djikstra in nature only you give it a "hint" or "push" towards
the goal.
- Kruskal's : An algorithms that produces a minimun spanning tree wich was used for generating ranadom mazes.

##UI feaures 
- Tabs: I made it possible to have multiple mazes to help me make comparisons between algoritms and different paths.
