"use client";
import React, { createContext, useState } from "react";

const NodeStoreContext = createContext();

const NodeStoreProvider = ({ children }) => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [nodeInput, setNodeInput] = useState();
    const [selectedNode, setSelectedNode] = useState(null);

    const addNode = (node) => {
        setNodes((prevNodes) => [...prevNodes, node]);
    };

    const updateNode = (id, label) => {
        setNodes((prevNodes) =>
            prevNodes.map((node) => (node.id === id ? { ...node, data: { ...node.data, label } } : node))
        );
    };

    return (
        <NodeStoreContext.Provider
        value={{
            nodes,
            edges,
            nodeInput,
            selectedNode,
            setNodes,
            setEdges,
            setNodeInput,
            setSelectedNode,
            addNode,
            updateNode
            }}
        >
            {children}
        </NodeStoreContext.Provider>
    );
};

export { NodeStoreProvider, NodeStoreContext };
