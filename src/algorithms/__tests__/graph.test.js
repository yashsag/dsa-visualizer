import { buildChainGraph } from "../helpers";
import dijkstra from "../graph/dijkstra";

const bruteForceDistances = (nodes, edges) => {
  const dist = new Map(nodes.map((n) => [n.id, Infinity]));
  dist.set(0, 0);
  for (let i = 0; i < nodes.length; i += 1) {
    edges.forEach((edge) => {
      const a = dist.get(edge.source);
      const b = dist.get(edge.target);
      if (a + edge.weight < b) dist.set(edge.target, a + edge.weight);
      if (b + edge.weight < a) dist.set(edge.source, b + edge.weight);
    });
  }
  return dist;
};

describe("dijkstra", () => {
  test("matches brute-force shortest distances", () => {
    [2, 5, 8].forEach((size) => {
      const input = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
      const { nodes, edges } = buildChainGraph(input);
      const expected = bruteForceDistances(nodes, edges);

      const steps = dijkstra.generateSteps(input);
      const last = steps[steps.length - 1];
      expect(last.visitedNodes.length).toBe(size);

      // subtitle encodes "label: dist" pairs in node order, reconstruct and compare
      const parsed = last.data.subtitle.split(", ").map((entry) => entry.split(": ")[1]);
      nodes.forEach((node, index) => {
        const expectedValue = expected.get(node.id);
        const expectedText = expectedValue === Infinity ? "inf" : String(expectedValue);
        expect(parsed[index]).toBe(expectedText);
      });
    });
  });
});
