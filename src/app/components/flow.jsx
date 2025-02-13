"use client";
import React, { useContext, useCallback } from "react";
import { ReactFlow, Controls, Background, applyEdgeChanges, applyNodeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { NodeStoreContext } from "../helpers/nodeStore";

const Flow = () => {
    // Access the node and edge states from the NodeStoreContext
    const { nodes, setNodes, edges, setEdges, setSelectedNode } = useContext(NodeStoreContext);

    // Handles changes to nodes, updating the state accordingly
    const onNodesChange = useCallback(
        (changes) => setNodes((currentNodes) => applyNodeChanges(changes, currentNodes)),
        [setNodes]
    );

    // Handles changes to edges, updating the state accordingly
    const onEdgesChange = useCallback(
        (changes) => setEdges((currentEdges) => applyEdgeChanges(changes, currentEdges)),
        [setEdges]
    );

    // Handles new connections between nodes and updates the edges state
    const onConnect = useCallback(
        (connection) => {
            setEdges((currentEdges) => addEdge(connection, currentEdges));
        },
        [setEdges]
    );

    // Sets the selected node when a node is clicked
    const onNodeClick = (event, node) => {
        setSelectedNode(node);
    };

    return (
      <div style={{ height: '100%', display: 'contents'}}>
        <ReactFlow
          nodes={nodes} // Passes the nodes to the ReactFlow component
          edges={edges} // Passes the edges to the ReactFlow component
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    );
}

export default Flow;
