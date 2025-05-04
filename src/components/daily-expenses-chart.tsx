"use client"

import { useEffect, useRef } from "react"

export function DailyExpensesChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Function to resize canvas
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drawChart()
    }

    // Draw the chart
    const drawChart = () => {
      // Data for the chart
      const data = [45, 25, 80, 60, 40]
      const labels = ["Accommodation", "Comms", "Services", "Food", "Fuel"]
      const colors = [
        "#a78bfa", // purple
        "#6366f1", // indigo
        "#8b5cf6", // violet
        "#a855f7", // purple
        "#d8b4fe", // light purple
      ]

      const maxValue = 100
      const barWidth = canvas.width / (data.length * 2)

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw horizontal grid lines
      ctx.beginPath()
      ctx.strokeStyle = "#333"
      ctx.lineWidth = 1

      for (let i = 0; i <= 5; i++) {
        const y = canvas.height - (i * canvas.height) / 5
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
      }
      ctx.stroke()

      // Draw y-axis labels
      ctx.fillStyle = "#666"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "right"

      for (let i = 0; i <= 5; i++) {
        const value = i * 20
        const y = canvas.height - (i * canvas.height) / 5
        ctx.fillText(`${value}%`, 25, y - 5)
      }

      // Draw bars
      data.forEach((value, index) => {
        const x = (index * 2 + 1) * barWidth
        const barHeight = (value / maxValue) * canvas.height

        // Draw bar
        ctx.fillStyle = colors[index]
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)

        // Draw label
        ctx.fillStyle = "#999"
        ctx.font = "10px sans-serif"
        ctx.textAlign = "center"
        const labelText = window.innerWidth < 640 ? labels[index].substring(0, 3) : labels[index]
        ctx.fillText(labelText, x + barWidth / 2, canvas.height - 5)
      })
    }

    // Initial draw
    resizeCanvas()

    // Add resize event listener
    window.addEventListener("resize", resizeCanvas)

    // Clean up
    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className="w-full h-[200px] relative">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
