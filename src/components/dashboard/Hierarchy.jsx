"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { ChevronDown, ChevronUp, Users, MapPin, Award } from 'lucide-react';
import ReactFlow, { 
  Controls, 
  MiniMap, 
  useNodesState, 
  useEdgesState, 
  Handle,
  Position 
} from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';

// Custom Node Component with proper handles
const CustomNode = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const baseNodeClass = 'flow-node rounded-lg shadow-md border w-64 transition-all duration-300 transform hover:scale-105';
  const nodeClass = `${baseNodeClass} ${
    isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
  }`;

  const rootNodeClass = data.isRoot
    ? isDark
      ? 'bg-blue-900 border-blue-700 shadow-lg'
      : 'bg-blue-50 border-blue-300 shadow-lg'
    : '';

  return (
    <div className={`${nodeClass} ${rootNodeClass} p-4 relative`}>
      {/* Add explicit connection handles */}
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Bottom} id="bottom" />

      <div className="flex flex-col items-center">
        <div
          className={`w-12 h-12 rounded-full mb-2 flex items-center justify-center ${
            data.isRoot
              ? isDark ? 'bg-blue-700' : 'bg-blue-200'
              : isDark ? 'bg-gray-700' : 'bg-gray-100'
          }`}
        >
          <Users size={20} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
        </div>
        <div className="font-medium text-lg text-center">{data.name}</div>
        <div className={`text-sm text-center font-medium ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
          {data.title}
        </div>
        <div
          className={`text-xs text-center mt-2 flex items-center justify-center ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          <MapPin size={12} className="mr-1" />
          {data.location}
        </div>
      </div>

      {data.hasChildren && (
        <button
          onClick={() => data.onToggle(data.id)}
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
            isDark ? 'bg-gray-700 text-blue-300 hover:bg-gray-600' : 'bg-white text-blue-600 hover:bg-gray-50'
          } border ${isDark ? 'border-gray-600' : 'border-gray-300'} shadow-md`}
          aria-label={data.expanded ? 'Collapse' : 'Expand'}
        >
          {data.expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      )}

      {data.isRoot && (
        <div className="absolute -top-2 -right-2">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              isDark ? 'bg-amber-600' : 'bg-amber-400'
            }`}
          >
            <Award size={14} className="text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

// Fixed CustomEdge component
const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, style, data }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const edgePath = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;

  return (
    <path
      id={id}
      className="react-flow__edge-path"
      stroke={isDark ? '#facc15' : '#f59e0b'}
      strokeWidth={2}
      d={edgePath}
    />
  );
};

// Define node and edge types
const nodeTypes = { custom: CustomNode };
const edgeTypes = { custom: CustomEdge };

const Hierarchy = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Hierarchy Data
  const [hierarchyData] = useState([
    {
      id: '1',
      name: 'Tahsan Khan',
      title: 'Founder - CEO',
      location: 'Boston HQ',
      children: [
        {
          id: '2',
          name: 'Harry Kane',
          title: 'Engineering Manager',
          location: 'London Office',
          children: [
            { id: '3', name: 'Azam Khan', title: 'Marketing', location: 'Boston HQ' },
            { id: '4', name: 'Sara Lee', title: 'Software Engineer', location: 'London Office' },
            { id: '5', name: 'John Doe', title: 'DevOps Engineer', location: 'Remote' },
          ],
        },
        {
          id: '6',
          name: 'Tim David',
          title: 'HR Management',
          location: 'Boston HQ',
          children: [
            { id: '7', name: 'James James', title: 'Account Executive', location: 'Boston HQ' },
            { id: '8', name: 'Emma Watson', title: 'Recruitment Specialist', location: 'Boston HQ' },
            {
              id: '9',
              name: 'Lisa Ray',
              title: 'Training Coordinator',
              location: 'Remote',
              children: [
                { id: '10', name: 'Mike Brown', title: 'Trainer', location: 'Remote' },
                { id: '11', name: 'Anna Smith', title: 'Intern', location: 'Boston HQ' },
              ],
            },
          ],
        },
        {
          id: '12',
          name: 'Rachel Green',
          title: 'CFO',
          location: 'Boston HQ',
          children: [
            { id: '13', name: 'Tom Hardy', title: 'Financial Analyst', location: 'Boston HQ' },
            { id: '14', name: 'Clara Oswald', title: 'Accountant', location: 'Remote' },
          ],
        },
      ],
    },
  ]);

  // State for nodes, edges, and collapsed nodes
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [collapsedNodes, setCollapsedNodes] = useState(() => {
    const initialCollapsed = new Set();
    const addNodeIds = (data) => {
      data.forEach((item) => {
        if (item.id !== '1' && item.children) {
          initialCollapsed.add(item.id);
        }
        if (item.children) {
          addNodeIds(item.children);
        }
      });
    };
    addNodeIds(hierarchyData);
    return initialCollapsed;
  });

  // Generate nodes and edges
  const generateNodesAndEdges = useCallback(
    (data, parentId = null, depth = 0) => {
      let nodes = [];
      let edges = [];

      data.forEach((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isCollapsed = collapsedNodes.has(item.id);

        nodes.push({
          id: item.id,
          type: 'custom',
          data: {
            ...item,
            isRoot: depth === 0,
            hasChildren,
            expanded: !isCollapsed,
            onToggle: (id) => {
              setCollapsedNodes((prev) => {
                const newSet = new Set(prev);
                if (newSet.has(id)) {
                  newSet.delete(id);
                } else {
                  newSet.add(id);
                }
                return newSet;
              });
            },
          },
          position: { x: 0, y: 0 },
        });

        // Create edge to parent only if parent exists and is not collapsed
        if (parentId && !collapsedNodes.has(parentId)) {
          edges.push({
            id: `e${parentId}-${item.id}`,
            source: parentId,
            target: item.id,
            type: 'smoothstep',  // Using built-in edge type for vertical connections
            sourceHandle: 'bottom',
            targetHandle: 'top',
            style: { stroke: isDark ? '#facc15' : '#f59e0b', strokeWidth: 2 },
          });
        }

        // Process children if not collapsed
        if (hasChildren && !isCollapsed) {
          const { nodes: childNodes, edges: childEdges } = generateNodesAndEdges(item.children, item.id, depth + 1);
          nodes = [...nodes, ...childNodes];
          edges = [...edges, ...childEdges];
          
          // Removed the horizontal edge that was connecting first and last nodes in each row
        }
      });

      return { nodes, edges };
    },
    [collapsedNodes, isDark]
  );

  // Apply Dagre layout
  const getLayoutedElements = (nodes, edges) => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: 'TB', nodesep: 100, ranksep: 200 });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: 256, height: 150 });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      return {
        ...node,
        position: {
          x: nodeWithPosition ? nodeWithPosition.x - 128 : 0,
          y: nodeWithPosition ? nodeWithPosition.y - 75 : 0,
        },
      };
    });

    return { nodes: layoutedNodes, edges };
  };

  // Update nodes and edges on data or collapsed state change
  useEffect(() => {
    const { nodes: initialNodes, edges: initialEdges } = generateNodesAndEdges(hierarchyData);
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [generateNodesAndEdges, hierarchyData, setNodes, setEdges]);

  return (
    <div
      className={`px-10 py-8 w-[calc(100vw-256px)] ${
        isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' : 'bg-gray-50 text-gray-900'
      } min-h-screen overflow-hidden`}
    >
      <nav className="mb-6">
        <ol className="flex text-sm font-medium">
          <li className="flex items-center">
            <a
              href="#"
              className={`${
                isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
              } transition-colors`}
            >
              Dashboard
            </a>
            <span className={`mx-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>/</span>
          </li>
          <li className="flex items-center">
            <a
              href="#"
              className={`${
                isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
              } transition-colors`}
            >
              Company
            </a>
            <span className={`mx-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>/</span>
          </li>
          <li className={`${isDark ? 'text-gray-300' : 'text-gray-600'} font-semibold`}>Hierarchy</li>
        </ol>
      </nav>

      <div className="mb-8 flex justify-between items-center">
        <div>
          <h4 className={`text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            People Directory
          </h4>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            View and navigate the organizational structure
          </p>
        </div>
      </div>

      {/* Org Chart */}
      <div className="mt-12 h-[calc(100vh-200px)]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          minZoom={0.1}
          maxZoom={2}
          defaultEdgeOptions={{
            type: 'smoothstep',
            style: { stroke: isDark ? '#facc15' : '#f59e0b', strokeWidth: 2 },
          }}
          className={`${isDark ? 'bg-gray-900 rounded-3xl' : 'bg-gray-100 rounded-3xl'}`}
        >
          {/* Background component removed to eliminate dots */}
          <Controls />
          {/* <MiniMap
            nodeColor={(node) => (node.data.isRoot ? (isDark ? '#1e3a8a' : '#dbeafe') : isDark ? '#374151' : '#fff')}
            nodeStrokeColor={() => (isDark ? '#facc15' : '#f59e0b')}
            maskColor={isDark ? 'rgba(31, 41, 55, 0.8)' : 'rgba(229, 231, 235, 0.8)'}
          /> */}
        </ReactFlow>
      </div>
    </div>
  );
};

export default Hierarchy;