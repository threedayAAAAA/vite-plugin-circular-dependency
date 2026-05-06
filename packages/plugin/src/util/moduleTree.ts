import type { ModuleNode } from "../module/moduleNode";

/** Generate the dependency tree of modules */
export function generateModuleTree(
  rootModuleNode: ModuleNode,
  moduleIdNodeMap: Map<string, ModuleNode>
) {
  const moduleNodeCreatedSet = new Set<string>();

  /** Get child module nodes of a specific module */
  function getModuleChildNodes(node: ModuleNode): ModuleNode[] {
    const { importerModuleIds } = node;
    return importerModuleIds
      .map((moduleId) => moduleIdNodeMap.get(moduleId))
      .filter(Boolean) as ModuleNode[];
  }

  /** Depth-first traversal to generate the module dependency tree */
  function recursionBuild(node: ModuleNode) {
    // Add the current node to the created set to avoid self-referencing
    moduleNodeCreatedSet.add(node.moduleId);
    // Get child module nodes
    const childNodes = getModuleChildNodes(node);
    childNodes.forEach((childNode) => {
      // If the current subtree is not generated, continue recursion
      if (!moduleNodeCreatedSet.has(childNode.moduleId)) {
        recursionBuild(childNode);
      }
      // Associate the current subtree with the parent node
      if (!node.children) {
        node.children = new Set();
      }
      node.children.add(childNode);
    });
  }
  recursionBuild(rootModuleNode);
}

/** Generate a map of nodes that form cycles */
export function generateCircleNodeMap(rootModuleNode: ModuleNode) {
  // Map to store nodes with circular dependencies found during traversal
  const circleNodesMap = new Map<string, ModuleNode[]>();
  // Set to store nodes that have been DFS traversed to avoid re-traversal
  const visitedNodeIdSet = new Set<string>();

  /** Depth-first traversal of the tree, recording nodes along the way. If a node is found in the path, it indicates a cycle */
  function depthFirstTraversal(node: ModuleNode, visitPathSet: Set<string>) {
    const { moduleId, children } = node;
    // End if already visited
    if (visitedNodeIdSet.has(moduleId)) {
      return;
    }
    // Add the current node to the path to avoid self-referencing
    visitPathSet.add(moduleId);
    children?.forEach((childNode) => {
      const { moduleId: childModuleId } = childNode;
      if (visitPathSet.has(childModuleId)) {
        insertCircleNodesToMap(
          generateCircleNodes(childNode, visitPathSet),
          circleNodesMap
        );
        return;
      } else {
        depthFirstTraversal(childNode, visitPathSet);
      }
    });
    visitedNodeIdSet.add(moduleId);
    // Remove the current node from the path
    visitPathSet.delete(moduleId);
  }

  depthFirstTraversal(rootModuleNode, new Set());
  return circleNodesMap;
}

/** Generate all nodes on the cycle of a specific node */
function generateCircleNodes(
  node: ModuleNode,
  visitPathSet: Set<string>
): ModuleNode[] {
  const result: ModuleNode[] = [];
  let currentNode: ModuleNode | undefined = node;
  do {
    result.push(currentNode);
    if (!currentNode.children) {
      break;
    }
    currentNode = Array.from(currentNode.children).find((item) =>
      visitPathSet.has(item.moduleId) && !result.includes(item)
    );
  } while (currentNode && currentNode !== node);
  return result;
}

/** Insert cycle nodes into the map */
function insertCircleNodesToMap(
  circleNodes: ModuleNode[],
  circleNodesMap: Map<string, ModuleNode[]>
) {
  const sortedCircleNodes = circleNodes.sort((pre, next) =>
    pre.moduleId < next.moduleId ? -1 : 1
  );
  const circleId = sortedCircleNodes.map((item) => item.moduleId).join("-");
  circleNodesMap.set(circleId, sortedCircleNodes);
}
