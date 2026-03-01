// Import the OBIX DOPAdapter
import { DOPAdapter } from 'obix';

// Initialize the DOPAdapter
const counterAdapter = new DOPAdapter({
  dataModel: {
    count: 0,
  },
  behaviorModel: {
    increment(state) {
      return { ...state, count: state.count + 1 };
    },
    decrement(state) {
      return { ...state, count: state.count - 1 };
    },
  },
});

// Render the Counter Component
function renderCounter() {
  const state = counterAdapter.getState();
  document.getElementById('counter-value').innerText = state.count;
}

// Attach event listeners
function setupEventListeners() {
  document.getElementById('increment-btn').addEventListener('click', () => {
    counterAdapter.applyTransition('increment');
    renderCounter();
  });

  document.getElementById('decrement-btn').addEventListener('click', () => {
    counterAdapter.applyTransition('decrement');
    renderCounter();
  });
}

// Initialize the app
function init() {
  renderCounter();
  setupEventListeners();
}

document.addEventListener('DOMContentLoaded', init);