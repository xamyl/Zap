import React, { useState, useCallback, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Plus, Trash2, Save, Settings, ZoomIn, ZoomOut, Move } from 'lucide-react';

const nodeTypes = [
  { id: 'trigger', label: 'Trigger', color: 'bg-blue-500', icon: '⚡' },
  { id: 'action', label: 'Action', color: 'bg-green-500', icon: '⚙️' },
  { id: 'condition', label: 'Condition', color: 'bg-yellow-500', icon: '❓' },
  { id: 'code', label: 'Code Block', color: 'bg-purple-500', icon: '💻' },
];

const NodeConfig = ({ node, onUpdate, onClose }) => {
  if (!node) return null;

  return (
    <div className="absolute right-0 top-0 h-full w-80 bg-gray-800 border-l border-gray-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Node Configuration</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          ×
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
          <input
            type="text"
            value={node.data.label}
            onChange={(e) => onUpdate({ ...node, data: { ...node.data, label: e.target.value } })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
          <textarea
            value={node.data.description || ''}
            onChange={(e) => onUpdate({ ...node, data: { ...node.data, description: e.target.value } })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export function WorkflowBuilder() {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef(null);
  const dragControls = useDragControls();

  const addNode = (type) => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type,
      position: { x: 100, y: 100 + nodes.length * 100 },
      data: { 
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${nodes.length + 1}`,
        description: '',
        inputs: [],
        outputs: []
      },
    };
    setNodes([...nodes, newNode]);
  };

  const updateNode = (updatedNode) => {
    setNodes(nodes.map(node => node.id === updatedNode.id ? updatedNode : node));
  };

  const deleteNode = (nodeId) => {
    setNodes(nodes.filter(node => node.id !== nodeId));
    setConnections(connections.filter(conn => 
      conn.source !== nodeId && conn.target !== nodeId
    ));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  };

  const handleNodeDrag = (nodeId, info) => {
    setNodes(nodes.map(node => 
      node.id === nodeId 
        ? { ...node, position: { x: node.position.x + info.delta.x, y: node.position.y + info.delta.y } }
        : node
    ));
  };

  const saveWorkflow = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/workflows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes,
          connections,
          name: 'My Workflow',
          description: 'Created with Zap Workflow Builder',
        }),
      });
      
      if (!response.ok) throw new Error('Failed to save workflow');
      
      const data = await response.json();
      console.log('Workflow saved:', data);
    } catch (error) {
      console.error('Error saving workflow:', error);
    }
  };

  const handleZoom = (delta) => {
    setScale(prev => Math.max(0.5, Math.min(2, prev + delta)));
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">Workflow Builder</h1>
        <div className="flex gap-2">
          <button
            onClick={() => handleZoom(0.1)}
            className="p-2 text-gray-400 hover:text-white"
          >
            <ZoomIn size={20} />
          </button>
          <button
            onClick={() => handleZoom(-0.1)}
            className="p-2 text-gray-400 hover:text-white"
          >
            <ZoomOut size={20} />
          </button>
          <button
            onClick={saveWorkflow}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Save size={20} />
            Save Workflow
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Node Types Panel */}
        <div className="w-64 bg-gray-800 p-4 border-r border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">Add Node</h2>
          <div className="space-y-2">
            {nodeTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => addNode(type.id)}
                className={`w-full flex items-center gap-2 px-4 py-2 ${type.color} text-white rounded-lg hover:opacity-90`}
              >
                <span className="text-xl">{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div 
          ref={canvasRef}
          className="flex-1 relative overflow-hidden"
          style={{
            backgroundImage: 'radial-gradient(circle, #2d3748 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
          {/* Connection Lines */}
          <svg className="absolute inset-0 pointer-events-none">
            {connections.map((conn, index) => {
              const sourceNode = nodes.find(n => n.id === conn.source);
              const targetNode = nodes.find(n => n.id === conn.target);
              if (!sourceNode || !targetNode) return null;

              const start = {
                x: sourceNode.position.x + 100,
                y: sourceNode.position.y + 20
              };
              const end = {
                x: targetNode.position.x,
                y: targetNode.position.y + 20
              };

              return (
                <path
                  key={index}
                  d={`M ${start.x} ${start.y} C ${(start.x + end.x) / 2} ${start.y}, ${(start.x + end.x) / 2} ${end.y}, ${end.x} ${end.y}`}
                  stroke="#4B5563"
                  strokeWidth="2"
                  fill="none"
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              drag
              dragControls={dragControls}
              dragMomentum={false}
              onDrag={(_, info) => handleNodeDrag(node.id, info)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`absolute p-4 rounded-lg shadow-lg cursor-move ${
                nodeTypes.find(t => t.id === node.type)?.color || 'bg-gray-600'
              } ${selectedNode?.id === node.id ? 'ring-2 ring-yellow-400' : ''}`}
              style={{
                left: node.position.x,
                top: node.position.y,
                width: '200px',
              }}
              onClick={() => setSelectedNode(node)}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{nodeTypes.find(t => t.id === node.type)?.icon}</span>
                  <span className="text-white font-medium">{node.data.label}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNode(node);
                    }}
                    className="text-white hover:text-yellow-400"
                  >
                    <Settings size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNode(node.id);
                    }}
                    className="text-white hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Node Configuration Panel */}
        {selectedNode && (
          <NodeConfig
            node={selectedNode}
            onUpdate={updateNode}
            onClose={() => setSelectedNode(null)}
          />
        )}
      </div>
    </div>
  );
}