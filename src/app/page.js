"use client";
import styles from "./page.module.css";
import Flow from "./components/flow";
import NodeForm from "./components/leftPanel";
import { NodeStoreProvider } from "./helpers/nodeStore";
import SidePanel from "./components/rightPanel";

export default function Home() {
  return (
    <div className={styles.page}>
        <NodeStoreProvider>
          <NodeForm/>
          <Flow/>
          <SidePanel />
        </NodeStoreProvider>
    </div>
  );
}
