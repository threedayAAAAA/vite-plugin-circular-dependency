import type { ModuleNode } from "../module/moduleNode";

/** 生成模块的依赖树 */
export function generateModuleTree(
  rootModuleNode: ModuleNode,
  moduleIdNodeMap: Map<string, ModuleNode>
) {
  const moduleNodeCreatedSet = new Set<string>();

  /** 获取某个模块子模块节点 */
  function getModuleChildNodes(node: ModuleNode): ModuleNode[] {
    const { importerModuleIds } = node;
    return importerModuleIds
      .map((moduleId) => moduleIdNodeMap.get(moduleId))
      .filter(Boolean) as ModuleNode[];
  }

  /** 深度优先遍历生成模块依赖树 */
  function recursionBuild(node: ModuleNode) {
    // 每次遍历先把自己放入已生成的set中 避免自己引用自己的场景
    moduleNodeCreatedSet.add(node.moduleId);
    // 获取子模块节点
    const childNodes = getModuleChildNodes(node);
    childNodes.forEach((childNode) => {
      // 当前子树未生成 接着递归
      if (!moduleNodeCreatedSet.has(childNode.moduleId)) {
        recursionBuild(childNode);
      }
      // 将当前子树与父节点关联
      if (!node.children) {
        node.children = new Set();
      }
      node.children.add(childNode);
    });
  }
  recursionBuild(rootModuleNode);
}

/** 生成模块成环节点的map */
export function generateCircleNodeMap(rootModuleNode: ModuleNode) {
  // 用来存最后遍历出来的有循环依赖的节点
  const circleNodesMap = new Map<string, ModuleNode[]>();
  // 将已经dfs过的节点存起来 避免重复遍历
  const visitedNodeIdSet = new Set<string>();

  /** 深度优先遍历树 用一个数组将沿途的节点都记录下来 如果发现当前节点之前路径已经访问过了 证明有环 */
  function depthFirstTraversal(node: ModuleNode, visitPathSet: Set<string>) {
    const { moduleId, children } = node;
    // 已经被访问过直接结束
    if (visitedNodeIdSet.has(moduleId)) {
      return;
    }
    // 先将自己加入路径中 避免出现自己引用自己的场景
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
    // 将当前节点从路径中弹出
    visitPathSet.delete(moduleId);
  }

  depthFirstTraversal(rootModuleNode, new Set());
  return circleNodesMap;
}

/** 生成某个节点的 环上的所有节点 */
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
      visitPathSet.has(item.moduleId)
    );
  } while (currentNode && currentNode !== node);
  return result;
}

/** 将环节点 塞入map */
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
