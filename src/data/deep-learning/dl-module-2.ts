import { ModuleData, LessonContent } from '@/lib/types';

export const dlModule2Data: ModuleData = {
  id: 'dl-module-2',
  number: 2,
  title: 'Neural Calculus, Backprop & Optimizers',
  subtitle: 'The Multivariate Chain Rule, Error Tensors & Optimization Dynamics',
  description:
    'Master the computational engine driving all deep learning: scalar and matrix calculus derivatives, computational graphs, reverse-mode automatic differentiation, the step-by-step backpropagation algorithm, and advanced optimizers (SGD, Momentum, RMSprop, Adam, AdamW).',
  icon: 'Activity',
  badge: 'Phase 3 · Deep Learning',
  estimatedHours: 14,
  topicsCount: 4,
  lessons: [
    {
      id: 'dl-06-calculus-gradients',
      moduleId: 'dl-module-2',
      title: 'DL-06: Calculus for Neural Networks',
      description: 'Derivatives, partial derivatives, gradients, the chain rule, computational graphs, and reverse-mode automatic differentiation intuition.',
      order: 1,
      readTimeMinutes: 28,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'dl-07-backpropagation',
      moduleId: 'dl-module-2',
      title: 'DL-07: Backpropagation: Complete Vector & Matrix Derivation',
      description: 'How gradients flow backward through layers: the error vector δ⁽ˡ⁾, weight gradient tensor formulas, numerical hand calculation, and misconceptions.',
      order: 2,
      readTimeMinutes: 32,
      visualizerType: 'none',
      difficulty: 'Advanced',
    },
    {
      id: 'dl-08-optimizers',
      moduleId: 'dl-module-2',
      title: 'DL-08: Gradient Descent and Optimizers',
      description: 'Batch vs Mini-batch vs Stochastic GD, momentum, adaptive learning rates (RMSprop, Adam), weight decay (AdamW), and loss landscape dynamics.',
      order: 3,
      readTimeMinutes: 30,
      visualizerType: 'gradient-descent-playground',
      difficulty: 'Intermediate',
    },
    {
      id: 'dl-09-training-loop',
      moduleId: 'dl-module-2',
      title: 'DL-09: Training a Neural Network',
      description: 'Epochs, batches, iterations, the canonical 5-step training loop, validation protocols, learning curves, and model checkpointing.',
      order: 4,
      readTimeMinutes: 26,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
  ],
};

export const dlModule2Lessons: Record<string, LessonContent> = {
  'dl-06-calculus-gradients': {
    id: 'dl-06-calculus-gradients',
    moduleId: 'dl-module-2',
    title: 'DL-06: Calculus for Neural Networks',
    subtitle: 'Derivatives, Gradients, the Multivariate Chain Rule & Computational Graphs',
    order: 1,
    readTimeMinutes: 28,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Grasp derivatives geometrically as local sensitivity multipliers: how changing x wiggles f(x)',
      'Construct and traverse computational graphs in both forward mode and reverse mode',
      'Apply the multivariate chain rule across nested composite functions',
      'Understand why reverse-mode automatic differentiation is O(1) in the number of parameters',
    ],
    prerequisites: ['DL-05: Forward Propagation', 'Basic single-variable calculus'],
    analogy: {
      title: 'The Supply Chain Price Transmission',
      text: 'Suppose an electronics company manufactures smartphones. The retail price of the phone (y) depends on the screen cost (u), and the screen cost depends on the price of rare earth minerals (x). If mineral prices increase by $1, screen costs increase by $3 (du/dx = 3). If screen costs increase by $1, the phone price increases by $2 (dy/du = 2). How much does the phone price rise if mineral prices rise by $1? The chain rule simply multiplies the sensitivities: dy/dx = (dy/du) · (du/dx) = 2 · 3 = 6. Each neuron in a deep network is simply an intermediate link in a massive mathematical supply chain.',
      metaphor: 'The derivative is a sensitivity multiplier; the chain rule is multiplying sensitivities along the transmission wire.',
    },
    problemSolved: {
      title: 'Why Numerical Differentiation Fails in Deep Networks',
      description: 'Approximating gradients numerically using finite differences (f(w + ε) - f(w)) / ε requires evaluating the entire neural network twice for every single parameter. For a model with 100 million weights, one single gradient step would take months. Reverse-mode automatic differentiation computes exact gradients for all 100 million weights in a single backward pass.',
      keyPoints: [
        'Computational Graphs: Decomposes complex nested mathematical formulas into primitive atomic operations (+, *, sin, exp).',
        'Reverse Accumulation: Backtracks from output loss L backwards, propagating adjoint values (∂L/∂node).',
        'Extreme Efficiency: One forward pass plus one backward pass computes exact gradients with respect to every parameter simultaneously.',
      ],
    },
    intuition: {
      overview: 'Calculus in deep learning is the mathematical language of credit assignment: determining exactly how much each individual weight w contributed to the final prediction error L.',
      steps: [
        { step: 1, title: 'Forward Evaluation', description: 'Compute node values in topological order from inputs to final loss L.' },
        { step: 2, title: 'Seed Adjoint', description: 'Initialize the terminal gradient at the loss node: ∂L/∂L = 1.0.' },
        { step: 3, title: 'Local Differentiation', description: 'For each operation z = f(u, v), calculate the elementary local derivatives ∂z/∂u and ∂z/∂v.' },
        { step: 4, title: 'Backward Accumulation', description: 'Multiply incoming parent gradients by local derivatives and sum contributions for multi-path branches.' },
      ],
    },
    mathematics: {
      overview: 'The fundamental mathematical rules governing reverse-mode automatic differentiation.',
      foundations: [
        {
          name: 'The Multivariate Chain Rule',
          latex: '\\frac{\\partial L}{\\partial x} = \\sum_{k \\in \\text{children}(x)} \\frac{\\partial L}{\\partial y_k} \\frac{\\partial y_k}{\\partial x}',
          explanation: 'If variable x feeds into multiple intermediate nodes y_k, its total gradient is the sum of gradients flowing along all branched paths.',
        },
        {
          name: 'Vector-Jacobian Product (VJP)',
          latex: '\\mathbf{v}^T J = \\mathbf{v}^T \\left[ \\frac{\\partial \\mathbf{y}}{\\partial \\mathbf{x}} \\right]',
          explanation: 'Frameworks like PyTorch never instantiate the full massive Jacobian matrix J; they directly compute the Vector-Jacobian Product vᵀJ.',
        },
      ],
    },
    derivation: {
      title: 'Worked Computational Graph Derivation',
      objective: 'Compute ∂L/∂x and ∂L/∂y for the composite function L = (x + y) · (y + 2).',
      steps: [
        {
          step: 1,
          label: 'Forward Graph Construction',
          latex: 'a = x + y, \\quad b = y + 2, \\quad L = a \\cdot b',
          explanation: 'Breakdown into intermediate primitive nodes a and b.',
        },
        {
          step: 2,
          label: 'Backward Seed and Local Derivatives',
          latex: '\\frac{\\partial L}{\\partial L} = 1.0, \\quad \\frac{\\partial L}{\\partial a} = b, \\quad \\frac{\\partial L}{\\partial b} = a',
          explanation: 'Product rule yields local gradients with respect to intermediate nodes.',
        },
        {
          step: 3,
          label: 'Chain Rule Propagation to x',
          latex: '\\frac{\\partial L}{\\partial x} = \\frac{\\partial L}{\\partial a} \\frac{\\partial a}{\\partial x} = b \\cdot (1) = b = y + 2',
          explanation: 'Node x only influences L through intermediate node a.',
        },
        {
          step: 4,
          label: 'Multivariate Sum Rule Propagation to y',
          latex: '\\frac{\\partial L}{\\partial y} = \\frac{\\partial L}{\\partial a} \\frac{\\partial a}{\\partial y} + \\frac{\\partial L}{\\partial b} \\frac{\\partial b}{\\partial y} = b \\cdot (1) + a \\cdot (1) = a + b = (x + y) + (y + 2) = x + 2y + 2',
          explanation: 'Node y branches into both a and b, so its total gradient is the sum of both paths.',
        },
      ],
    },
    variables: [
      { symbol: 'L', name: 'Scalar Objective / Loss', description: 'The terminal output variable being minimized', dimensions: 'Scalar' },
      { symbol: 'w', name: 'Parameter Node', description: 'Trainable weight whose gradient ∂L/∂w is desired', dimensions: 'Tensor' },
      { symbol: 'J', name: 'Jacobian Matrix', description: 'Matrix of all first-order partial derivatives of a vector function', dimensions: '(d_out, d_in)' },
      { symbol: '\\bar{x}', name: 'Adjoint / Gradient', description: 'Shorthand for the accumulated gradient ∂L/∂x', dimensions: 'Matches x' },
    ],
    numericalExample: {
      scenario: 'Evaluating gradients on the graph L = (x + y) · (y + 2) at point x = 3.0, y = -1.0.',
      dataset: [
        { x: 3.0, y: -1.0 },
      ],
      calculations: [
        { step: 'Forward Pass', math: 'a = 3.0 + (-1.0) = 2.0; b = -1.0 + 2 = 1.0; L = 2.0 * 1.0', result: '2.0' },
        { step: 'Gradient dL/da', math: 'dL/da = b = 1.0', result: '1.0' },
        { step: 'Gradient dL/db', math: 'dL/db = a = 2.0', result: '2.0' },
        { step: 'Gradient dL/dx', math: 'dL/da * da/dx = 1.0 * 1.0', result: '1.0' },
        { step: 'Gradient dL/dy', math: 'dL/da * da/dy + dL/db * db/dy = 1.0 * 1.0 + 2.0 * 1.0', result: '3.0' },
      ],
      finalConclusion: 'At point (3, -1), increasing x by ε increases loss by 1ε; increasing y by ε increases loss by 3ε.',
    },
    visualExplanation: {
      title: 'Computational Graph Architecture',
      description: 'Nodes represent variables or operations; directed edges represent signal transmission during the forward pass and gradient flow during the backward pass.',
      features: [
        'Forward pass flows from left to right, computing values and caching activations.',
        'Backward pass flows from right to left, propagating adjoint values via the chain rule.',
        'Branched nodes collect gradients additively across all incoming child paths.',
      ],
    },
    scratchCode: {
      title: 'Micro-Autograd Engine from Scratch in Python',
      code: `class Value:
    def __init__(self, data, _children=()):
        self.data = data
        self.grad = 0.0
        self._backward = lambda: None
        self._prev = set(_children)

    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data + other.data, (self, other))
        def _backward():
            self.grad += 1.0 * out.grad
            other.grad += 1.0 * out.grad
        out._backward = _backward
        return out

    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data * other.data, (self, other))
        def _backward():
            self.grad += other.data * out.grad
            other.grad += self.data * out.grad
        out._backward = _backward
        return out

    def backward(self):
        # Topological sort of the computational graph
        topo = []
        visited = set()
        def build_topo(v):
            if v not in visited:
                visited.add(v)
                for child in v._prev:
                    build_topo(child)
                topo.append(v)
        build_topo(self)

        self.grad = 1.0
        for node in reversed(topo):
            node._backward()

# Test our graph: L = (x + y) * (y + 2)
x = Value(3.0)
y = Value(-1.0)
a = x + y
b = y + 2.0
L = a * b
L.backward()

print(f"L value: {L.data}")
print(f"dL/dx:   {x.grad} (Expected 1.0)")
print(f"dL/dy:   {y.grad} (Expected 3.0)")`,
      explanation: 'Constructs a working scalar automatic differentiation engine mirroring PyTorch’s autograd engine.',
    },
    sklearnCode: {
      title: 'Automatic Differentiation in PyTorch',
      code: `import torch

# Define leaf tensors with gradient tracking
x = torch.tensor(3.0, requires_grad=True)
y = torch.tensor(-1.0, requires_grad=True)

# Build dynamic computational graph
a = x + y
b = y + 2.0
L = a * b

# Execute reverse-mode autodiff
L.backward()

print(f"PyTorch L:     {L.item()}")
print(f"PyTorch dL/dx: {x.grad.item()}")
print(f"PyTorch dL/dy: {y.grad.item()}")`,
      explanation: 'PyTorch constructs dynamic Directed Acyclic Graphs (DAGs) on the fly during the forward pass and traverses them during backward().',
    },
    runnableCode: {
      code: `import torch

# Demonstrate gradient accumulation across multi-path variables
w = torch.tensor(2.0, requires_grad=True)
x = torch.tensor(3.0)

# Two paths: path1 = w * x, path2 = w^2
# Total loss = path1 + path2 = w*x + w^2
loss = (w * x) + (w ** 2)
loss.backward()

# Analytical dLoss/dw = x + 2*w = 3 + 2*(2) = 7
print(f"Calculated Loss: {loss.item()}")
print(f"Gradient dL/dw:  {w.grad.item()}")
print(f"Analytical:      {x.item() + 2 * w.item()}")`,
      expectedOutput: 'Calculated Loss: 10.0\nGradient dL/dw:  7.0\nAnalytical:      7.0',
    },
    lineByLineExplanation: [
      { lines: '4-5', codeSnippet: 'w = torch.tensor(2.0, requires_grad=True)', explanation: 'Declares w as a leaf parameter requiring gradient accumulation.' },
      { lines: '9', codeSnippet: 'loss = (w * x) + (w ** 2)', explanation: 'Creates two parallel computation pathways originating from w.' },
      { lines: '10', codeSnippet: 'loss.backward()', explanation: 'Triggers reverse-mode autodiff, adding the gradients from both paths: d/dw(w*x) + d/dw(w^2) = x + 2w.' },
    ],
    hyperparameters: [
      { name: 'requires_grad', defaultVal: 'False', range: 'True / False', effect: 'Enables or disables tracking operations for backward graph generation', recommendation: 'Set True only for trainable model parameters; leave False for input data and validation passes.' },
      { name: 'torch.no_grad()', defaultVal: 'Context Manager', range: 'N/A', effect: 'Disables computational graph allocation during evaluation', recommendation: 'Always wrap validation and test loops with torch.no_grad() to save 60% memory.' },
    ],
    assumptions: [
      { assumption: 'Acyclic Graph Structure (DAG)', whyItMatters: 'Cycles in the computational graph cause infinite loops during backward topological traversal.', howToVerify: 'Automatic differentiation engines enforce Directed Acyclic Graphs by design.' },
      { assumption: 'Sufficient Memory for Intermediate Nodes', whyItMatters: 'Every operation in the forward pass stores its inputs for backpropagation until backward() completes.', howToVerify: 'Call optimizer.zero_grad() and delete unused tensors if memory spikes.' },
    ],
    commonMistakes: [
      { mistake: 'Accumulating gradients across iterations without calling optimizer.zero_grad()', whyWrong: 'PyTorch by default adds gradients (+=) to existing values. Forgetting to zero them out causes gradients to sum up across epochs, causing explosion.', howToFix: 'Call optimizer.zero_grad() at the beginning of every training step.', solution: 'optimizer.zero_grad(); loss.backward(); optimizer.step()' },
      { mistake: 'Performing in-place operations on tensors needed for backward()', whyWrong: 'In-place mutations (e.g. x += 1) overwrite memory values needed by the backward chain rule, triggering runtime errors.', howToFix: 'Use out-of-place functional operations: x = x + 1.', solution: 'x = x + 1' },
    ],
    realWorldUseCases: [
      { industry: 'Physics-Informed Neural Networks (PINNs)', application: 'Differential Equation Solving', benefit: 'Autograd computes exact physical derivatives (e.g. ∂²u/∂x²) to enforce Navier-Stokes fluid mechanics.' },
      { industry: 'Aerospace Engineering', application: 'Aerodynamic Shape Optimization', benefit: 'Computes sensitivity of aircraft drag with respect to thousands of wing contour control points in seconds.' },
      { industry: 'Large Language Models', application: 'Billion-Parameter Gradient Backprop', benefit: 'Reverse-mode autodiff makes training 70-billion-parameter models computationally tractable.' },
    ],
    practiceQuestions: [
      { id: 'dl06-q1', question: 'Why is reverse-mode automatic differentiation preferred over forward-mode automatic differentiation for neural networks?', hint: 'Consider the number of inputs (millions of weights) vs outputs (1 scalar loss).', answer: 'Reverse mode computes gradients for all inputs in a single backward pass when the output is a single scalar (loss L), whereas forward mode requires one pass per input parameter.', explanation: 'Reverse mode scales with the number of outputs, which is 1 (the scalar loss).' },
      { id: 'dl06-q2', question: 'If a variable x branches into two intermediate nodes y and z, which both feed into L, how is ∂L/∂x computed?', hint: 'Recall the multivariate sum rule.', answer: '∂L/∂x = (∂L/∂y)(∂y/∂x) + (∂L/∂z)(∂z/∂x).', explanation: 'Gradients from independent computational paths are summed.' },
    ],
    quiz: [
      {
        id: 'dl06-qz1',
        question: 'What is the computational complexity of reverse-mode autodiff with respect to the number of model weights W?',
        options: [
          'O(W²) — quadratic in the number of weights',
          'O(W) — linear, computing all parameter gradients in roughly 2-3x the cost of a forward pass',
          'O(log W) — logarithmic',
          'O(e^W) — exponential',
        ],
        correctIndex: 1,
        explanation: 'Reverse-mode automatic differentiation computes gradients for all parameters in a single reverse sweep with time complexity proportional to the forward pass.',
      },
      {
        id: 'dl06-qz2',
        question: 'Why does PyTorch accumulate gradients (+=) instead of overwriting them on each backward() call?',
        options: [
          'To save CPU power',
          'To easily facilitate gradient accumulation across multiple mini-batches when fitting large models on limited GPU VRAM',
          'Because subtraction is impossible in CUDA',
          'To prevent models from overfitting',
        ],
        correctIndex: 1,
        explanation: 'Gradient accumulation allows developers to simulate large effective batch sizes by summing gradients over multiple mini-batches before stepping.',
      },
      {
        id: 'dl06-qz3',
        question: 'What does the Vector-Jacobian Product (VJP) allow autograd frameworks to avoid?',
        options: [
          'It avoids running any forward pass',
          'It avoids materializing and storing massive Jacobian matrices in memory',
          'It avoids using floating point numbers',
          'It eliminates the need for activation functions',
        ],
        correctIndex: 1,
        explanation: 'For a hidden layer of size 10,000, the Jacobian matrix would have 100,000,000 entries. VJPs compute the gradient vector directly without ever creating the matrix.',
      },
    ],
    independentExercise: {
      id: 'dl06-ex',
      title: 'Verify Gradient with Finite Differences',
      problem: 'Write a Python function `check_gradient(f, x, eps=1e-5)` that computes the numerical finite difference (f(x + eps) - f(x - eps)) / (2 * eps) and compares it against PyTorch autograd gradient for f(x) = x³ + 2x² - 5x + 3.',
      hints: ['Use central differences: (f(x+eps) - f(x-eps)) / (2*eps).', 'Compare with torch autograd.'],
      starterCode: `import torch

def f(x):
    return x**3 + 2*x**2 - 5*x + 3

# Compute numerical gradient and autograd gradient at x = 2.0
`,
      solution: `import torch

def f(x):
    return x**3 + 2*x**2 - 5*x + 3

x_val = 2.0
eps = 1e-5
numerical_grad = (f(x_val + eps) - f(x_val - eps)) / (2 * eps)

x_tensor = torch.tensor(x_val, requires_grad=True)
y = f(x_tensor)
y.backward()
autograd_grad = x_tensor.grad.item()

print(f"Numerical: {numerical_grad:.6f}")
print(f"Autograd:  {autograd_grad:.6f}")
print("Match:", abs(numerical_grad - autograd_grad) < 1e-4)`,
    },
    summary: {
      keyTakeaways: [
        'Calculus provides the sensitivity multipliers (derivatives) that assign error credit to each parameter in a network.',
        'Reverse-mode automatic differentiation computes gradients for all parameters in one backward pass with linear complexity.',
        'Always zero out gradients in PyTorch (optimizer.zero_grad()) before each training iteration to prevent runaway accumulation.',
      ],
      nextLessonId: 'dl-07-backpropagation',
      nextLessonTitle: 'DL-07: Backpropagation',
      nextLessonModuleId: 'dl-module-2',
    },
  },

  'dl-07-backpropagation': {
    id: 'dl-07-backpropagation',
    moduleId: 'dl-module-2',
    title: 'DL-07: Backpropagation',
    subtitle: 'The Core Engine: Error Vectors, Weight Gradients & Full Matrix Derivation',
    order: 2,
    readTimeMinutes: 32,
    difficulty: 'Advanced',
    visualizerType: 'none',
    objectives: [
      'Master the 4 fundamental backpropagation equations connecting layer errors δ⁽ˡ⁾ to parameter gradients',
      'Derive the error propagation formula δ⁽ˡ⁾ = (W⁽ˡ⁺¹⁾ δ⁽ˡ⁺¹⁾) ⊙ σ\'(z⁽ˡ⁾) from first principles',
      'Calculate a complete numerical backpropagation step for a multi-layer network by hand',
      'Diagnose common misconceptions regarding gradient flow, batch averages, and parameter update order',
    ],
    prerequisites: ['DL-05: Forward Propagation', 'DL-06: Calculus for Neural Networks'],
    analogy: {
      title: 'The Military Debriefing Chain',
      text: 'Imagine a high-stakes military reconnaissance mission that failed. The top commander evaluates the final outcome (the loss). He doesn\'t immediately scream at the ground scout (Layer 1 weights). Instead, he debriefs his field generals (Output layer error δ⁽³⁾). The generals evaluate which tactical orders were flawed and pass specific debrief instructions down to the colonels (Hidden layer error δ⁽²⁾), who then reprimand the squad captains (Hidden layer error δ⁽¹⁾). Each rank evaluates: (1) what feedback did my superior give me? (2) what was my sub-unit doing at the time? (cached activation), and (3) adjusts their operational playbook accordingly.',
      metaphor: 'Backpropagation is an orderly backward cascade of blame assignment, calibrated by what each neuron was doing during the forward pass.',
    },
    problemSolved: {
      title: 'How to Train Deep Networks of Arbitrary Depth',
      description: 'Prior to Rumelhart, Hinton, and Williams (1986), researchers could only train single-layer perceptrons because they had no mathematical formula for updating hidden neurons that have no direct target labels. Backpropagation provides the exact recursive mathematical formula for propagating error signals through hidden layers.',
      keyPoints: [
        'Error Vector δ⁽ˡ⁾: Represents the sensitivity of the final loss with respect to pre-activation: δ⁽ˡ⁾ = ∂L/∂z⁽ˡ⁾.',
        'Recursive Chain: Computes δ⁽ˡ⁾ from the subsequent layer error δ⁽ˡ⁺¹⁾ using transpose weight matrix multiplication.',
        'Separation of Concerns: Weight gradient ∂L/∂W⁽ˡ⁾ is cleanly factored into previous activation A⁽ˡ⁻¹⁾ and current error δ⁽ˡ⁾.',
      ],
    },
    intuition: {
      overview: 'Backpropagation executes in 4 elegant matrix steps: evaluate output error, propagate error vectors backward, compute parameter gradients, and update weights.',
      steps: [
        { step: 1, title: 'Output Error', description: 'Compute error vector at the final layer: δ⁽ᴸ⁾ = ∇ₐ L ⊙ σ\'(z⁽ᴸ⁾).' },
        { step: 2, title: 'Error Back-Propagation', description: 'Propagate error to previous layers: δ⁽ˡ⁾ = (W⁽ˡ⁺¹⁾ᵀ δ⁽ˡ⁺¹⁾) ⊙ σ\'(z⁽ˡ⁾).' },
        { step: 3, title: 'Weight Gradient Computation', description: 'Form the outer product: ∂L/∂W⁽ˡ⁾ = δ⁽ˡ⁾ (a⁽ˡ⁻¹⁾)ᵀ.' },
        { step: 4, title: 'Bias Gradient Computation', description: 'Bias gradient is directly the error vector: ∂L/∂b⁽ˡ⁾ = δ⁽ˡ⁾.' },
      ],
    },
    mathematics: {
      overview: 'The four fundamental equations of backpropagation (Michael Nielsen formulation).',
      foundations: [
        {
          name: 'BP1: Output Layer Error',
          latex: '\\delta^{(L)} = \\nabla_a L \\odot \\sigma\'\\left(z^{(L)}\\right)',
          explanation: 'For Cross-Entropy with Softmax/Sigmoid, BP1 simplifies directly to δ⁽ᴸ⁾ = \\hat{y} - y.',
        },
        {
          name: 'BP2: Hidden Layer Error Recursion',
          latex: '\\delta^{(l)} = \\left( (W^{(l+1)})^T \\delta^{(l+1)} \\right) \\odot \\sigma\'\\left(z^{(l)}\\right)',
          explanation: 'Pulls the error back through transposed weights W⁽ˡ⁺¹⁾ᵀ and gates it through the local derivative σ\'(z⁽ˡ⁾).',
        },
        {
          name: 'BP3: Weight Gradient Tensor',
          latex: '\\frac{\\partial L}{\\partial W^{(l)}} = A^{(l-1)T} \\delta^{(l)}',
          explanation: 'Outer product of incoming activations with downstream errors.',
        },
        {
          name: 'BP4: Bias Gradient Vector',
          latex: '\\frac{\\partial L}{\\partial b^{(l)}} = \\sum_{i=1}^{N} \\delta^{(l)}_{i}',
          explanation: 'Sum of error vectors across all mini-batch samples.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Hidden Layer Error Recursion (BP2)',
      objective: 'Prove that δ_j⁽ˡ⁾ = ∑_k (w_kj⁽ˡ⁺¹⁾ δ_k⁽ˡ⁺¹⁾) · σ\'(z_j⁽ˡ⁾) using the multivariate chain rule.',
      steps: [
        {
          step: 1,
          label: 'Definition of Error Vector',
          latex: '\\delta_j^{(l)} \\equiv \\frac{\\partial L}{\\partial z_j^{(l)}}',
          explanation: 'Define error δ_j⁽ˡ⁾ as the rate of change of loss with respect to pre-activation z_j⁽ˡ⁾.',
        },
        {
          step: 2,
          label: 'Multivariate Chain Rule Over Downstream Neurons',
          latex: '\\delta_j^{(l)} = \\sum_k \\frac{\\partial L}{\\partial z_k^{(l+1)}} \\frac{\\partial z_k^{(l+1)}}{\\partial z_j^{(l)}} = \\sum_k \\delta_k^{(l+1)} \\frac{\\partial z_k^{(l+1)}}{\\partial z_j^{(l)}}',
          explanation: 'Node z_j⁽ˡ⁾ influences the loss only by affecting downstream pre-activations z_k⁽ˡ⁺¹⁾.',
        },
        {
          step: 3,
          label: 'Differentiating Downstream Pre-activation',
          latex: 'z_k^{(l+1)} = \\sum_m w_{km}^{(l+1)} a_m^{(l)} + b_k^{(l+1)} = \\sum_m w_{km}^{(l+1)} \\sigma\\left(z_m^{(l)}\\right) + b_k^{(l+1)}',
          explanation: 'Express z_k⁽ˡ⁺¹⁾ in terms of previous layer pre-activations.',
        },
        {
          step: 4,
          label: 'Evaluating Derivative and Vectorizing',
          latex: '\\frac{\\partial z_k^{(l+1)}}{\\partial z_j^{(l)}} = w_{kj}^{(l+1)} \\sigma\'\\left(z_j^{(l)}\\right) \\implies \\delta_j^{(l)} = \\sum_k \\delta_k^{(l+1)} w_{kj}^{(l+1)} \\sigma\'\\left(z_j^{(l)}\\right)',
          explanation: 'In matrix form: δ⁽ˡ⁾ = ((W⁽ˡ⁺¹⁾)ᵀ δ⁽ˡ⁺¹⁾) ⊙ σ\'(z⁽ˡ⁾). This establishes the complete backward recursion.',
        },
      ],
    },
    variables: [
      { symbol: '\\delta^{(l)}', name: 'Error Vector at Layer l', description: 'Sensitivity gradient ∂L/∂z⁽ˡ⁾', dimensions: '(N, d_l)' },
      { symbol: 'W^{(l)}', name: 'Layer Weight Matrix', description: 'Transposed during backward pass to route error signals', dimensions: '(d_{l-1}, d_l)' },
      { symbol: 'A^{(l-1)}', name: 'Previous Layer Activation', description: 'Acts as scaling factor for weight gradients', dimensions: '(N, d_{l-1})' },
      { symbol: '\\odot', name: 'Hadamard Product', description: 'Element-wise tensor multiplication', dimensions: 'Matches operands' },
    ],
    numericalExample: {
      scenario: 'Hand computation of a 1-step backpropagation update for a 1-hidden-neuron network.',
      dataset: [
        { x: 2.0, target: 1.0, w1: 0.5, b1: 0.0, w2: 1.0, b2: 0.0, lr: 0.1 },
      ],
      calculations: [
        { step: 'Forward: Hidden Node', math: 'z1 = (2.0)(0.5) + 0 = 1.0; a1 = ReLU(1.0)', result: '1.0' },
        { step: 'Forward: Output Node', math: 'z2 = (1.0)(1.0) + 0 = 1.0; a2 = Sigmoid(1.0) = 1/(1+e^-1)', result: '0.7311' },
        { step: 'Output Error delta2 (BCE)', math: 'delta2 = a2 - y = 0.7311 - 1.0', result: '-0.2689' },
        { step: 'Weight 2 Gradient', math: 'dL/dw2 = delta2 * a1 = (-0.2689)(1.0)', result: '-0.2689' },
        { step: 'Hidden Error delta1', math: 'delta1 = (w2 * delta2) * ReLU\'(z1) = (1.0 * -0.2689) * (1.0)', result: '-0.2689' },
        { step: 'Weight 1 Gradient', math: 'dL/dw1 = delta1 * x = (-0.2689)(2.0)', result: '-0.5378' },
        { step: 'Updated w1', math: 'w1_new = w1 - lr * (dL/dw1) = 0.5 - 0.1 * (-0.5378)', result: '0.5538' },
        { step: 'Updated w2', math: 'w2_new = w2 - lr * (dL/dw2) = 1.0 - 0.1 * (-0.2689)', result: '1.0269' },
      ],
      finalConclusion: 'Both weights increased, driving future prediction a2 higher towards ground truth 1.0.',
    },
    visualExplanation: {
      title: 'Backpropagation Gradient Flow Architecture',
      description: 'Error signals flow backwards through the network transposed weights and get modulated by local activation slopes.',
      features: [
        'Forward signals propagate activations A⁽ˡ⁾ from input to output.',
        'Backward signals propagate error tensors δ⁽ˡ⁾ from output back to input.',
        'Gradient ∂L/∂W⁽ˡ⁾ is formed by outer product of forward activation A⁽ˡ⁻¹⁾ and backward error δ⁽ˡ⁾.',
      ],
    },
    scratchCode: {
      title: 'Complete 2-Layer Neural Network with Backprop from Scratch in NumPy',
      code: `import numpy as np

# Synthetic non-linear data (XOR)
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([[0], [1], [1], [0]])

np.random.seed(42)
W1 = np.random.randn(2, 4) * np.sqrt(2/2) # He init
b1 = np.zeros((1, 4))
W2 = np.random.randn(4, 1) * 0.1
b2 = np.zeros((1, 1))

lr = 0.5
epochs = 2000

for epoch in range(epochs):
    # 1. Forward Pass
    Z1 = X @ W1 + b1
    A1 = np.maximum(0, Z1) # ReLU
    Z2 = A1 @ W2 + b2
    A2 = 1.0 / (1.0 + np.exp(-np.clip(Z2, -15, 15))) # Sigmoid
    
    # 2. Backward Pass
    # BP1: Output error (BCE + Sigmoid shortcut: A2 - y)
    dZ2 = (A2 - y) / X.shape[0]
    dW2 = A1.T @ dZ2
    db2 = np.sum(dZ2, axis=0, keepdims=True)
    
    # BP2: Hidden error recursion
    dA1 = dZ2 @ W2.T
    dZ1 = dA1 * (Z1 > 0).astype(float) # ReLU gradient
    dW1 = X.T @ dZ1
    db1 = np.sum(dZ1, axis=0, keepdims=True)
    
    # 3. Parameter Updates
    W2 -= lr * dW2
    b2 -= lr * db2
    W1 -= lr * dW1
    b1 -= lr * db1

print("Final Predictions on XOR after 2000 epochs:")
print(np.round(A2, 4))`,
      explanation: 'Full vectorized NumPy implementation of backpropagation successfully solving the non-linearly separable XOR problem.',
    },
    sklearnCode: {
      title: 'Manual Gradient Verification vs PyTorch Autograd',
      code: `import torch
import numpy as np

# Verify that manual backprop formula matches PyTorch autograd exactly
x = torch.tensor([[1.5, -0.5]], requires_grad=False)
y = torch.tensor([[1.0]], requires_grad=False)

W1 = torch.tensor([[0.8, -0.2], [0.4, 0.9]], requires_grad=True)
b1 = torch.tensor([[0.1, -0.1]], requires_grad=True)

# Forward pass
z1 = x @ W1 + b1
a1 = torch.relu(z1)
loss = 0.5 * torch.sum((a1 - y)**2)

# Autograd
loss.backward()

# Manual calculation
with torch.no_grad():
    da1 = a1 - y
    dz1 = da1 * (z1 > 0).float()
    manual_dW1 = x.t() @ dz1

print("Autograd W1 grad:\\n", W1.grad)
print("Manual W1 grad:\\n", manual_dW1)
print("Exact Match:", torch.allclose(W1.grad, manual_dW1))`,
      explanation: 'Confirms that manual analytical matrix backpropagation formulas produce bit-for-bit identical results to PyTorch autograd.',
    },
    runnableCode: {
      code: `import numpy as np

# Demonstrate backward gradient shape preservation
N, d_in, d_h, d_out = 4, 3, 5, 2
X = np.random.randn(N, d_in)
W1 = np.random.randn(d_in, d_h)
W2 = np.random.randn(d_h, d_out)
y = np.random.randn(N, d_out)

# Forward
Z1 = X @ W1
A1 = np.maximum(0, Z1)
Z2 = A1 @ W2
loss = 0.5 * np.sum((Z2 - y)**2)

# Backward
dZ2 = Z2 - y
dW2 = A1.T @ dZ2
dZ1 = (dZ2 @ W2.T) * (Z1 > 0)
dW1 = X.T @ dZ1

print(f"W1 shape: {W1.shape} -> dW1 shape: {dW1.shape}")
print(f"W2 shape: {W2.shape} -> dW2 shape: {dW2.shape}")
print("Gradient shapes match parameter shapes exactly!")`,
      expectedOutput: 'W1 shape: (3, 5) -> dW1 shape: (3, 5)\nW2 shape: (5, 2) -> dW2 shape: (5, 2)\nGradient shapes match parameter shapes exactly!',
    },
    lineByLineExplanation: [
      { lines: '2', codeSnippet: 'N, d_in, d_h, d_out = 4, 3, 5, 2', explanation: 'Defines dimensions for mini-batch size, input features, hidden width, and output features.' },
      { lines: '14', codeSnippet: 'dZ2 = Z2 - y', explanation: 'Computes output layer error tensor δ⁽²⁾ of shape (N, d_out).' },
      { lines: '15', codeSnippet: 'dW2 = A1.T @ dZ2', explanation: 'Computes weight gradient: (d_h, N) @ (N, d_out) yields (d_h, d_out).' },
      { lines: '16-17', codeSnippet: 'dZ1 = (dZ2 @ W2.T) * (Z1 > 0); dW1 = X.T @ dZ1', explanation: 'Propagates error back through W2.T and computes dW1 of shape (d_in, d_h).' },
    ],
    hyperparameters: [
      { name: 'learning_rate', defaultVal: '0.001', range: '1e-5 to 0.1', effect: 'Multiplier scaling the magnitude of weight updates along the negative gradient', recommendation: '0.001 for Adam; 0.01-0.1 for SGD with momentum.' },
      { name: 'gradient_clipping', defaultVal: 'None', range: '1.0 to 5.0 (norm)', effect: 'Rescales gradients if their global L2 norm exceeds threshold to prevent exploding gradients', recommendation: 'Always clip gradients to max_norm=1.0 when training RNNs or Transformers.' },
    ],
    assumptions: [
      { assumption: 'Differentiable Objective and Activations', whyItMatters: 'If any layer in the computational chain has undefined derivatives, gradient flow breaks.', howToVerify: 'Verify that all custom layers define explicit forward and backward functions.' },
      { assumption: 'Stationary Data Distribution During Batch Updates', whyItMatters: 'If data distribution shifts between forward and backward passes, computed gradients point in incorrect directions.', howToVerify: 'Shuffle data between epochs.' },
    ],
    commonMistakes: [
      { mistake: 'Forgetting to transpose the weight matrix in the error recursion', whyWrong: 'Multiplying dZ2 @ W2 instead of dZ2 @ W2.T results in dimension mismatch and incorrect signal routing.', howToFix: 'Always transpose the downstream weight matrix: dA1 = dZ2 @ W2.T.', solution: 'dA1 = dZ2 @ W2.T' },
      { mistake: 'Applying activation derivative to activated outputs instead of pre-activations', whyWrong: 'Writing ReLU\'(A1) instead of ReLU\'(Z1) causes subtle bugs if activation ranges do not match.', howToFix: 'Store pre-activation Z in cache and compute derivative with respect to Z.', solution: 'dZ = dA * (Z > 0)' },
    ],
    realWorldUseCases: [
      { industry: 'Deep Reinforcement Learning', application: 'Policy Gradient & Q-Learning', benefit: 'Backpropagates reward temporal-difference errors through deep actor and critic networks.' },
      { industry: 'Generative Adversarial Networks (GANs)', application: 'Adversarial Backpropagation', benefit: 'Backpropagates discriminator classification gradients through the generator to synthesize photorealistic images.' },
      { industry: 'Biomedical Discovery', application: 'AlphaFold Protein Folding', benefit: 'Backpropagates 3D structural coordinate distance errors through 48 attention layers to predict protein geometry.' },
    ],
    practiceQuestions: [
      { id: 'dl07-q1', question: 'What is the formula for the weight gradient ∂L/∂W⁽ˡ⁾ in terms of previous activation A⁽ˡ⁻¹⁾ and current error δ⁽ˡ⁾?', hint: 'Recall matrix outer product.', answer: '∂L/∂W⁽ˡ⁾ = (A⁽ˡ⁻¹⁾)ᵀ · δ⁽ˡ⁾.', explanation: 'The weight gradient is the product of the incoming feature activation and the downstream error.' },
      { id: 'dl07-q2', question: 'Why does the bias gradient ∂L/∂b⁽ˡ⁾ equal the sum of error vectors across the batch?', hint: 'What is the derivative of z = Wx + b with respect to b?', answer: 'Because ∂z/∂b = 1, so by the chain rule ∂L/∂b = (∂L/∂z) · 1 = δ, summed over all samples in the batch.', explanation: 'Bias affects every sample equally with multiplier 1.' },
    ],
    quiz: [
      {
        id: 'dl07-qz1',
        question: 'In the backpropagation equation δ⁽ˡ⁾ = ((W⁽ˡ⁺¹⁾)ᵀ δ⁽ˡ⁺¹⁾) ⊙ σ\'(z⁽ˡ⁾), what does the symbol ⊙ represent?',
        options: [
          'Matrix multiplication',
          'Element-wise (Hadamard) product',
          'Kronecker tensor product',
          'Cross product',
        ],
        correctIndex: 1,
        explanation: 'The Hadamard product ⊙ indicates that each element of the backpropagated error is multiplied by the corresponding local derivative slope.',
      },
      {
        id: 'dl07-qz2',
        question: 'If a hidden neuron has pre-activation z = -2.0 and uses ReLU activation, what is its contribution to backward gradient propagation?',
        options: [
          'It doubles the gradient',
          'It transmits exactly 0 gradient backward because ReLU\'(-2.0) = 0',
          'It inverts the gradient sign',
          'It divides the gradient by 2',
        ],
        correctIndex: 1,
        explanation: 'Because ReLU has derivative 0 for negative inputs, it completely blocks the backward gradient from flowing through that neuron.',
      },
      {
        id: 'dl07-qz3',
        question: 'Who popularized the backpropagation algorithm for multi-layer artificial neural networks in their landmark 1986 Nature paper?',
        options: [
          'Alan Turing and John von Neumann',
          'David Rumelhart, Geoffrey Hinton, and Ronald Williams',
          'Claude Shannon and Norbert Wiener',
          'Ada Lovelace and Charles Babbage',
        ],
        correctIndex: 1,
        explanation: 'Rumelhart, Hinton, and Williams demonstrated that backpropagation enables multi-layer neural networks to learn internal representations.',
      },
    ],
    independentExercise: {
      id: 'dl07-ex',
      title: 'Implement the Backprop Error Recursion Step',
      problem: 'Write a Python function `backward_hidden_layer(dZ_next, W_next, Z_curr)` that computes dZ_curr for a hidden layer with ReLU activation.',
      hints: ['Compute dA_curr = dZ_next @ W_next.T.', 'Multiply element-wise by (Z_curr > 0).astype(float).'],
      starterCode: `import numpy as np

def backward_hidden_layer(dZ_next, W_next, Z_curr):
    # Compute error vector for current layer
    pass

dZ_next = np.array([[0.5, -0.2]])
W_next = np.array([[0.8, -0.5], [1.0, 0.4], [-0.3, 0.7]]) # (3, 2)
Z_curr = np.array([[1.2, -0.5, 0.8]]) # (1, 3)
`,
      solution: `import numpy as np

def backward_hidden_layer(dZ_next, W_next, Z_curr):
    dA_curr = dZ_next @ W_next.T
    dZ_curr = dA_curr * (Z_curr > 0).astype(float)
    return dZ_curr

dZ_next = np.array([[0.5, -0.2]])
W_next = np.array([[0.8, -0.5], [1.0, 0.4], [-0.3, 0.7]]) # (3, 2)
Z_curr = np.array([[1.2, -0.5, 0.8]]) # (1, 3)
print("dZ_curr:", backward_hidden_layer(dZ_next, W_next, Z_curr))`,
    },
    summary: {
      keyTakeaways: [
        'Backpropagation recursively applies the chain rule backward from the loss: δ⁽ˡ⁾ = ((W⁽ˡ⁺¹⁾)ᵀ δ⁽ˡ⁺¹⁾) ⊙ σ\'(z⁽ˡ⁾).',
        'Parameter gradients are computed as outer products between cached forward activations and backward error tensors.',
        'Backprop enables efficient credit assignment in networks of arbitrary depth.',
      ],
      nextLessonId: 'dl-08-optimizers',
      nextLessonTitle: 'DL-08: Gradient Descent and Optimizers',
      nextLessonModuleId: 'dl-module-2',
    },
  },

  'dl-08-optimizers': {
    id: 'dl-08-optimizers',
    moduleId: 'dl-module-2',
    title: 'DL-08: Gradient Descent and Optimizers',
    subtitle: 'From SGD to AdamW: Momentum, RMSprop, Adaptive Learning Rates & Weight Decay',
    order: 3,
    readTimeMinutes: 30,
    difficulty: 'Intermediate',
    visualizerType: 'gradient-descent-playground',
    objectives: [
      'Compare Batch Gradient Descent, Stochastic Gradient Descent (SGD), and Mini-Batch Gradient Descent',
      'Explain physical Momentum and how Exponentially Weighted Moving Averages prevent ravines and oscillations',
      'Understand adaptive per-parameter learning rate algorithms: RMSprop, Adam, and the AdamW decoupled weight decay fix',
      'Use the interactive Gradient Descent Playground to observe optimizer trajectory dynamics across convex and non-convex surfaces',
    ],
    prerequisites: ['DL-07: Backpropagation', 'Gradient vectors'],
    analogy: {
      title: 'The Heavy Bowling Ball vs The Parched Traveler',
      text: 'Vanilla SGD is like a blinded hiker stepping in the steepest downward direction at every second: in a steep, narrow canyon (an ill-conditioned loss ravine), he bounces wildly back and forth across the walls, making painfully slow progress down the valley floor. Momentum gives the hiker mass, turning him into a heavy bowling ball rolling down the mountain: horizontal vibrations cancel out, while momentum accumulates along the consistent downhill trajectory, rolling right through small bumps. Adam adds a smart odometer that measures how rocky each separate direction is, giving cautious steps on steep volatile axes and confident strides on smooth flat axes.',
      metaphor: 'SGD steps blindly on the immediate slope; Momentum remembers velocity; Adam tunes individual stride lengths for every single parameter.',
    },
    problemSolved: {
      title: 'Overcoming Pathological Curvature and Sparse Gradients',
      description: 'Loss surfaces in deep learning feature ravines where curvature is sharp in one dimension but flat in another. A uniform global learning rate either oscillates uncontrollably on the steep axis or crawls on the flat axis. Modern adaptive optimizers solve this by computing individual, scale-invariant step sizes for every single parameter.',
      keyPoints: [
        'Momentum (Polyak 1964): Accelerates in consistent gradient directions and dampens perpendicular oscillations.',
        'RMSprop (Hinton 2012): Divides parameter updates by the moving root-mean-square of past gradients, equalizing step sizes.',
        'Adam (Kingma & Ba 2014): Combines first-moment momentum with second-moment gradient scaling and bias correction.',
        'AdamW (Loshchilov & Hutter 2017): Decouples L2 regularization from gradient updates, fixing a historical flaw in Adam.',
      ],
    },
    intuition: {
      overview: 'An optimizer translates the raw gradient vector g = ∇_w L into an intelligent parameter update step Δw that balances convergence speed, stability, and generalization.',
      steps: [
        { step: 1, title: 'Gradient Computation', description: 'Compute mini-batch gradient g_t = ∇_w L(w_t).' },
        { step: 2, title: 'First Moment (Velocity)', description: 'Update exponential moving average of past gradients: m_t = β₁ m_{t-1} + (1 - β₁) g_t.' },
        { step: 3, title: 'Second Moment (Variance)', description: 'Update exponential moving average of squared gradients: v_t = β₂ v_{t-1} + (1 - β₂) g_t².' },
        { step: 4, title: 'Bias Correction', description: 'Correct for zero-initialization bias in early steps: m_hat = m_t / (1 - β₁^t), v_hat = v_t / (1 - β₂^t).' },
        { step: 5, title: 'Parameter Update', description: 'Update parameters: w_{t+1} = w_t - (α / (√v_hat + ε)) · m_hat.' },
      ],
    },
    mathematics: {
      overview: 'Mathematical formulation of the industry-standard optimization algorithms.',
      foundations: [
        {
          name: 'Stochastic Gradient Descent with Momentum',
          latex: 'v_t = \\beta v_{t-1} + \\alpha g_t, \\quad w_{t+1} = w_t - v_t',
          explanation: 'Accumulates velocity vector v with momentum coefficient β (typically 0.9).',
        },
        {
          name: 'RMSprop Update Rule',
          latex: 's_t = \\beta_2 s_{t-1} + (1 - \\beta_2) g_t^2, \\quad w_{t+1} = w_t - \\frac{\\alpha}{\\sqrt{s_t + \\epsilon}} \\odot g_t',
          explanation: 'Normalizes gradients by their running variance s_t with decay factor β₂ (typically 0.99).',
        },
        {
          name: 'Adam (Adaptive Moment Estimation)',
          latex: 'm_t = \\beta_1 m_{t-1} + (1 - \\beta_1) g_t, \\quad v_t = \\beta_2 v_{t-1} + (1 - \\beta_2) g_t^2',
          explanation: 'Standard parameters: β₁ = 0.9, β₂ = 0.999, ε = 1e-8.',
        },
        {
          name: 'AdamW Decoupled Weight Decay',
          latex: 'w_{t+1} = w_t - \\alpha \\lambda w_t - \\frac{\\alpha}{\\sqrt{\\hat{v}_t} + \\epsilon} \\hat{m}_t',
          explanation: 'Applies L2 weight decay λ directly to parameter w_t rather than adding it to gradient g_t.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Adam Bias Correction Term',
      objective: 'Prove why m_t must be divided by (1 - β₁^t) to guarantee that E[m_hat_t] = E[g_t] when m₀ = 0.',
      steps: [
        {
          step: 1,
          label: 'Unrolling the Recursive Formula',
          latex: 'm_t = (1 - \\beta_1) \\sum_{i=1}^{t} \\beta_1^{t-i} g_i',
          explanation: 'Repeatedly expanding m_t = β₁ m_{t-1} + (1 - β₁) g_t with initial condition m₀ = 0.',
        },
        {
          step: 2,
          label: 'Taking Expectations',
          latex: '\\mathbb{E}[m_t] = \\mathbb{E}\\left[ (1 - \\beta_1) \\sum_{i=1}^{t} \\beta_1^{t-i} g_i \\right] = \\mathbb{E}[g_t] (1 - \\beta_1) \\sum_{i=1}^{t} \\beta_1^{t-i}',
          explanation: 'Assuming the true gradient distribution has mean E[g_t].',
        },
        {
          step: 3,
          label: 'Sum of Finite Geometric Series',
          latex: '\\sum_{i=1}^{t} \\beta_1^{t-i} = \\frac{1 - \\beta_1^t}{1 - \\beta_1} \\implies \\mathbb{E}[m_t] = \\mathbb{E}[g_t] (1 - \\beta_1) \\frac{1 - \\beta_1^t}{1 - \\beta_1} = \\mathbb{E}[g_t] (1 - \\beta_1^t)',
          explanation: 'The finite geometric series sums to (1 - β₁^t) / (1 - β₁), cancelling the (1 - β₁) term.',
        },
        {
          step: 4,
          label: 'Normalized Unbiased Estimator',
          latex: '\\hat{m}_t = \\frac{m_t}{1 - \\beta_1^t} \\implies \\mathbb{E}[\\hat{m}_t] = \\mathbb{E}[g_t]',
          explanation: 'Dividing by (1 - β₁^t) eliminates initial cold-start bias towards zero during early training steps.',
        },
      ],
    },
    variables: [
      { symbol: 'w_t', name: 'Parameter Vector', description: 'Model weights at optimization step t', dimensions: 'Matches parameters' },
      { symbol: 'g_t', name: 'Mini-Batch Gradient', description: 'Instantaneous gradient ∇_w L at current step', dimensions: 'Matches parameters' },
      { symbol: 'm_t', name: 'First Moment Vector', description: 'Running mean of gradients (momentum)', dimensions: 'Matches parameters' },
      { symbol: 'v_t', name: 'Second Moment Vector', description: 'Running variance of uncentered squared gradients', dimensions: 'Matches parameters' },
      { symbol: '\\alpha', name: 'Learning Rate', description: 'Base step size hyperparameter', dimensions: 'Scalar (typically 1e-3)' },
    ],
    numericalExample: {
      scenario: 'Calculating step 1 of the Adam optimizer for 1 parameter with initial g₁ = 0.5, α = 0.1.',
      dataset: [
        { step: 1, grad: 0.5, beta1: 0.9, beta2: 0.999, eps: 1e-8, lr: 0.1 },
      ],
      calculations: [
        { step: 'First Moment m1', math: '0.9 * 0 + (1 - 0.9) * 0.5 = 0.05', result: '0.05' },
        { step: 'Second Moment v1', math: '0.999 * 0 + (1 - 0.999) * 0.5^2 = 0.001 * 0.25', result: '0.00025' },
        { step: 'Bias Correction m_hat1', math: '0.05 / (1 - 0.9^1) = 0.05 / 0.10', result: '0.50' },
        { step: 'Bias Correction v_hat1', math: '0.00025 / (1 - 0.999^1) = 0.00025 / 0.001', result: '0.25' },
        { step: 'Parameter Step Delta w', math: '(0.1 / (sqrt(0.25) + 1e-8)) * 0.50 = (0.1 / 0.50) * 0.50', result: '0.10' },
      ],
      finalConclusion: 'Adam cleanly scales the step so that regardless of scale, initial step size is exactly bounded by learning rate α = 0.1.',
    },
    visualExplanation: {
      title: 'Interactive Gradient Descent Playground',
      description: 'The visualizer above simulates optimization trajectories on convex and non-convex loss surfaces.',
      features: [
        'Switch between Convex Bowl and Non-Convex Landscape with local minima.',
        'Compare SGD, Momentum, RMSprop, and Adam navigating the landscape.',
        'Observe how excessive learning rate α triggers oscillations or runaway divergence.',
      ],
    },
    scratchCode: {
      title: 'Implementing Adam Optimizer in Pure Python / NumPy',
      code: `import numpy as np

class AdamOptimizer:
    def __init__(self, params, lr=0.001, beta1=0.9, beta2=0.999, eps=1e-8):
        self.params = params
        self.lr = lr
        self.beta1 = beta1
        self.beta2 = beta2
        self.eps = eps
        self.t = 0
        self.m = {k: np.zeros_like(v) for k, v in params.items()}
        self.v = {k: np.zeros_like(v) for k, v in params.items()}

    def step(self, grads):
        self.t += 1
        for k in self.params:
            g = grads[k]
            # Update biased first & second moments
            self.m[k] = self.beta1 * self.m[k] + (1 - self.beta1) * g
            self.v[k] = self.beta2 * self.v[k] + (1 - self.beta2) * (g ** 2)
            
            # Compute bias-corrected moments
            m_hat = self.m[k] / (1.0 - self.beta1 ** self.t)
            v_hat = self.v[k] / (1.0 - self.beta2 ** self.t)
            
            # Update parameter
            self.params[k] -= (self.lr / (np.sqrt(v_hat) + self.eps)) * m_hat

# Test optimizer on a 2D quadratic loss: L(w) = w1^2 + 10*w2^2 (an ill-conditioned ravine)
weights = {'w': np.array([5.0, 5.0])}
opt = AdamOptimizer(weights, lr=0.2)

for i in range(25):
    # Gradients of 0.5 * (w1^2 + 10*w2^2)
    grads = {'w': np.array([weights['w'][0], 10.0 * weights['w'][1]])}
    opt.step(grads)

print("Optimized weights after 25 steps (Target [0, 0]):")
print(np.round(weights['w'], 4))`,
      explanation: 'Constructs an Adam optimizer from scratch and demonstrates rapid convergence on an ill-conditioned anisotropic ravine.',
    },
    sklearnCode: {
      title: 'PyTorch Optimizers (AdamW vs SGD)',
      code: `import torch
import torch.nn as nn
import torch.optim as optim

model = nn.Linear(10, 2)

# Industry Standard for Modern Transformers & CNNs
optimizer_adamw = optim.AdamW(model.parameters(), lr=1e-3, weight_decay=0.01)

# Classical SGD with Nesterov Momentum for ResNets
optimizer_sgd = optim.SGD(model.parameters(), lr=0.1, momentum=0.9, nesterov=True, weight_decay=1e-4)

# Canonical update sequence
x = torch.randn(4, 10)
y = torch.tensor([0, 1, 0, 1])

optimizer_adamw.zero_grad()
loss = nn.CrossEntropyLoss()(model(x), y)
loss.backward()
optimizer_adamw.step()

print("AdamW optimization step executed successfully!")`,
      explanation: 'In modern deep learning, AdamW is the default optimizer for Transformers and LLMs, while SGD with momentum is standard for classical computer vision (ResNets).',
    },
    runnableCode: {
      code: `import numpy as np

# Compare 1D step size of SGD vs Adam on large gradient
lr = 0.1
grad_large = 1000.0

# SGD step
sgd_step = lr * grad_large

# Adam step (after 10 steps of consistent gradient)
# m_hat ≈ g, v_hat ≈ g^2 -> m_hat / sqrt(v_hat) ≈ 1.0
adam_step = lr * 1.0

print(f"Gradient magnitude: {grad_large}")
print(f"SGD step size:      {sgd_step:.2f} (Explosive!)")
print(f"Adam step size:     {adam_step:.2f} (Self-regulating!)")`,
      expectedOutput: 'Gradient magnitude: 1000.0\nSGD step size:      100.00 (Explosive!)\nAdam step size:     0.10 (Self-regulating!)',
    },
    lineByLineExplanation: [
      { lines: '2-3', codeSnippet: 'lr = 0.1; grad_large = 1000.0', explanation: 'Simulates a massive spike in gradient magnitude.' },
      { lines: '6', codeSnippet: 'sgd_step = lr * grad_large', explanation: 'SGD step explodes linearly to 100.0, which throws weights out of the valley.' },
      { lines: '10', codeSnippet: 'adam_step = lr * 1.0', explanation: 'Adam divides by the second moment, bounding the effective step to approximately α = 0.10.' },
    ],
    hyperparameters: [
      { name: 'learning_rate', defaultVal: '0.001', range: '1e-5 to 0.1', effect: 'Base step size', recommendation: 'Start with 3e-4 (the "Karpathy constant") for Adam/AdamW.' },
      { name: 'betas', defaultVal: '(0.9, 0.999)', range: 'β1 ∈ [0.85, 0.95], β2 ∈ [0.95, 0.9999]', effect: 'Decay rates for first and second gradient moments', recommendation: 'Keep standard (0.9, 0.999); for RL or noisy gradients, β2=0.99 can stabilize.' },
      { name: 'weight_decay', defaultVal: '0.01', range: '1e-4 to 0.1', effect: 'Decoupled L2 regularization rate in AdamW', recommendation: '0.01 is standard in Transformer pre-training.' },
    ],
    assumptions: [
      { assumption: 'Lipschitz Smoothness of Loss', whyItMatters: 'If loss gradients jump discontinuously, second-moment estimates lag behind, destabilizing updates.', howToVerify: 'Use gradient clipping (torch.nn.utils.clip_grad_norm_).' },
      { assumption: 'Adequate Mini-Batch Representation', whyItMatters: 'Extremely noisy mini-batches (e.g. batch size = 1) degrade moment estimates in Adam.', howToVerify: 'Ensure batch size is at least 32 or use gradient accumulation.' },
    ],
    commonMistakes: [
      { mistake: 'Using Adam instead of AdamW when applying weight decay', whyWrong: 'In original Adam, L2 regularization is added to the gradient, meaning parameters with large gradient history receive LESS weight decay penalty, defeating regularization.', howToFix: 'Always use torch.optim.AdamW instead of torch.optim.Adam.', solution: 'optim.AdamW(model.parameters(), lr=1e-3, weight_decay=0.01)' },
      { mistake: 'Setting learning rate too high with Adam', whyWrong: 'While Adam bounds step sizes, an overly high α still leads to divergence or plateauing in poor local minima.', howToFix: 'Use a learning rate warmup schedule for the first 1000-2000 steps.', solution: 'optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=...)' },
    ],
    realWorldUseCases: [
      { industry: 'Generative AI & LLMs', application: 'LLaMA & GPT Pretraining', benefit: 'AdamW with cosine learning rate warmup is the universal optimizer for training foundation models.' },
      { industry: 'Computer Vision', application: 'ImageNet ResNet Training', benefit: 'SGD with momentum 0.9 and step-decay schedules achieves higher final generalization accuracy on pure image classification.' },
      { industry: 'Recommender Systems', application: 'Sparse Embedding Updates', benefit: 'Adagrad or Adam adjusts learning rates individually for rare items vs popular items.' },
    ],
    practiceQuestions: [
      { id: 'dl08-q1', question: 'What is the primary difference between L2 regularization in Adam vs decoupled weight decay in AdamW?', hint: 'Where is the penalty applied: to the gradient g_t or directly to weight w_t?', answer: 'Adam adds λw to the gradient g_t before second-moment normalization, distorting decay; AdamW subtracts αλw directly from the weight vector, ensuring uniform decay across all parameters.', explanation: 'AdamW decouples weight decay from adaptive gradient scaling.' },
      { id: 'dl08-q2', question: 'Why is Momentum particularly effective in ill-conditioned loss ravines?', hint: 'What happens to oscillating gradients in opposite directions when averaged?', answer: 'Gradients oscillating between opposite canyon walls cancel out when averaged over time, while gradients pointing down the canyon accumulate velocity.', explanation: 'This accelerates progress along the valley floor while damping perpendicular bounce.' },
    ],
    quiz: [
      {
        id: 'dl08-qz1',
        question: 'Which optimizer is considered the default industry standard for training modern Transformers and Large Language Models?',
        options: [
          'Vanilla Stochastic Gradient Descent (SGD)',
          'AdamW (Adam with Decoupled Weight Decay)',
          'Genetic Algorithm',
          'Simulated Annealing',
        ],
        correctIndex: 1,
        explanation: 'AdamW is the ubiquitous standard optimizer across modern LLMs, Transformers, and vision models due to its adaptive learning rate and proper weight decay regularization.',
      },
      {
        id: 'dl08-qz2',
        question: 'What is the purpose of the bias correction step m_hat = m_t / (1 - β₁^t) in the Adam optimizer?',
        options: [
          'To ensure weights do not exceed 1.0',
          'To prevent the moving averages from being biased towards zero during initial training steps when m₀ = 0',
          'To convert floating point values to integers',
          'To enable GPU memory compression',
        ],
        correctIndex: 1,
        explanation: 'Because moment vectors are initialized to zeros, early steps would severely underestimate the true gradient without dividing by (1 - β^t).',
      },
      {
        id: 'dl08-qz3',
        question: 'How does RMSprop adapt learning rates for individual parameters?',
        options: [
          'It doubles the learning rate whenever a parameter changes sign',
          'It divides updates by the square root of an exponential moving average of squared gradients (√s_t + ε)',
          'It randomly drops 50% of the weights on each step',
          'It multiplies all weights by a random Gaussian vector',
        ],
        correctIndex: 1,
        explanation: 'RMSprop scales step sizes inversely proportional to the root-mean-square of past gradients, calming noisy parameters and boosting sluggish ones.',
      },
    ],
    independentExercise: {
      id: 'dl08-ex',
      title: 'Compare SGD vs Momentum on a 1D Quadratic',
      problem: 'Implement a function `simulate_sgd_momentum(lr=0.9, beta=0.9, steps=10)` optimizing f(w) = w² from w0 = 5.0. Print the sequence of w values and verify that Momentum accelerates towards 0.',
      hints: ['Gradient is 2*w.', 'Update v = beta*v + lr*grad; w = w - v.'],
      starterCode: `def simulate_sgd_momentum(lr=0.1, beta=0.9, steps=10):
    # Track parameter updates
    pass

simulate_sgd_momentum()
`,
      solution: `def simulate_sgd_momentum(lr=0.1, beta=0.9, steps=10):
    w = 5.0
    v = 0.0
    print(f"Step 0: w = {w:.4f}")
    for i in range(1, steps + 1):
        grad = 2.0 * w
        v = beta * v + (1 - beta) * grad
        w = w - lr * v
        print(f"Step {i:2d}: w = {w:8.4f}, v = {v:8.4f}")
    return w

simulate_sgd_momentum()`,
    },
    summary: {
      keyTakeaways: [
        'AdamW combines the adaptive per-parameter step sizes of RMSprop with the directional inertia of Momentum.',
        'Always default to AdamW (learning rate ~ 3e-4) for general deep learning tasks.',
        'Gradient descent algorithms require careful learning rate schedules (warmup + cosine decay) to achieve state-of-the-art results.',
      ],
      nextLessonId: 'dl-09-training-loop',
      nextLessonTitle: 'DL-09: Training a Neural Network',
      nextLessonModuleId: 'dl-module-2',
    },
  },

  'dl-09-training-loop': {
    id: 'dl-09-training-loop',
    moduleId: 'dl-module-2',
    title: 'DL-09: Training a Neural Network',
    subtitle: 'Epochs, Batches, the Canonical 5-Step Loop & Generalization Diagnostics',
    order: 4,
    readTimeMinutes: 26,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Master the distinction between Epochs, Batches, and Iterations in deep learning workflows',
      'Implement the canonical 5-step training loop in PyTorch with zero boilerplate confusion',
      'Build a separate validation evaluation loop with model.eval() and torch.no_grad()',
      'Diagnose underfitting, overfitting, and learning curve health from training and validation loss telemetry',
    ],
    prerequisites: ['DL-07: Backpropagation', 'DL-08: Gradient Descent and Optimizers'],
    analogy: {
      title: 'The Athlete’s Practice and Scrimmage Cycle',
      text: 'Think of training a neural network as preparing an athlete for an international championship. A single practice drill (batch) teaches one specific play; completing the entire playbook once through covers one full season (epoch). Every weekend, the coach conducts a scrimmage against a sparring team where no scores are allowed to be cheated or memorized (validation set evaluation). If the athlete performs brilliantly during drills but falls apart during scrimmages, the coach immediately knows the athlete is over-memorizing rather than learning generalized game instinct.',
      metaphor: 'Training is practicing with the answer key; validation is testing with the answer key locked away.',
    },
    problemSolved: {
      title: 'Structured, Leak-Free Training Protocols',
      description: 'Without a disciplined training loop architecture, models suffer from catastrophic bugs: accidental gradient accumulation, memory leaks from caching computational graphs during validation, and data leakage where validation metrics deceive the engineer.',
      keyPoints: [
        'The Canonical 5-Step Loop: zero_grad() -> forward pass -> loss calculation -> backward pass -> optimizer step.',
        'Mode Switching: Toggling model.train() and model.eval() correctly switches Dropout and BatchNorm behaviors.',
        'Memory Efficiency: Utilizing torch.no_grad() prevents the allocation of backward autograd graphs during validation.',
      ],
    },
    intuition: {
      overview: 'Training a neural network is an iterative loop: iterate through batches, compute predictions, evaluate errors, backpropagate gradients, update weights, and periodically validate performance on unseen data.',
      steps: [
        { step: 1, title: 'Dataset Batching', description: 'Shuffle training samples and package them into mini-batches using a DataLoader.' },
        { step: 2, title: 'Zero Gradients', description: 'Clear out previous gradients: optimizer.zero_grad().' },
        { step: 3, title: 'Forward & Loss', description: 'Compute outputs = model(inputs) and loss = criterion(outputs, targets).' },
        { step: 4, title: 'Backward & Step', description: 'Compute loss.backward() and update parameters: optimizer.step().' },
        { step: 5, title: 'Validation Protocol', description: 'Every epoch, measure validation metrics under model.eval() and torch.no_grad().' },
      ],
    },
    mathematics: {
      overview: 'The fundamental training loop formulas and running average telemetry.',
      foundations: [
        {
          name: 'Epoch Iteration Math',
          latex: '\\text{Iterations per Epoch} = \\left\\lceil \\frac{N_{\\text{total}}}{\\text{Batch Size}} \\right\\rceil',
          explanation: 'For a dataset of 50,000 samples and batch size 64, one epoch requires exactly 782 iterations.',
        },
        {
          name: 'Running Epoch Loss',
          latex: '\\bar{L}_{\\text{epoch}} = \\frac{1}{N_{\\text{total}}} \\sum_{b=1}^{B} N_b \\cdot L_b',
          explanation: 'Computes accurate weighted loss across variable-sized final mini-batches.',
        },
      ],
    },
    derivation: {
      title: 'Why model.train() and model.eval() Are Mandatory',
      objective: 'Prove the functional difference in neural network layers during training vs inference.',
      steps: [
        {
          step: 1,
          label: 'Dropout Behavior During Training',
          latex: 'h_{\\text{train}} = \\frac{1}{1-p} \\cdot (h \\odot m), \\quad m_i \\sim \\text{Bernoulli}(1-p)',
          explanation: 'Dropout randomly deactivates neurons during training to prevent co-adaptation.',
        },
        {
          step: 2,
          label: 'Dropout Behavior During Evaluation',
          latex: 'h_{\\text{eval}} = h',
          explanation: 'During inference, all neurons must be active to provide deterministic, full-capacity predictions.',
        },
        {
          step: 3,
          label: 'Batch Normalization Dynamics',
          latex: '\\mu_{\\text{train}} = \\frac{1}{B} \\sum x_i, \\quad \\mu_{\\text{eval}} = \\mathbb{E}[\\mu] \\text{ (running population mean)}',
          explanation: 'During training, BatchNorm normalizes with current mini-batch stats; during inference, it must use the fixed historical population statistics.',
        },
      ],
    },
    variables: [
      { symbol: 'N', name: 'Total Dataset Size', description: 'Number of training samples in dataset', dimensions: 'Scalar integer' },
      { symbol: 'B', name: 'Batch Size', description: 'Number of samples evaluated in each forward/backward pass', dimensions: 'Scalar integer' },
      { symbol: 'Epoch', name: 'Training Cycle', description: 'One complete pass through the entire training dataset', dimensions: 'Scalar integer' },
      { symbol: 'Iteration', name: 'Optimization Step', description: 'One single parameter update step (1 mini-batch)', dimensions: 'Scalar integer' },
    ],
    numericalExample: {
      scenario: 'Calculating training dynamics for CIFAR-10 with 50,000 images and batch size 128.',
      dataset: [
        { total_samples: 50000, batch_size: 128, epochs: 20 },
      ],
      calculations: [
        { step: 'Iterations per Epoch', math: 'ceil(50000 / 128) = ceil(390.625)', result: '391 steps' },
        { step: 'Total Training Steps', math: '391 steps * 20 epochs', result: '7,820 weight updates' },
        { step: 'Samples in Final Batch', math: '50000 - (390 * 128) = 50000 - 49920', result: '80 samples' },
      ],
      finalConclusion: 'The network updates its weights 7,820 times, processing 391 batches per epoch.',
    },
    visualExplanation: {
      title: 'The Canonical Deep Learning Training Loop Architecture',
      description: 'A robust production loop alternates between a stateful training phase (gradients enabled) and an evaluation phase (deterministic inference).',
      features: [
        'DataLoader shuffles samples to ensure unbiased stochastic gradient estimates.',
        'Zero-grad -> Forward -> Loss -> Backward -> Step constitutes the atomic execution cycle.',
        'Validation checks prevent overfitting and trigger early stopping when validation loss plateaus.',
      ],
    },
    scratchCode: {
      title: 'Full PyTorch Training & Validation Loop with Early Stopping',
      code: `import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import TensorDataset, DataLoader

# 1. Create synthetic data
X_train = torch.randn(200, 10)
y_train = torch.randint(0, 2, (200,)).float()
X_val = torch.randn(50, 10)
y_val = torch.randint(0, 2, (50,)).float()

train_loader = DataLoader(TensorDataset(X_train, y_train), batch_size=32, shuffle=True)
val_loader = DataLoader(TensorDataset(X_val, y_val), batch_size=32, shuffle=False)

# 2. Model, Loss, Optimizer
model = nn.Sequential(nn.Linear(10, 16), nn.ReLU(), nn.Linear(16, 1))
criterion = nn.BCEWithLogitsLoss()
optimizer = optim.AdamW(model.parameters(), lr=0.01)

# 3. Canonical Training & Validation Loop
for epoch in range(1, 6):
    # TRAINING PHASE
    model.train()
    total_train_loss = 0.0
    for X_batch, y_batch in train_loader:
        optimizer.zero_grad()               # Step 1: Zero gradients
        preds = model(X_batch).squeeze()     # Step 2: Forward pass
        loss = criterion(preds, y_batch)     # Step 3: Compute loss
        loss.backward()                     # Step 4: Backward pass
        optimizer.step()                    # Step 5: Optimizer step
        total_train_loss += loss.item() * X_batch.size(0)

    avg_train_loss = total_train_loss / len(train_loader.dataset)

    # VALIDATION PHASE
    model.eval()
    total_val_loss = 0.0
    with torch.no_grad():
        for X_b, y_b in val_loader:
            p = model(X_b).squeeze()
            l = criterion(p, y_b)
            total_val_loss += l.item() * X_b.size(0)
    avg_val_loss = total_val_loss / len(val_loader.dataset)

    print(f"Epoch {epoch:2d} | Train Loss: {avg_train_loss:.4f} | Val Loss: {avg_val_loss:.4f}")`,
      explanation: 'Production-grade PyTorch training loop template implementing the canonical 5-step sequence, mode toggling, and memory optimization.',
    },
    sklearnCode: {
      title: 'Scikit-Learn Training Loop (Fit & Score)',
      code: `from sklearn.neural_network import MLPClassifier
from sklearn.datasets import make_classification

X, y = make_classification(n_samples=500, n_features=10, random_state=42)

# Scikit-learn encapsulates the entire training loop in .fit()
clf = MLPClassifier(hidden_layer_sizes=(32, 16), max_iter=20, warm_start=True, random_state=42)

for epoch in range(5):
    clf.fit(X, y) # Trains for 20 more iterations
    print(f"Epoch {epoch+1} Loss: {clf.loss_:.4f}")`,
      explanation: 'Scikit-Learn abstracts the loop into fit(), suitable for quick experiments on tabular data.',
    },
    runnableCode: {
      code: `import torch

# Demonstrate the 5-step training atomic sequence on 1 mini-batch
model = torch.nn.Linear(2, 1)
optimizer = torch.optim.SGD(model.parameters(), lr=0.1)
criterion = torch.nn.MSELoss()

x = torch.tensor([[1.0, 2.0]])
y = torch.tensor([[5.0]])

print("Initial weight:", model.weight.data)

# Step 1
optimizer.zero_grad()
# Step 2
pred = model(x)
# Step 3
loss = criterion(pred, y)
# Step 4
loss.backward()
# Step 5
optimizer.step()

print("Loss:", loss.item())
print("Updated weight:", model.weight.data)
print("The 5 steps executed smoothly!")`,
      expectedOutput: 'Initial weight: tensor([[...]])\nLoss: ...\nUpdated weight: tensor([[...]])\nThe 5 steps executed smoothly!',
    },
    lineByLineExplanation: [
      { lines: '12', codeSnippet: 'optimizer.zero_grad()', explanation: 'Clears accumulated gradients in parameter tensors.' },
      { lines: '14', codeSnippet: 'pred = model(x)', explanation: 'Executes the forward pass through the model graph.' },
      { lines: '16', codeSnippet: 'loss = criterion(pred, y)', explanation: 'Evaluates the loss function between prediction and target.' },
      { lines: '18', codeSnippet: 'loss.backward()', explanation: 'Computes gradients for all parameters via reverse-mode autodiff.' },
      { lines: '20', codeSnippet: 'optimizer.step()', explanation: 'Applies parameter updates using the computed gradients.' },
    ],
    hyperparameters: [
      { name: 'num_epochs', defaultVal: '50', range: '10 to 500', effect: 'Number of times the full dataset is traversed', recommendation: 'Use early stopping with patience=5 instead of hardcoding arbitrary epoch numbers.' },
      { name: 'shuffle', defaultVal: 'True', range: 'True / False', effect: 'Whether DataLoader shuffles samples at the beginning of each epoch', recommendation: 'Always True for training, False for validation/test.' },
    ],
    assumptions: [
      { assumption: 'Independently and Identically Distributed (IID) Batches', whyItMatters: 'If samples are ordered by class (e.g. all class 0 first, then all class 1), gradient updates thrash violently.', howToVerify: 'Always set shuffle=True in the training DataLoader.' },
      { assumption: 'Detached Validation Graphs', whyItMatters: 'If torch.no_grad() is omitted during evaluation, GPU memory quickly runs out due to accumulated autograd history.', howToVerify: 'Wrap all evaluation blocks with with torch.no_grad().' },
    ],
    commonMistakes: [
      { mistake: 'Leaving model in train() mode during evaluation', whyWrong: 'Dropout continues randomly deleting 50% of activations, and BatchNorm continues calculating noisy mini-batch stats, corrupting validation scores.', howToFix: 'Call model.eval() before running validation loops.', solution: 'model.eval()' },
      { mistake: 'Tracking running loss using tensor rather than float', whyWrong: 'Writing total_loss += loss instead of total_loss += loss.item() keeps the entire computational graph in memory, causing out-of-memory crashes.', howToFix: 'Extract the Python scalar using .item().', solution: 'total_loss += loss.item()' },
    ],
    realWorldUseCases: [
      { industry: 'Production ML Engineering', application: 'Model Retraining Pipelines', benefit: 'Automated nightly Airflow / Kubeflow pipelines run standardized training loops on fresh daily user logs.' },
      { industry: 'Medical Imaging', application: 'Tumor Detection Training', benefit: 'Validation loop monitors sensitivity and specificity every epoch to save best checkpoint weights.' },
      { industry: 'Natural Language Processing', application: 'LLM Fine-Tuning (LoRA)', benefit: 'Standardized training loop updates Low-Rank Adaptation weight adapters on task-specific dialogue datasets.' },
    ],
    practiceQuestions: [
      { id: 'dl09-q1', question: 'What are the 5 sequential steps executed inside every standard PyTorch training mini-batch loop?', hint: 'Zero -> Forward -> Loss -> Backward -> Step.', answer: '1. optimizer.zero_grad(), 2. outputs = model(inputs), 3. loss = criterion(outputs, targets), 4. loss.backward(), 5. optimizer.step().', explanation: 'This is the universal canonical training sequence in PyTorch.' },
      { id: 'dl09-q2', question: 'Why is `with torch.no_grad():` essential inside validation loops?', hint: 'Consider GPU memory and graph construction.', answer: 'It disables autograd graph allocation, reducing inference memory by up to 60% and accelerating execution.', explanation: 'Validation does not require backpropagation, so graph tracking is redundant overhead.' },
    ],
    quiz: [
      {
        id: 'dl09-qz1',
        question: 'What is the key difference between an epoch and an iteration?',
        options: [
          'An epoch is 1 sample; an iteration is the whole dataset',
          'An epoch is one complete pass through the entire dataset; an iteration is one gradient update on a single mini-batch',
          'They are identical terms in deep learning',
          'An iteration measures wall-clock time in seconds',
        ],
        correctIndex: 1,
        explanation: 'One epoch consists of multiple iterations (steps) equal to ceil(Total Samples / Batch Size).',
      },
      {
        id: 'dl09-qz2',
        question: 'What happens to Dropout layers when you execute `model.eval()`?',
        options: [
          'All weights are reset to zero',
          'Dropout is deactivated so all neurons participate deterministically in inference',
          'Dropout rate increases to 100%',
          'The model is deleted from memory',
        ],
        correctIndex: 1,
        explanation: 'In eval mode, Dropout is disabled so that predictions are consistent and utilize the full learned capacity.',
      },
      {
        id: 'dl09-qz3',
        question: 'Why should you write `total_loss += loss.item()` instead of `total_loss += loss` in PyTorch?',
        options: [
          'loss.item() converts the loss to a Python float, releasing the autograd computational graph and preventing GPU memory leaks',
          'loss.item() is 100x more accurate than loss',
          'loss is a string',
          'There is no difference',
        ],
        correctIndex: 0,
        explanation: 'Referencing the raw loss tensor preserves its entire backward graph in memory across the entire loop, leading to an Out-Of-Memory (OOM) crash.',
      },
    ],
    independentExercise: {
      id: 'dl09-ex',
      title: 'Calculate Dataset Iterations and Batches',
      problem: 'Write a Python function `compute_training_steps(n_samples, batch_size, epochs)` that returns the number of iterations per epoch and total iterations across training.',
      hints: ['Use math.ceil for integer batch rounding.'],
      starterCode: `import math

def compute_training_steps(n_samples, batch_size, epochs):
    pass

print(compute_training_steps(60000, 64, 10))
`,
      solution: `import math

def compute_training_steps(n_samples, batch_size, epochs):
    steps_per_epoch = math.ceil(n_samples / batch_size)
    total_steps = steps_per_epoch * epochs
    return {"steps_per_epoch": steps_per_epoch, "total_steps": total_steps}

print(compute_training_steps(60000, 64, 10))`,
    },
    summary: {
      keyTakeaways: [
        'The canonical 5-step loop (zero_grad, forward, loss, backward, step) governs all PyTorch model training.',
        'Always toggle model.train() for training and model.eval() + torch.no_grad() for validation and testing.',
        'Use loss.item() to accumulate telemetry to prevent GPU VRAM memory leaks.',
      ],
      nextLessonId: 'dl-10-regularization',
      nextLessonTitle: 'DL-10: Overfitting and Regularization',
      nextLessonModuleId: 'dl-module-3',
    },
  },
};

