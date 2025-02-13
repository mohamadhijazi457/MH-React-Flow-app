"use client";
import React, { useContext, useState, useEffect } from "react";
import { NodeStoreContext } from "../helpers/nodeStore";

const styles = {
    container: {
        width: "300px",
        padding: "20px",
        background: "#f4f4f4",
        borderLeft: "1px solid #ccc",
    },
    input: {
        width: "100%",
        padding: "8px",
        marginBottom: "10px",
    },
    button: {
        width: "100%",
        padding: "10px",
        background: "#007bff",
        color: "#fff",
        border: "none",
        cursor: "pointer",
    },
};

const SidePanel = () => {
    const { selectedNode, updateNode, setSelectedNode } = useContext(NodeStoreContext);
    const [nodeLabel, setNodeLabel] = useState("");

    useEffect(() => {
        if (selectedNode) {
            setNodeLabel(selectedNode.data?.label || "");
        }
    }, [selectedNode]);

    if (!selectedNode) return null;

    return (
        <div style={styles.container}>
            <h3>Edit Node</h3>
            <input
                type="text"
                value={nodeLabel}
                onChange={(e) => setNodeLabel(e.target.value)}
                style={styles.input}
            />
            <button
                onClick={() => {
                    updateNode(selectedNode.id, nodeLabel);
                    setSelectedNode(null);
                }}
                style={styles.button}
            >
                Update Node
            </button>
        </div>
    );
}

export default SidePanel;
