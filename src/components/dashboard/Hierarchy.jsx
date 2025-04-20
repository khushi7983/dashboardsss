import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { ChevronDown, ChevronUp, Users, MapPin, Award } from 'lucide-react';

const Hierarchy = () => {
  const { theme } = useTheme();
  const [hierarchyData] = useState([
    {
      name: 'Tahsan Khan',
      title: 'Founder - CEO',
      location: 'Boston HQ',
      children: [
        {
          name: 'Harry Kane',
          title: 'Engineering Manager',
          location: 'London Office',
          children: [
            { name: 'Azam Khan', title: 'Marketing', location: 'Boston HQ' },
            { name: 'Azam Khan', title: 'Marketing', location: 'Boston HQ' },
            { name: 'Azam Khan', title: 'Marketing', location: 'Boston HQ' },
          ],
        },
        {
          name: 'Tim David',
          title: 'HR Management',
          location: 'Boston HQ',
          children: [
            { name: 'James James', title: 'Account Executive', location: 'Boston HQ' },
            { name: 'Azam Khan', title: 'Marketing', location: 'Boston HQ' },
          ],
        },
      ],
    },
  ]);

  const isDark = theme === 'dark';

  const lineBaseStyles = isDark
    ? 'bg-gradient-to-b from-yellow-600 to-yellow-400 transition-all duration-500'
    : 'bg-gradient-to-b from-yellow-500 to-yellow-300 transition-all duration-500';

  const horizontalLineStyles = isDark
    ? 'bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 transition-all duration-500'
    : 'bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 transition-all duration-500';

  const connectorDotStyles = isDark
    ? 'bg-yellow-400 border-2 border-gray-800 shadow-md'
    : 'bg-yellow-500 border-2 border-white shadow-md';

  const FlowchartNode = ({ node, isRoot = false }) => {
    const [expanded, setExpanded] = useState(isRoot);
    const hasChildren = node.children && node.children.length > 0;

    const baseNodeClass = 'flow-node rounded-lg shadow-md border w-64 transition-all duration-300 transform hover:scale-105';
    const nodeClass = `${baseNodeClass} ${
      isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
    }`;

    const rootNodeClass = isRoot
      ? isDark
        ? 'bg-blue-900 border-blue-700 shadow-lg'
        : 'bg-blue-50 border-blue-300 shadow-lg'
      : '';

    return (
      <div className="flex flex-col items-center">
        <div className={`${nodeClass} ${rootNodeClass} p-4 relative`}>
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full mb-2 flex items-center justify-center ${
              isRoot
                ? isDark ? 'bg-blue-700' : 'bg-blue-200'
                : isDark ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <Users size={20} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
            </div>
            <div className="font-medium text-lg text-center">{node.name}</div>
            <div className={`text-sm text-center font-medium ${
              isDark ? 'text-blue-300' : 'text-blue-600'
            }`}>
              {node.title}
            </div>
            <div className={`text-xs text-center mt-2 flex items-center justify-center ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <MapPin size={12} className="mr-1" />
              {node.location}
            </div>
          </div>

          {hasChildren && (
            <button
              onClick={() => setExpanded(!expanded)}
              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                isDark
                  ? 'bg-gray-700 text-blue-300 hover:bg-gray-600'
                  : 'bg-white text-blue-600 hover:bg-gray-50'
              } border ${isDark ? 'border-gray-600' : 'border-gray-300'} shadow-md`}
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}

          {isRoot && (
            <div className="absolute -top-2 -right-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                isDark ? 'bg-amber-600' : 'bg-amber-400'
              }`}>
                <Award size={14} className="text-white" />
              </div>
            </div>
          )}
        </div>

        {hasChildren && expanded && (
          <>
            <div className="relative w-1 h-12">
              <div className={`absolute inset-0 ${lineBaseStyles} shadow-md rounded-full`}></div>
              <div className={`absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full ${connectorDotStyles}`}></div>
            </div>

            <div className="relative flex justify-center">
              <div className="flex flex-col items-center">
                {/* Horizontal line */}
                <div className="relative flex justify-center mb-4">
                  <div
                    className={`h-2 ${horizontalLineStyles} rounded-full shadow-md`}
                    style={{
                      width: `${Math.max(node.children.length * 260, 260)}px`,
                    }}
                  ></div>
                </div>

                {/* Child nodes */}
                <div className="flex justify-center gap-16">
                  {node.children.map((child, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="relative w-1 h-12">
                        <div className={`absolute inset-0 ${lineBaseStyles} shadow-md rounded-full`}></div>
                        <div className={`absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full ${connectorDotStyles}`}></div>
                      </div>
                      <FlowchartNode node={child} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className={`px-10 py-8 w-[calc(100vw-256px)] ${
      isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' : 'bg-gray-50 text-gray-900'
    } min-h-screen overflow-x-auto`}>
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
      <div className="flex justify-center mt-12">
        {hierarchyData.map((rootNode, index) => (
          <FlowchartNode key={index} node={rootNode} isRoot />
        ))}
      </div>
    </div>
  );
};

export default Hierarchy;