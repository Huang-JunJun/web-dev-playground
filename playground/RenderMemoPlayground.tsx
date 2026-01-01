"use client"

import React, { useState } from "react"

const Child = ({ label, onClick }: { label: string; onClick: () => void }) => {
  console.log("Child render:", label)
  return (
    <button onClick={onClick} style={{ marginRight: 8 }}>
      {label}
    </button>
  )
}

const Parent = () => {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState("hello")

  console.log("Parent render")

  return (
    <div style={{ padding: 16 }}>
      <h3>Render / memo Playground</h3>
      <div style={{ marginBottom: 8 }}>
        <button onClick={() => setCount((c) => c + 1)}>+ count ({count})</button>
      </div>
      <div style={{ marginBottom: 8 }}>
        <button onClick={() => setValue((v) => v + "!")}>change value ({value})</button>
      </div>

      <Child
        label={`Child value: ${value}`}
        onClick={() => {
          console.log("Child clicked")
        }}
      />
    </div>
  )
}

export default Parent