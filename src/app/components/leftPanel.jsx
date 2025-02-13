"use client";
import React, { useCallback, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "../helpers/validationSchema";
import { NodeStoreContext } from "../helpers/nodeStore";

const styles = {
    formContainer: {
        width: "300px",
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        fontFamily: "Arial, sans-serif",
    },
    heading: {
        textAlign: "center",
        fontSize: "20px",
        marginBottom: "20px",
    },
    label: {
        fontWeight: "bold",
        fontSize: "16px",
        color: "#333",
        display: "block",
        marginBottom: "5px",
    },
    input: {
        width: "100%",
        padding: "12px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        fontSize: "14px",
        transition: "border-color 0.3s ease-in-out",
        display: "block",
    },
    inputFocus: {
        outline: "none",
        borderColor: "#007BFF",
    },
    error: {
        color: "red",
        fontSize: "12px",
        marginTop: "4px",
    },
    button: {
        width: "100%",
        background: "#007BFF",
        color: "white",
        padding: "12px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        transition: "background 0.3s ease-in-out",
        display: "block",
        marginTop: "10px",
    },
    buttonHover: {
        background: "#0056b3",
    },
    buttonDisabled: {
        background: "#ccc",
        cursor: "not-allowed",
    },
};

const NodeForm = () => {
    const { nodeInput, setNodeInput, addNode } = useContext(NodeStoreContext);

    // useForm with zodResolver to apply validation schema
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            nodeType: "",
            userInfo: "",
            habitInfo: "Football",
        }
    });
    
    // Watches the selected node type
    const nodeType = watch("nodeType");

    useEffect(() => {
        // Clears node input when no node type is selected
        if (!nodeType) setNodeInput("");
    }, [nodeType, setNodeInput]);

    // Handles input change and updates nodeInput state
    const handleInputChange = useCallback(
        (e) => setNodeInput(e.target.value),
        [setNodeInput]
    );

    // Handles form submission to create a new node
    const onSubmit = useCallback(
        (data) => {
            if (data.nodeType) {
                const newNode = {
                    id: new Date().getTime().toString(), // Generates a unique ID for the node
                    data: { label: nodeInput },
                    position: {
                        x: Math.random() * 150,
                        y: Math.random() * 150,
                    },
                    type: data.nodeType,
                };
                addNode(newNode);
                console.log("New Node:", newNode);
                setNodeInput("");
                reset();
            }
        },
        [addNode, nodeInput, setNodeInput, reset]
    );

    return (
        <div style={styles.formContainer}>
            <h2 style={styles.heading}>Create a Node</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label style={styles.label}>Node Type:</label>
                <select {...register("nodeType")} style={styles.input}>
                    <option value="" disabled>
                        Select type
                    </option>
                    <option value="User">User</option>
                    <option value="Habit">Habit</option>
                </select>

                {nodeType === "User" && (
                    <div>
                        <label style={styles.label}>User Info:</label>
                        <input type="text" {...register("userInfo")} style={styles.input} onChange={handleInputChange} />
                        {errors.userInfo && <p style={styles.error}>{errors.userInfo.message}</p>}
                    </div>
                )}

                {nodeType === "Habit" && (
                    <div>
                        <label style={styles.label}>Select Habit:</label>
                        <select {...register("habitInfo")} style={styles.input} onChange={handleInputChange}>
                            <option value="Football">Football</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Reading">Reading</option>
                            <option value="Gymnastics">Gymnastics</option>
                        </select>
                        {errors.habitInfo && <p style={styles.error}>{errors.habitInfo.message}</p>}
                    </div>
                )}

                <button type="submit" style={nodeType ? styles.button : { ...styles.button, ...styles.buttonDisabled }} disabled={!nodeType}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default NodeForm;
