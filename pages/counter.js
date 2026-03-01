class DOPAdapter {
  constructor({ initialState, transitions, hooks = {} }) {
    this.state = { ...initialState };
    this.transitions = transitions;
    this.hooks = hooks;
    this.listeners = new Set();

    if (typeof this.hooks.onMount === 'function') {
      this.hooks.onMount(this.getState());
    }
  }

  getState() {
    return { ...this.state };
  }

  applyTransition(name, payload) {
    const transition = this.transitions[name];
    if (typeof transition !== 'function') {
      throw new Error(`Unknown transition: ${name}`);
    }

    const previousState = this.getState();
    const nextState = transition(previousState, payload);

    this.state = { ...previousState, ...nextState };

    if (typeof this.hooks.onUpdate === 'function') {
      this.hooks.onUpdate(previousState, this.getState(), name);
    }

    this.listeners.forEach((listener) => listener(this.getState(), name));
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  destroy() {
    if (typeof this.hooks.onUnmount === 'function') {
      this.hooks.onUnmount(this.getState());
    }
    this.listeners.clear();
  }
}

const counterAdapter = new DOPAdapter({
  initialState: { count: 0, step: 1 },
  transitions: {
    increment: (state) => ({ count: state.count + state.step }),
    decrement: (state) => ({ count: state.count - state.step }),
    reset: () => ({ count: 0 }),
    setStep: (_state, payload) => ({ step: Number(payload) || 1 }),
  },
  hooks: {
    onUpdate: (_prev, current, transition) => {
      const status = document.getElementById('status');
      status.textContent = `Transition: ${transition} | Count: ${current.count} | Step: ${current.step}`;
    },
  },
});

function renderCounter(state) {
  document.getElementById('count').textContent = String(state.count);
  document.getElementById('step-value').textContent = String(state.step);
}

function setupEventListeners() {
  document.getElementById('increment-btn').addEventListener('click', () => {
    counterAdapter.applyTransition('increment');
  });

  document.getElementById('decrement-btn').addEventListener('click', () => {
    counterAdapter.applyTransition('decrement');
  });

  document.getElementById('reset-btn').addEventListener('click', () => {
    counterAdapter.applyTransition('reset');
  });

  document.getElementById('step-input').addEventListener('change', (event) => {
    counterAdapter.applyTransition('setStep', event.target.value);
  });
}

function init() {
  renderCounter(counterAdapter.getState());
  counterAdapter.subscribe((state) => renderCounter(state));
  setupEventListeners();
}

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('beforeunload', () => counterAdapter.destroy());
