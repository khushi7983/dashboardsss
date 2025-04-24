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
        {/* <div
          className={`text-xs text-center mt-2 flex items-center justify-center ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          <MapPin size={12} className="mr-1" />
          {data.location}
        </div> */}
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
      "id": "1",
      "name": "FA to ASD",
      "children": [
        {
          "id": "2",
          "name": "TA to ASD",
          "children": [
            {
              "id": "3",
              "name": "ASD Sectt."
            }
          ]
        },
        {
          "id": "4",
          "name": "SO to ASD",
          "children": [
            {
              "id": "5",
              "name": "MSO"
            }
          ]
        },
        {
          "id": "6",
          "name": "CVO"
        },
        {
          "id": "7",
          "name": "Admiral Superintendent",
          "children": [
            {
              "id": "8",
              "name": "PMO"
            },
            {
              "id": "9",
              "name": "DPMO"
            },
            {
              "id": "10",
              "name": "GM ( R. )",
              "children": [
                {
                  "id": "11",
                  "name": "AGM (PP)",
                  "children": [
                    {
                      "id": "12",
                      "name": "DGM (PLC)",
                      "children": [
                        {
                          "id": "13",
                          "name": "MLSC"
                        },
                        {
                          "id": "14",
                          "name": "MRR"
                        }
                      ]
                    },
                    {
                      "id": "15",
                      "name": "DGM (SP&NPL)",
                      "children": [
                        {
                          "id": "16",
                          "name": "MNPL"
                        }
                      ]
                    },
                    {
                      "id": "17",
                      "name": "DGM (PLS)",
                      "children": [
                        {
                          "id": "18",
                          "name": "MCAP"
                        },
                        {
                          "id": "19",
                          "name": "MPLAS"
                        },
                        {
                          "id": "20",
                          "name": "MCOR"
                        },
                        {
                          "id": "21",
                          "name": "MFLOT"
                        }
                      ]
                    },
                    {
                      "id": "22",
                      "name": "DGM (SUB)",
                      "children": [
                        {
                          "id": "23",
                          "name": "MSPT"
                        },
                        {
                          "id": "24",
                          "name": "MSUB"
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "25",
                  "name": "AGM (PR)",
                  "children": [
                    {
                      "id": "26",
                      "name": "DGM (ES)",
                      "children": [
                        {
                          "id": "27",
                          "name": "MMID"
                        },
                        {
                          "id": "28",
                          "name": "MENG"
                        },
                        {
                          "id": "29",
                          "name": "MSAX"
                        },
                        {
                          "id": "30",
                          "name": "MRAC"
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "31",
                  "name": "AGM (PS)",
                  "children": [
                    {
                      "id": "32",
                      "name": "MPGS"
                    },
                    {
                      "id": "33",
                      "name": "MGS"
                    },
                    {
                      "id": "34",
                      "name": "MGT"
                    },
                    {
                      "id": "35",
                      "name": "MMCD"
                    }
                  ]
                },
                {
                  "id": "36",
                  "name": "DGM (HULL)",
                  "children": [
                    {
                      "id": "37",
                      "name": "MFAB"
                    },
                    {
                      "id": "38",
                      "name": "MDS"
                    },
                    {
                      "id": "39",
                      "name": "MHP"
                    },
                    {
                      "id": "40",
                      "name": "MOUT"
                    },
                    {
                      "id": "41",
                      "name": "MDES"
                    }
                  ]
                },
                {
                  "id": "42",
                  "name": "DGM (WEA)",
                  "children": [
                    {
                      "id": "43",
                      "name": "MWEA (PR)"
                    },
                    {
                      "id": "44",
                      "name": "MWEA (TT)"
                    },
                    {
                      "id": "45",
                      "name": "MWEA(PJ)"
                    }
                  ]
                },
                {
                  "id": "46",
                  "name": "OI/C NRW"
                },
                {
                  "id": "47",
                  "name": "DGM (L)",
                  "children": [
                    {
                      "id": "48",
                      "name": "MELE"
                    },
                    {
                      "id": "49",
                      "name": "MECE"
                    }
                  ]
                },
                {
                  "id": "50",
                  "name": "MPC"
                },
                {
                  "id": "51",
                  "name": "DMPC"
                },
                {
                  "id": "52",
                  "name": "DGM (MAT)",
                  "children": [
                    {
                      "id": "53",
                      "name": "MMAT (LP)"
                    },
                    {
                      "id": "54",
                      "name": "MMAT (SC)"
                    }
                  ]
                },
                {
                  "id": "55",
                  "name": "DGM (COM)",
                  "children": [
                    {
                      "id": "56",
                      "name": "MCOM"
                    }
                  ]
                },
                {
                  "id": "57",
                  "name": "COY"
                }
              ]
            },
            {
              "id": "58",
              "name": "GM (T)",
              "children": [
                {
                  "id": "59",
                  "name": "DGM (SS)",
                  "children": [
                    {
                      "id": "60",
                      "name": "MSS"
                    },
                    {
                      "id": "61",
                      "name": "MCW"
                    },
                    {
                      "id": "62",
                      "name": "MDM"
                    },
                    {
                      "id": "63",
                      "name": "MDP"
                    }
                  ]
                },
                {
                  "id": "64",
                  "name": "DGM (YS)",
                  "children": [
                    {
                      "id": "65",
                      "name": "MPM"
                    },
                    {
                      "id": "66",
                      "name": "MYU"
                    },
                    {
                      "id": "67",
                      "name": "MDT"
                    },
                    {
                      "id": "68",
                      "name": "MYS"
                    }
                  ]
                },
                {
                  "id": "69",
                  "name": "CSFO",
                  "children": [
                    {
                      "id": "70",
                      "name": "MAA"
                    },
                    {
                      "id": "71",
                      "name": "CODSC"
                    },
                    {
                      "id": "72",
                      "name": "DDO"
                    }
                  ]
                },
                {
                  "id": "73",
                  "name": "DGM (RP)",
                  "children": [
                    {
                      "id": "74",
                      "name": "MYP"
                    }
                  ]
                },
                {
                  "id": "75",
                  "name": "AGM (MS)",
                  "children": [
                    {
                      "id": "76",
                      "name": "MIT"
                    },
                    {
                      "id": "77",
                      "name": "MIS"
                    },
                    {
                      "id": "78",
                      "name": "MFS"
                    },
                    {
                      "id": "79",
                      "name": "JD COST"
                    }
                  ]
                }
              ]
            },
            {
              "id": "80",
              "name": "GM (HR)",
              "children": [
                {
                  "id": "81",
                  "name": "AGM (P&A)",
                  "children": [
                    {
                      "id": "82",
                      "name": "MPS"
                    },
                    {
                      "id": "83",
                      "name": "MDISC"
                    },
                    {
                      "id": "84",
                      "name": "MWEL"
                    },
                    {
                      "id": "85",
                      "name": "MIR"
                    },
                    {
                      "id": "86",
                      "name": "DLWC"
                    },
                    {
                      "id": "87",
                      "name": "MCE"
                    }
                  ]
                },
                {
                  "id": "88",
                  "name": "AGM (HR)",
                  "children": [
                    {
                      "id": "89",
                      "name": "MHRP"
                    },
                    {
                      "id": "90",
                      "name": "MHRTD"
                    },
                    {
                      "id": "91",
                      "name": "OI/C DAS"
                    },
                    {
                      "id": "92",
                      "name": "MPER"
                    },
                    {
                      "id": "93",
                      "name": "MFTD"
                    }
                  ]
                },
                {
                  "id": "94",
                  "name": "AGM (Safety)",
                  "children": [
                    {
                      "id": "95",
                      "name": "MSAF"
                    },
                    {
                      "id": "96",
                      "name": "AMSAF"
                    }
                  ]
                }
              ]
            },
            {
              "id": "97",
              "name": "GM (QA)",
              "children": [
                {
                  "id": "98",
                  "name": "AGM (QA&LAB)",
                  "children": [
                    {
                      "id": "99",
                      "name": "MQA"
                    },
                    {
                      "id": "100",
                      "name": "MQC"
                    },
                    {
                      "id": "101",
                      "name": "MTH"
                    },
                    {
                      "id": "102",
                      "name": "MLAB"
                    }
                  ]
                },
                {
                  "id": "103",
                  "name": "DGM (DB)",
                  "children": [
                    {
                      "id": "104",
                      "name": "MDB"
                    },
                    {
                      "id": "105",
                      "name": "MRTC"
                    }
                  ]
                }
              ]
            },
            {
              "id": "106",
              "name": "Oi/C/WED"
            }
          ]
        }
      ]
    }
,
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