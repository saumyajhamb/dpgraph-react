# Interactive Demand-Price Graph
---
[Deploy link](https://dpgraph-react.vercel.app/)
---

An interactive React-based application for visualizing a demand curve and dynamically calculating the total demand for a selected price range. The application allows users to select a portion of the demand curve, which is highlighted on the graph and the total demand for the selected range is calculated and displayed.

This project is deployed on Vercel for live interaction and can be easily integrated into any project for quick and effective demand analysis.

## Features

- **Interactive Range Selection**: Click and drag to select a range of prices along the x-axis.
- **Shading of Selected Area**: The demand values within the selected price range are shaded for clear visualization.
- **Total Demand Calculation**: As you select a range, the total demand for that range is dynamically calculated and displayed.
- **Annotation Display**: The total demand value is displayed at the midpoint of the selected range.
- **Responsive Design**: The graph adjusts well to different screen sizes, providing a seamless experience across devices.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Chart.js**: A flexible and powerful charting library to render interactive line graphs.
- **React-Chartjs-2**: A wrapper to use Chart.js in React applications.
- **CSS**: Custom styles for the user interface.
- **Vercel**: Deployment platform for hosting the app.

## Installation

To run this project locally, follow these steps:

### Prerequisites
Make sure you have `Node.js` and `npm` (Node Package Manager) installed.

### Clone the Repository

```bash
git clone https://github.com/saumyajhamb/dpgraph-react.git
cd interactive-demand-price-graph
