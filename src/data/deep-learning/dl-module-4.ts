import { ModuleData, LessonContent } from '@/lib/types';

export const dlModule4Data: ModuleData = {
  id: 'dl-module-4',
  number: 4,
  title: 'PyTorch & Neural Networks from Scratch',
  subtitle: 'Tensors, Autograd, Pure NumPy Implementation & First Production Project',
  description:
    'Bridge theory into working code: master PyTorch tensors, memory strides, autograd, and nn.Module; construct a complete multi-layer neural network from pure NumPy without any framework; and train, evaluate, and save an end-to-end deep learning project on a real-world dataset.',
  icon: 'Terminal',
  badge: 'Phase 3 · Deep Learning',
  estimatedHours: 14,
  topicsCount: 3,
  lessons: [
    {
      id: 'dl-13-pytorch-fundamentals',
      moduleId: 'dl-module-4',
      title: 'DL-13: PyTorch Fundamentals',
      description: 'Tensors, memory layouts, GPU devices (CUDA/MPS), Autograd computational graph mechanics, nn.Module, Dataset, and DataLoader.',
      order: 1,
      readTimeMinutes: 28,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'dl-14-neural-net-from-scratch',
      moduleId: 'dl-module-4',
      title: 'DL-14: Build a Neural Network from Scratch',
      description: 'Implement a complete multi-layer neural network using only NumPy: forward pass, vector backprop, gradient descent, and XOR verification.',
      order: 2,
      readTimeMinutes: 32,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'dl-15-first-dl-project',
      moduleId: 'dl-module-4',
      title: 'DL-15: First Practical Deep Learning Project',
      description: 'End-to-end project: data ingestion, train/val/test split, model architecture, training loop, evaluation metrics, error analysis, and checkpointing.',
      order: 3,
      readTimeMinutes: 30,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
  ],
};

export const dlModule4Lessons: Record<string, LessonContent> = {
  'dl-13-pytorch-fundamentals': {
    id: 'dl-13-pytorch-fundamentals',
    moduleId: 'dl-module-4',
    title: 'DL-13: PyTorch Fundamentals',
    subtitle: 'Tensors, Dynamic Computation Graphs, Devices & Object-Oriented nn.Module',
    order: 1,
    readTimeMinutes: 28,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Master PyTorch Tensors, memory layouts, strides, views, and hardware device acceleration (CPU vs CUDA vs Apple MPS)',
      'Understand reverse-mode dynamic computational graphs (define-by-run) and autograd tensor tracking',
      'Architect modular object-oriented neural networks using torch.nn.Module',
      'Build scalable multi-threaded input pipelines using torch.utils.data.Dataset and DataLoader',
    ],
    prerequisites: ['DL-05: Forward Propagation', 'DL-06: Calculus for Neural Networks'],
    analogy: {
      title: 'The Blueprint and the High-Speed Railway',
      text: 'NumPy is like a fleet of reliable delivery trucks: great on standard paved roads (CPU), but unable to ride high-speed maglev tracks (GPUs). PyTorch Tensors are like universal shipping containers: they have the exact same familiar NumPy syntax and indexing, but can instantly be teleported onto high-speed GPU tensor cores (`tensor.to("cuda")`). Furthermore, PyTorch attaches an invisible flight data recorder (Autograd) to every container, automatically logging every mathematical operation so the entire journey can be played backward in reverse with zero human effort.',
      metaphor: 'PyTorch is NumPy with GPU acceleration and an automatic backward-differentiation tape recorder.',
    },
    problemSolved: {
      title: 'Dynamic Graph Flexibility vs Static Graph Rigidity',
      description: 'Older frameworks (like TensorFlow 1.x) required defining static computational graphs before runtime, making dynamic control flow (loops, conditionals, variable length sequences) painful to debug. PyTorch’s "define-by-run" paradigm constructs the graph dynamically on the fly during Python execution, enabling standard Python debugging (pdb, breakpoints) and dynamic architectures.',
      keyPoints: [
        'Eager Execution: Operations evaluate immediately just like standard Python, printing intermediate tensor values on demand.',
        'Seamless Device Transfer: Move tensors between CPU and GPU with a single method call: .to(device).',
        'Built-in OOP Abstractions: nn.Module encapsulates parameters, sub-modules, hooks, and serialization.',
      ],
    },
    intuition: {
      overview: 'PyTorch is structured into three foundational layers: the Tensor core (memory and math), Autograd (automatic differentiation), and torch.nn (modular deep learning layers).',
      steps: [
        { step: 1, title: 'Device Detection', description: 'Detect available hardware: device = "cuda" if torch.cuda.is_available() else "cpu".' },
        { step: 2, title: 'Tensor Creation', description: 'Allocate tensors with required data types (float32) and track gradients with requires_grad=True.' },
        { step: 3, title: 'Module Subclassing', description: 'Inherit from nn.Module, declare layers in __init__, and define forward computation in forward(x).' },
        { step: 4, title: 'DataLoader Pipeline', description: 'Wrap training tensors in a Dataset and DataLoader for multi-threaded mini-batching.' },
      ],
    },
    mathematics: {
      overview: 'PyTorch tensor memory indexing and dynamic autograd execution.',
      foundations: [
        {
          name: 'Tensor Strides & Contiguity',
          latex: '\\text{Index}(i, j) = \\text{offset} + i \\cdot s_0 + j \\cdot s_1',
          explanation: 'Tensors store N-dimensional arrays in contiguous 1D memory; strides s₀ and s₁ determine how many memory addresses to skip per dimension.',
        },
        {
          name: 'Reverse Autograd Tape',
          latex: '\\mathbf{x}.\\text{grad} = \\sum_{k} J_{k, :}^T \\mathbf{y}_k.\\text{grad}',
          explanation: 'Traverses the dynamically allocated operation graph in reverse topological order, accumulating vector-Jacobian products.',
        },
      ],
    },
    derivation: {
      title: 'Why Reshaping with view() Requires Contiguity',
      objective: 'Prove why tensor.view() fails if a tensor has been transposed without calling contiguous().',
      steps: [
        {
          step: 1,
          label: 'Original 2D Tensor Memory Layout',
          latex: 'A \\in \\mathbb{R}^{2 \\times 3}, \\quad \\text{Strides} = (3, 1)',
          explanation: 'Element (i, j) is located at memory index i * 3 + j * 1 in contiguous memory.',
        },
        {
          step: 2,
          label: 'Transposition Operation',
          latex: 'B = A^T \\in \\mathbb{R}^{3 \\times 2}, \\quad \\text{Strides} = (1, 3)',
          explanation: 'Transposing does not move memory in RAM; it simply swaps the stride numbers from (3, 1) to (1, 3).',
        },
        {
          step: 3,
          label: 'View Requirement',
          latex: 'B.\\text{view}(6) \\text{ requires contiguous stride } s_0 = 1',
          explanation: 'Because B’s elements are non-contiguous in memory, view() throws an error. Calling contiguous() allocates a fresh array in standard memory order, or reshape() does this automatically.',
        },
      ],
    },
    variables: [
      { symbol: 'device', name: 'Compute Target', description: 'Hardware execution device ("cpu", "cuda:0", "mps")', dimensions: 'Device object' },
      { symbol: 'dtype', name: 'Data Type', description: 'Floating-point precision (torch.float32, torch.bfloat16)', dimensions: 'Type specification' },
      { symbol: 'strides', name: 'Memory Steps', description: 'Number of elements to jump in memory per dimension', dimensions: 'Tuple of integers' },
      { symbol: 'requires_grad', name: 'Autograd Flag', description: 'Whether this tensor tracks forward operations for backpropagation', dimensions: 'Boolean' },
    ],
    numericalExample: {
      scenario: 'Tensor device transfer and gradient computation on a linear layer.',
      dataset: [
        { x: '[1.0, 2.0]', w: '[0.5, -0.5]', b: 0.1 },
      ],
      calculations: [
        { step: 'Forward Pass', math: '(1.0)(0.5) + (2.0)(-0.5) + 0.1 = 0.5 - 1.0 + 0.1', result: '-0.40' },
        { step: 'Loss L = 0.5 * (y_hat - 1.0)^2', math: '0.5 * (-0.40 - 1.0)^2 = 0.5 * (-1.4)^2', result: '0.98' },
        { step: 'Gradient dL/dw1', math: '(y_hat - y) * x1 = (-1.4) * 1.0', result: '-1.40' },
        { step: 'Gradient dL/dw2', math: '(y_hat - y) * x2 = (-1.4) * 2.0', result: '-2.80' },
      ],
      finalConclusion: 'PyTorch autograd computes these exact gradient values automatically via loss.backward().',
    },
    visualExplanation: {
      title: 'PyTorch Architecture: Tensors, Autograd & Modules',
      description: 'The foundation of PyTorch rests on C++ tensor memory backends (LibTorch) exposed through clean Pythonic abstractions.',
      features: [
        'torch.Tensor: High-performance N-dimensional array with GPU acceleration.',
        'torch.autograd: Reverse-mode automatic differentiation engine tracking tensor history.',
        'torch.nn.Module: Base class for all neural network layers, managing parameters and state dictionaries.',
      ],
    },
    scratchCode: {
      title: 'Custom PyTorch Module with Dataset and DataLoader Pipeline',
      code: `import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader

# 1. Custom Dataset
class SyntheticClassificationDataset(Dataset):
    def __init__(self, n_samples=100, n_features=4):
        self.X = torch.randn(n_samples, n_features)
        # Synthetic binary target: sum(X) > 0
        self.y = (self.X.sum(dim=1) > 0).float().unsqueeze(1)
        
    def __len__(self):
        return len(self.X)
        
    def __getitem__(self, idx):
        return self.X[idx], self.y[idx]

# 2. Custom Neural Network Module
class CustomMLP(nn.Module):
    def __init__(self, in_features, hidden_dim, out_features=1):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_features, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, out_features)
        )
        
    def forward(self, x):
        return self.net(x)

# 3. Instantiate and run on batch
dataset = SyntheticClassificationDataset(n_samples=200, n_features=4)
loader = DataLoader(dataset, batch_size=16, shuffle=True)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = CustomMLP(in_features=4, hidden_dim=8).to(device)

for X_b, y_b in loader:
    X_b, y_b = X_b.to(device), y_b.to(device)
    out = model(X_b)
    print("Batch input shape: ", X_b.shape)
    print("Batch output shape:", out.shape)
    break`,
      explanation: 'Constructs an idiomatic PyTorch application combining Dataset, DataLoader, nn.Module, and hardware device targeting.',
    },
    sklearnCode: {
      title: 'Bridging PyTorch and NumPy / Scikit-Learn',
      code: `import torch
import numpy as np

# Zero-copy sharing between NumPy and PyTorch
np_arr = np.array([1.0, 2.0, 3.0], dtype=np.float32)
torch_tensor = torch.from_numpy(np_arr) # Shares memory!

np_arr[0] = 99.0
print("PyTorch tensor reflects NumPy mutation:", torch_tensor[0].item() == 99.0)

# Converting back to NumPy
back_to_np = torch_tensor.detach().cpu().numpy()
print("Back to NumPy array:", back_to_np)`,
      explanation: 'PyTorch tensors and NumPy arrays share the same underlying memory buffer when created via torch.from_numpy(), enabling zero-copy interoperability.',
    },
    runnableCode: {
      code: `import torch

# Demonstrate Autograd, zero_grad, and parameter inspection
linear = torch.nn.Linear(2, 1)
x = torch.tensor([[1.0, 2.0]])
target = torch.tensor([[5.0]])

# Forward
pred = linear(x)
loss = 0.5 * torch.sum((pred - target)**2)

# Backward
loss.backward()

print("Weight tensor:     ", linear.weight.data)
print("Weight gradient:   ", linear.weight.grad)
print("Device:            ", linear.weight.device)
print("Requires grad:     ", linear.weight.requires_grad)`,
      expectedOutput: 'Weight tensor:      tensor([[...]])\nWeight gradient:    tensor([[...]])\nDevice:             cpu\nRequires grad:      True',
    },
    lineByLineExplanation: [
      { lines: '4', codeSnippet: 'linear = torch.nn.Linear(2, 1)', explanation: 'Instantiates a linear layer mapping 2 input features to 1 output feature.' },
      { lines: '9-10', codeSnippet: 'loss = 0.5 * torch.sum((pred - target)**2); loss.backward()', explanation: 'Computes loss and triggers autograd backward pass.' },
      { lines: '13', codeSnippet: 'print(linear.weight.grad)', explanation: 'Demonstrates that parameter gradients are automatically stored in the .grad attribute.' },
    ],
    hyperparameters: [
      { name: 'num_workers', defaultVal: '0', range: '0 to 8', effect: 'Number of subprocesses for multi-threaded data loading', recommendation: 'Set to 2-4 for fast image pipelines; 0 on Windows to avoid multiprocessing issues.' },
      { name: 'pin_memory', defaultVal: 'True', range: 'True / False', effect: 'Allocates tensors in page-locked CUDA pinned host memory', recommendation: 'Always True when training on GPU to accelerate CPU-to-GPU data transfers.' },
    ],
    assumptions: [
      { assumption: 'Float32 Standard Precision', whyItMatters: 'PyTorch defaults to float32 (single precision) unlike NumPy which defaults to float64 (double precision). Passing float64 to PyTorch layers triggers runtime type errors.', howToVerify: 'Always cast inputs with .float() or ensure torch.float32.' },
      { assumption: 'Deterministic Seed for Reproducibility', whyItMatters: 'Random weight initialization causes slight run-to-run variation.', howToVerify: 'Call torch.manual_seed(42) and torch.cuda.manual_seed_all(42).' },
    ],
    commonMistakes: [
      { mistake: 'Forgetting to call .to(device) on input tensors', whyWrong: 'Trying to pass a CPU tensor into a GPU model causes a fatal runtime error: "Expected all tensors to be on the same device".', howToFix: 'Ensure both model and batch tensors are on the same device.', solution: 'model.to(device); x = x.to(device)' },
      { mistake: 'Using tensor.numpy() on a GPU tensor with gradients attached', whyWrong: 'PyTorch requires detaching from the autograd graph and moving to CPU before converting to NumPy.', howToFix: 'Call .detach().cpu().numpy().', solution: 'arr = tensor.detach().cpu().numpy()' },
    ],
    realWorldUseCases: [
      { industry: 'AI Research Laboratories', application: 'Rapid Prototype Experimentation', benefit: 'Eager execution and Pythonic API make PyTorch the universal standard in academic AI research papers.' },
      { industry: 'Autonomous Robotics', application: 'Embedded Edge Inference (TorchScript)', benefit: 'PyTorch models are traced into optimized C++ TorchScript binaries for real-time robotic control.' },
      { industry: 'Enterprise SaaS', application: 'GPU-Accelerated Vector Similarity', benefit: 'PyTorch tensors compute cosine similarity across millions of document embeddings in milliseconds.' },
    ],
    practiceQuestions: [
      { id: 'dl13-q1', question: 'How do you safely convert a PyTorch GPU tensor that requires gradients into a NumPy array?', hint: 'Three chained method calls: detach, cpu, numpy.', answer: 'Call tensor.detach().cpu().numpy().', explanation: 'detach() disconnects the tensor from the autograd graph, cpu() transfers it from VRAM to system RAM, and numpy() converts it.' },
      { id: 'dl13-q2', question: 'What is the purpose of inheriting from `torch.nn.Module` when defining a custom neural network?', hint: 'What does super().__init__() register?', answer: 'nn.Module automatically tracks all child layers, weights, and biases, registering them into .parameters() so optimizers can update them, and manages device transfers (.to(device)) and state saves (.state_dict()).', explanation: 'It is the core architectural building block in PyTorch.' },
    ],
    quiz: [
      {
        id: 'dl13-qz1',
        question: 'What happens when you create a PyTorch tensor from a NumPy array using `torch.from_numpy()`?',
        options: [
          'It creates a deep copy taking twice the memory',
          'It shares the exact same memory buffer without copying data (zero-copy)',
          'It deletes the original NumPy array',
          'It automatically trains a linear regression model',
        ],
        correctIndex: 1,
        explanation: 'torch.from_numpy() creates a tensor that directly points to the existing NumPy memory buffer, making it instantaneous and memory-efficient.',
      },
      {
        id: 'dl13-qz2',
        question: 'What does the method call `model.to(device)` do in PyTorch?',
        options: [
          'It sends the model via email',
          'It transfers all model parameters, biases, and buffers to the specified compute hardware (e.g. CUDA GPU or CPU)',
          'It converts the model into an image',
          'It runs 10 epochs of training',
        ],
        correctIndex: 1,
        explanation: 'to(device) recursively shifts all weight tensors in the module to the target hardware device.',
      },
      {
        id: 'dl13-qz3',
        question: 'Why does PyTorch default to 32-bit floating point (float32) instead of 64-bit (float64)?',
        options: [
          'Because 32-bit float arithmetic is 2x to 8x faster on GPUs and consumes half the VRAM with negligible precision loss for deep learning',
          'Because 64-bit numbers cannot represent negative values',
          'Because 64-bit numbers are illegal in Python',
          'Because 32-bit numbers prevent overfitting',
        ],
        correctIndex: 0,
        explanation: 'Neural network training is inherently noise-tolerant; float32 provides the ideal balance between numerical stability and GPU hardware throughput.',
      },
    ],
    independentExercise: {
      id: 'dl13-ex',
      title: 'Build a Multi-Layer PyTorch Module',
      problem: 'Create a PyTorch `nn.Module` subclass named `ClassifierNet` with 2 hidden layers (sizes 64 and 32) with ReLU activations and a scalar output. Instantiate it and verify its forward pass on a random tensor of shape (8, 10).',
      hints: ['Define self.fc1, self.fc2, self.fc3 in __init__.', 'Chain them in forward(x).'],
      starterCode: `import torch
import torch.nn as nn

class ClassifierNet(nn.Module):
    def __init__(self, in_features):
        super().__init__()
        # Define layers
        pass
        
    def forward(self, x):
        # Forward pass
        pass

model = ClassifierNet(10)
x = torch.randn(8, 10)
`,
      solution: `import torch
import torch.nn as nn

class ClassifierNet(nn.Module):
    def __init__(self, in_features):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_features, 64),
            nn.ReLU(),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, 1)
        )
        
    def forward(self, x):
        return self.net(x)

model = ClassifierNet(10)
x = torch.randn(8, 10)
out = model(x)
print("Output shape:", out.shape)
assert out.shape == (8, 1)`,
    },
    summary: {
      keyTakeaways: [
        'PyTorch blends NumPy simplicity with GPU acceleration and dynamic autograd graph execution.',
        'Always inherit from nn.Module to encapsulate parameters and enable optimizer integration.',
        'Use Dataset and DataLoader to handle multi-threaded batching, shuffling, and data augmentation.',
      ],
      nextLessonId: 'dl-14-neural-net-from-scratch',
      nextLessonTitle: 'DL-14: Build a Neural Network from Scratch',
      nextLessonModuleId: 'dl-module-4',
    },
  },

  'dl-14-neural-net-from-scratch': {
    id: 'dl-14-neural-net-from-scratch',
    moduleId: 'dl-module-4',
    title: 'DL-14: Build a Neural Network from Scratch',
    subtitle: 'Pure NumPy Implementation: Vectorized Forward, Backward & Training on XOR',
    order: 2,
    readTimeMinutes: 32,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Implement an arbitrary-depth fully-connected neural network using zero deep learning frameworks (pure NumPy only)',
      'Vectorize forward propagation, activation caching, backward error recursion, and parameter updates',
      'Train the model to solve the non-linearly separable XOR benchmark problem',
      'Compare manual NumPy gradients with PyTorch autograd gradients to verify mathematical perfection',
    ],
    prerequisites: ['DL-05: Forward Propagation', 'DL-07: Backpropagation'],
    analogy: {
      title: 'Building a Clockwork Watch from Gears',
      text: 'Using a framework like PyTorch is like buying a digital smartwatch: you push a button and it works effortlessly. Building a neural network from scratch in NumPy is like hand-crafting a mechanical clockwork watch from individual brass gears, springs, and escapements. You physically touch every tooth of the gear (matrix dot products), tension the spring (backpropagated errors), and calibrate the balance wheel (learning rate). Once you have assembled the watch with your own hands, you will never be baffled by what is happening inside.',
      metaphor: 'Frameworks give you speed; building from scratch gives you supreme mastery.',
    },
    problemSolved: {
      title: 'Demystifying the "Black Box" of Deep Learning',
      description: 'Many engineers treat neural networks as opaque black boxes where backward() works like magic. Implementing the entire forward and backward execution pipeline in 80 lines of pure NumPy dispels the mystery, turning backpropagation into clear, straightforward linear algebra.',
      keyPoints: [
        'Zero Dependencies: Runs on pure standard library and NumPy without any ML framework.',
        'Exact Gradient Accounting: Direct code implementation of BP1, BP2, BP3, and BP4.',
        'Solving Non-Linear Separability: Proves that a 2-layer network can solve the historical XOR problem that defeated single-layer perceptrons.',
      ],
    },
    intuition: {
      overview: 'We will construct an object-oriented `DenseNetwork` class in NumPy with modular `.forward()`, `.backward()`, and `.train_step()` methods.',
      steps: [
        { step: 1, title: 'Architecture Definition', description: 'Specify layer widths: e.g. [2, 4, 1] for the XOR problem.' },
        { step: 2, title: 'Parameter Initialization', description: 'Use He initialization for hidden layers and small normal weights for the output.' },
        { step: 3, title: 'Forward Pass & Cache', description: 'Multiply activations by weights, add biases, apply activations, and cache values.' },
        { step: 4, title: 'Backward Recursion', description: 'Compute output error dZ_out = A_out - y and recursively propagate backwards.' },
        { step: 5, title: 'Verification', description: 'Train on XOR and verify that loss drops below 0.01 and predictions match truth.' },
      ],
    },
    mathematics: {
      overview: 'Summary of the exact vectorized equations implemented in our NumPy class.',
      foundations: [
        {
          name: 'Forward Hidden & Output',
          latex: 'Z^{(1)} = X W^{(1)} + b^{(1)}, \\, A^{(1)} = \\text{ReLU}(Z^{(1)}), \\quad Z^{(2)} = A^{(1)} W^{(2)} + b^{(2)}, \\, A^{(2)} = \\sigma(Z^{(2)})',
          explanation: 'Transforms input feature matrix X into output probability vector A⁽²⁾.',
        },
        {
          name: 'Backward Hidden & Gradients',
          latex: 'dZ^{(2)} = \\frac{1}{N}(A^{(2)} - Y), \\quad dW^{(2)} = (A^{(1)})^T dZ^{(2)}, \\quad dZ^{(1)} = (dZ^{(2)} (W^{(2)})^T) \\odot \\mathbb{I}_{Z^{(1)} > 0}',
          explanation: 'Computes parameter gradients dW⁽²⁾, db⁽²⁾, dW⁽¹⁾, and db⁽¹⁾.',
        },
      ],
    },
    derivation: {
      title: 'Batch Normalization of Gradients by 1/N',
      objective: 'Prove why dividing the output error by batch size N guarantees scale-invariant gradient descent.',
      steps: [
        {
          step: 1,
          label: 'Total Batch Loss',
          latex: 'L = \\frac{1}{N} \\sum_{i=1}^{N} L_i \\implies \\frac{\\partial L}{\\partial W} = \\frac{1}{N} \\sum_{i=1}^{N} \\frac{\\partial L_i}{\\partial W}',
          explanation: 'Because the loss is averaged over N samples, its derivative is the average of individual sample gradients.',
        },
        {
          step: 2,
          label: 'Incorporating 1/N into Initial Error Vector',
          latex: 'dZ^{(2)} = \\frac{1}{N} (A^{(2)} - Y)',
          explanation: 'Factoring 1/N into dZ⁽²⁾ automatically scales all upstream gradients dW and db without needing separate divisions.',
        },
      ],
    },
    variables: [
      { symbol: 'X', name: 'Input Matrix', description: 'Training batch input data', dimensions: '(N, 2)' },
      { symbol: 'Y', name: 'Ground Truth Targets', description: 'Binary target labels', dimensions: '(N, 1)' },
      { symbol: 'W1, b1', name: 'Layer 1 Parameters', description: 'Hidden weights and biases', dimensions: '(2, 4) and (1, 4)' },
      { symbol: 'W2, b2', name: 'Layer 2 Parameters', description: 'Output weights and biases', dimensions: '(4, 1) and (1, 1)' },
    ],
    numericalExample: {
      scenario: 'Solving the XOR Problem: (0,0)->0, (0,1)->1, (1,0)->1, (1,1)->0.',
      dataset: [
        { x1: 0, x2: 0, y: 0 },
        { x1: 0, x2: 1, y: 1 },
        { x1: 1, x2: 0, y: 1 },
        { x1: 1, x2: 1, y: 0 },
      ],
      calculations: [
        { step: 'Initial loss at epoch 0', math: 'Cross-Entropy with random weights', result: '0.6931' },
        { step: 'Loss at epoch 500', math: 'After 500 gradient steps (lr=0.5)', result: '0.1245' },
        { step: 'Loss at epoch 2000', math: 'After convergence', result: '0.0048' },
      ],
      finalConclusion: 'The network successfully separates the XOR problem, outputting 0.01, 0.99, 0.99, 0.01.',
    },
    visualExplanation: {
      title: 'XOR Non-Linear Warping in Hidden Feature Space',
      description: 'Single perceptrons fail on XOR because no straight line can separate (0,1) and (1,0) from (0,0) and (1,1). Hidden neurons bend and warp the feature space.',
      features: [
        'Hidden Layer: Projects the 2D input space into a 4D latent representation.',
        'Non-Linear Folding: ReLU folds the feature space so that positive cases cluster together.',
        'Linear Separation: The final output layer draws a clean hyper-plane through the folded representation.',
      ],
    },
    scratchCode: {
      title: 'Complete Neural Network Class from Scratch in Pure NumPy',
      code: `import numpy as np

class NeuralNetFromScratch:
    def __init__(self, layer_dims, lr=0.5):
        self.lr = lr
        self.weights = {}
        self.biases = {}
        self.num_layers = len(layer_dims) - 1
        
        # Initialize parameters with He initialization
        np.random.seed(42)
        for l in range(1, len(layer_dims)):
            fan_in = layer_dims[l-1]
            fan_out = layer_dims[l]
            self.weights[l] = np.random.randn(fan_in, fan_out) * np.sqrt(2.0 / fan_in)
            self.biases[l] = np.zeros((1, fan_out))
            
    def forward(self, X):
        self.caches = {}
        A = X
        # Hidden layers with ReLU
        for l in range(1, self.num_layers):
            A_prev = A
            Z = A_prev @ self.weights[l] + self.biases[l]
            A = np.maximum(0, Z)
            self.caches[l] = (A_prev, Z)
            
        # Output layer with Sigmoid
        A_prev = A
        Z_out = A_prev @ self.weights[self.num_layers] + self.biases[self.num_layers]
        A_out = 1.0 / (1.0 + np.exp(-np.clip(Z_out, -15, 15)))
        self.caches[self.num_layers] = (A_prev, Z_out)
        return A_out
        
    def backward(self, Y, A_out):
        N = Y.shape[0]
        # Output error: (A_out - Y)
        dZ = (A_out - Y) / N
        
        for l in range(self.num_layers, 0, -1):
            A_prev, Z = self.caches[l]
            dW = A_prev.T @ dZ
            db = np.sum(dZ, axis=0, keepdims=True)
            
            if l > 1:
                dA_prev = dZ @ self.weights[l].T
                _, Z_prev = self.caches[l-1]
                dZ = dA_prev * (Z_prev > 0).astype(float)
                
            # Update parameters
            self.weights[l] -= self.lr * dW
            self.biases[l] -= self.lr * db
            
    def train(self, X, Y, epochs=2000):
        for epoch in range(epochs):
            A_out = self.forward(X)
            self.backward(Y, A_out)
        return A_out

# Train on XOR
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
Y = np.array([[0], [1], [1], [0]])

nn = NeuralNetFromScratch([2, 4, 1], lr=1.0)
preds = nn.train(X, Y, epochs=1500)

print("XOR Predictions after 1500 epochs:")
for sample, target, p in zip(X, Y, preds):
    print(f"Input: {sample} | Target: {target[0]} | Pred: {p[0]:.4f}")`,
      explanation: 'A fully standalone, production-quality implementation of a feedforward neural network in under 70 lines of pure NumPy.',
    },
    sklearnCode: {
      title: 'Comparing Scratch Model with PyTorch on XOR',
      code: `import torch
import torch.nn as nn
import torch.optim as optim

# PyTorch baseline on XOR
X = torch.tensor([[0., 0.], [0., 1.], [1., 0.], [1., 1.]])
y = torch.tensor([[0.], [1.], [1.], [0.]])

torch_model = nn.Sequential(nn.Linear(2, 4), nn.ReLU(), nn.Linear(4, 1), nn.Sigmoid())
opt = optim.SGD(torch_model.parameters(), lr=1.0)
criterion = nn.BCELoss()

for _ in range(1500):
    opt.zero_grad()
    loss = criterion(torch_model(X), y)
    loss.backward()
    opt.step()

print("PyTorch XOR output:\\n", torch_model(X).detach())`,
      explanation: 'Shows identical architecture and hyperparameter settings in PyTorch to verify identical convergence behavior.',
    },
    runnableCode: {
      code: `import numpy as np

# Quick verification: Single forward pass and backward step on 2 samples
X = np.array([[0.5, -0.5], [1.0, 1.0]])
Y = np.array([[1.0], [0.0]])

# Weights
W1 = np.array([[0.4, -0.2], [0.6, 0.8]])
b1 = np.array([[0.1, -0.1]])
W2 = np.array([[1.0], [-1.0]])
b2 = np.array([[0.0]])

# Forward
Z1 = X @ W1 + b1
A1 = np.maximum(0, Z1)
Z2 = A1 @ W2 + b2
A2 = 1 / (1 + np.exp(-Z2))

# Backward
dZ2 = (A2 - Y) / 2.0
dW2 = A1.T @ dZ2
dA1 = dZ2 @ W2.T
dZ1 = dA1 * (Z1 > 0)
dW1 = X.T @ dZ1

print("Forward predictions A2:\\n", np.round(A2, 4))
print("Gradient dW2 shape:", dW2.shape)
print("Gradient dW1 shape:", dW1.shape)
print("All manual calculations completed without errors!")`,
      expectedOutput: 'Forward predictions A2:\n [[...]\n [...]]\nGradient dW2 shape: (2, 1)\nGradient dW1 shape: (2, 2)\nAll manual calculations completed without errors!',
    },
    lineByLineExplanation: [
      { lines: '12-16', codeSnippet: 'Z1 = X @ W1 + b1 ... A2 = 1 / (1 + np.exp(-Z2))', explanation: 'Vectorized 2-layer forward propagation.' },
      { lines: '19', codeSnippet: 'dZ2 = (A2 - Y) / 2.0', explanation: 'Output error vector normalized by batch size N=2.' },
      { lines: '20-23', codeSnippet: 'dW2 = A1.T @ dZ2 ... dW1 = X.T @ dZ1', explanation: 'Backward chain rule computing weight gradient tensors.' },
    ],
    hyperparameters: [
      { name: 'learning_rate', defaultVal: '0.5', range: '0.1 to 2.0', effect: 'Update step size in pure SGD without momentum', recommendation: 'Start with 0.5 for small scratch networks on toy problems.' },
      { name: 'hidden_units', defaultVal: '4', range: '2 to 16', effect: 'Number of neurons in hidden layer', recommendation: '4 is sufficient for XOR; 2 is theoretically minimal.' },
    ],
    assumptions: [
      { assumption: 'Sufficient Epochs for Gradient Descent', whyItMatters: 'Without momentum or Adam, plain batch gradient descent on XOR requires 1,000-2,000 epochs to navigate the flat plateau.', howToVerify: 'Monitor loss progression.' },
    ],
    commonMistakes: [
      { mistake: 'Forgetting to divide dZ by batch size N', whyWrong: 'Causes gradient magnitude to scale with batch size, requiring manual learning rate retuning whenever batch size changes.', howToFix: 'Include 1/N in dZ: dZ = (A_out - Y) / N.', solution: 'dZ = (A_out - Y) / N' },
      { mistake: 'Using 0.0 as learning rate or forgetting parameter update minus sign', whyWrong: 'Writing W += lr * dW causes gradient ascent, maximizing loss instead of minimizing it.', howToFix: 'Always subtract gradients: W -= lr * dW.', solution: 'W -= lr * dW' },
    ],
    realWorldUseCases: [
      { industry: 'Embedded Firmware & Bare Metal Systems', application: 'C/C++ Microcontroller NN Inference', benefit: 'Compiling from-scratch matrix code directly into C firmware eliminates framework runtime bloat on $1 microchips.' },
      { industry: 'Financial Quant Analytics', application: 'Low-Latency Arbitrage Signals', benefit: 'Custom C++ matrix forward passes execute in nanoseconds on FPGA/ASIC trading cards.' },
      { industry: 'Core Education & Interview Prep', application: 'Staff ML Engineer Technical Interviews', benefit: 'Deriving and writing backprop from scratch is the gold standard assessment for elite deep learning roles.' },
    ],
    practiceQuestions: [
      { id: 'dl14-q1', question: 'Why was the XOR problem historically famous in machine learning history?', hint: 'Recall Minsky & Papert (1969).', answer: 'Minsky and Papert proved that single-layer perceptrons could not solve XOR because it is not linearly separable, plunging AI into its first winter. Multi-layer networks with backpropagation solved it.', explanation: 'It demonstrated that hidden layers are required for non-linear logic.' },
      { id: 'dl14-q2', question: 'How is the gradient with respect to Layer 1 bias db1 computed in NumPy?', hint: 'Recall sum across the batch axis.', answer: 'db1 = np.sum(dZ1, axis=0, keepdims=True).', explanation: 'Biases are broadcast across all samples, so their total gradient is the sum of sample errors.' },
    ],
    quiz: [
      {
        id: 'dl14-qz1',
        question: 'Why can a 2-layer neural network solve the XOR problem while a 1-layer perceptron fails?',
        options: [
          'Because 2-layer networks have more RAM',
          'Because the hidden layer non-linearly transforms and folds the feature space so that the classes become linearly separable in the final layer',
          'Because it uses floating point math',
          'Because it runs 10x faster',
        ],
        correctIndex: 1,
        explanation: 'Hidden neurons project the non-separable 2D coordinates into a higher-dimensional space where a linear hyperplane can cleanly separate them.',
      },
      {
        id: 'dl14-qz2',
        question: 'In the from-scratch backpropagation implementation, what is the formula for dW1?',
        options: [
          'dW1 = X @ dZ1',
          'dW1 = X.T @ dZ1',
          'dW1 = dZ1.T @ X',
          'dW1 = X + dZ1',
        ],
        correctIndex: 1,
        explanation: 'Input matrix X has shape (N, d_in) and error dZ1 has shape (N, d_hidden). Transposing X yields (d_in, N) @ (N, d_hidden) = (d_in, d_hidden), matching W1.',
      },
      {
        id: 'dl14-qz3',
        question: 'What is the derivative of the ReLU activation function in NumPy?',
        options: [
          '1.0 / (1.0 + np.exp(-Z))',
          '(Z > 0).astype(float)',
          'np.cos(Z)',
          'Z ** 2',
        ],
        correctIndex: 1,
        explanation: 'The derivative of ReLU is 1.0 for positive inputs and 0.0 for negative inputs, cleanly computed via the boolean condition (Z > 0).',
      },
    ],
    independentExercise: {
      id: 'dl14-ex',
      title: 'Add Momentum to the Scratch Neural Network',
      problem: 'Modify the parameter update step in `NeuralNetFromScratch` to implement classical momentum: v_W = beta * v_W + dW; W -= lr * v_W. Test that it converges in fewer epochs.',
      hints: ['Initialize velocity dictionaries v_W and v_b to zeros in __init__.', 'Use beta = 0.9.'],
      starterCode: `# Add velocity tracking to weights and biases
v_W = np.zeros_like(W)
# Update rule with momentum
`,
      solution: `import numpy as np

# Velocity update formula
beta = 0.9
lr = 0.5
v_W = np.zeros((2, 4))
dW = np.random.randn(2, 4) * 0.1

v_W = beta * v_W + dW
W = np.zeros((2, 4)) - lr * v_W
print("Momentum update executed successfully!")`,
    },
    summary: {
      keyTakeaways: [
        'A full neural network with forward and backward propagation can be implemented in under 70 lines of pure NumPy.',
        'Backpropagation is pure matrix multiplication: dW = A_prev.T @ dZ and dA_prev = dZ @ W.T.',
        'Building from scratch demystifies deep learning and proves that backprop is simply the chain rule executed via linear algebra.',
      ],
      nextLessonId: 'dl-15-first-dl-project',
      nextLessonTitle: 'DL-15: First Practical Deep Learning Project',
      nextLessonModuleId: 'dl-module-4',
    },
  },

  'dl-15-first-dl-project': {
    id: 'dl-15-first-dl-project',
    moduleId: 'dl-module-4',
    title: 'DL-15: First Practical Deep Learning Project',
    subtitle: 'End-to-End Deep Learning: Data Preparation, Model Architecture, Training & Model Checkpointing',
    order: 3,
    readTimeMinutes: 30,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Execute a complete real-world deep learning project lifecycle: ingestion, scaling, modeling, training, and evaluation',
      'Prevent data leakage by fitting normalizers strictly on the training partition before transforming validation/test splits',
      'Plot training vs validation loss and accuracy curves to diagnose convergence and generalization',
      'Perform detailed error analysis and serialize the trained model using PyTorch state_dict checkpointing',
    ],
    prerequisites: ['DL-09: Training a Neural Network', 'DL-13: PyTorch Fundamentals'],
    analogy: {
      title: 'The Architectural Construction Milestone',
      text: 'You have studied the metallurgy of steel (tensors), the physics of leverage (backpropagation), and the chemistry of concrete (loss functions). Now you are commissioned to build your first real bridge. You do not just pour concrete blindly: you survey the soil (data exploration), construct structural scaffolding (train/val split and normalization), monitor stress strain gauges under load (training loops and loss telemetry), inspect load-bearing tests (evaluation metrics and error analysis), and finally hand over the maintenance blueprints (model checkpointing).',
      metaphor: 'A practical deep learning project is uniting all theoretical components into a durable, deployable engineered artifact.',
    },
    problemSolved: {
      title: 'Translating Theory into a Production-Ready Pipeline',
      description: 'Many learners can write toy matrix scripts but fail on real datasets due to data leakage, unnormalized features, uncalibrated evaluation metrics, or unversioned model checkpoints. This project provides a production-grade template.',
      keyPoints: [
        'Leak-Free Scaling: StandardScaler fits on X_train only, preventing target distribution contamination.',
        'Structured Checkpoint Saves: Serializes model architecture state_dict, optimizer state, and best validation score.',
        'Holistic Evaluation: Evaluates ROC-AUC, Precision, Recall, and Confusion Matrix rather than naive accuracy alone.',
      ],
    },
    intuition: {
      overview: 'We will train a multi-layer deep neural network on the California Housing or Breast Cancer clinical diagnosis dataset, following strict engineering standards.',
      steps: [
        { step: 1, title: 'Data Loading & Split', description: 'Load dataset and partition into 70% train, 15% validation, and 15% test splits.' },
        { step: 2, title: 'Preprocessing', description: 'Fit StandardScaler on train split; transform train, val, and test splits.' },
        { step: 3, title: 'PyTorch Datasets', description: 'Wrap arrays in PyTorch TensorDataset and DataLoader.' },
        { step: 4, title: 'Model Architecture', description: 'Build a 3-layer neural network with BatchNorm, Dropout, and ReLU activations.' },
        { step: 5, title: 'Training with Validation', description: 'Train for 50 epochs with AdamW, saving the best checkpoint whenever validation loss reaches a new low.' },
        { step: 6, title: 'Test Evaluation', description: 'Load the best saved checkpoint and compute final test performance.' },
      ],
    },
    mathematics: {
      overview: 'Mathematical metrics for evaluating binary classification models.',
      foundations: [
        {
          name: 'Precision & Recall',
          latex: '\\text{Precision} = \\frac{TP}{TP + FP}, \\quad \\text{Recall} = \\frac{TP}{TP + FN}',
          explanation: 'Precision measures correctness of positive predictions; Recall measures sensitivity to true positive cases.',
        },
        {
          name: 'F1 Score',
          latex: 'F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}',
          explanation: 'Harmonic mean balancing precision and recall on imbalanced datasets.',
        },
      ],
    },
    derivation: {
      title: 'Why Fitting Scalers on the Full Dataset Causes Data Leakage',
      objective: 'Prove mathematically how global normalization leaks future test information into model weights.',
      steps: [
        {
          step: 1,
          label: 'Global Mean Calculation',
          latex: '\\mu_{\\text{global}} = \\frac{1}{N_{\\text{train}} + N_{\\text{test}}} \\left( \\sum_{i \\in \\text{train}} x_i + \\sum_{j \\in \\text{test}} x_j \\right)',
          explanation: 'Computing the mean over the entire dataset incorporates information from test samples.',
        },
        {
          step: 2,
          label: 'Information Contamination',
          latex: 'x_{\\text{norm, train}} = \\frac{x - \\mu_{\\text{global}}}{\\sigma_{\\text{global}}} = f(x_{\\text{test}})',
          explanation: 'Every normalized training sample is now a mathematical function of test sample values, artificially boosting validation scores while degrading real-world deployment performance.',
        },
      ],
    },
    variables: [
      { symbol: 'TP, FP', name: 'True Positives, False Positives', description: 'Confusion matrix counts', dimensions: 'Integer counts' },
      { symbol: 'TN, FN', name: 'True Negatives, False Negatives', description: 'Confusion matrix counts', dimensions: 'Integer counts' },
      { symbol: 'state_dict', name: 'PyTorch Checkpoint Dictionary', description: 'Key-value map of learned parameter tensors', dimensions: 'OrderedDict' },
    ],
    numericalExample: {
      scenario: 'Evaluating test confusion matrix for clinical tumor classification.',
      dataset: [
        { TP: 42, FP: 3, FN: 2, TN: 63 },
      ],
      calculations: [
        { step: 'Accuracy', math: '(42 + 63) / (42 + 3 + 2 + 63) = 105 / 110', result: '95.45%' },
        { step: 'Precision', math: '42 / (42 + 3) = 42 / 45', result: '93.33%' },
        { step: 'Recall', math: '42 / (42 + 2) = 42 / 44', result: '95.45%' },
        { step: 'F1 Score', math: '2 * (0.9333 * 0.9545) / (0.9333 + 0.9545)', result: '0.9438' },
      ],
      finalConclusion: 'The model achieves an exceptional 94.4% F1-score with only 2 false negatives out of 44 actual positive malignant cases.',
    },
    visualExplanation: {
      title: 'End-to-End Machine Learning Project Pipeline',
      description: 'The production workflow transitions cleanly through distinct, leak-free phases.',
      features: [
        'Data Ingestion -> Train/Val/Test Split (70/15/15) -> Scaler fit on Train only.',
        'Model Training with validation monitoring after every epoch.',
        'Model Checkpointing saving best_model.pth when validation loss reaches a new global minimum.',
      ],
    },
    scratchCode: {
      title: 'Complete Standalone Project Code in PyTorch',
      code: `import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import TensorDataset, DataLoader
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import numpy as np

# 1. Load Real-World Dataset (Breast Cancer Clinical Dataset)
data = load_breast_cancer()
X, y = data.data, data.target

# 2. Strict Train (70%), Val (15%), Test (15%) Split
X_train_val, X_test, y_train_val, y_test = train_test_split(X, y, test_size=0.15, random_state=42, stratify=y)
X_train, X_val, y_train, y_val = train_test_split(X_train_val, y_train_val, test_size=0.176, random_state=42, stratify=y_train_val)

# 3. Leak-Free Scaling (Fit on Train only!)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_val = scaler.transform(X_val)
X_test = scaler.transform(X_test)

# 4. PyTorch DataLoaders
train_ds = TensorDataset(torch.tensor(X_train, dtype=torch.float32), torch.tensor(y_train, dtype=torch.float32).unsqueeze(1))
val_ds = TensorDataset(torch.tensor(X_val, dtype=torch.float32), torch.tensor(y_val, dtype=torch.float32).unsqueeze(1))
test_ds = TensorDataset(torch.tensor(X_test, dtype=torch.float32), torch.tensor(y_test, dtype=torch.float32).unsqueeze(1))

train_loader = DataLoader(train_ds, batch_size=32, shuffle=True)
val_loader = DataLoader(val_ds, batch_size=32, shuffle=False)
test_loader = DataLoader(test_ds, batch_size=32, shuffle=False)

# 5. Production Deep Neural Network Architecture
class ClinicalClassifier(nn.Module):
    def __init__(self, in_features):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_features, 64),
            nn.BatchNorm1d(64),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(64, 32),
            nn.BatchNorm1d(32),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(32, 1)
        )
    def forward(self, x):
        return self.net(x)

model = ClinicalClassifier(X_train.shape[1])
criterion = nn.BCEWithLogitsLoss()
optimizer = optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-2)

# 6. Training with Model Checkpointing
best_val_loss = float('inf')
for epoch in range(1, 16):
    model.train()
    for xb, yb in train_loader:
        optimizer.zero_grad()
        loss = criterion(model(xb), yb)
        loss.backward()
        optimizer.step()
        
    model.eval()
    val_loss = 0.0
    with torch.no_grad():
        for xb, yb in val_loader:
            val_loss += criterion(model(xb), yb).item() * xb.size(0)
    val_loss /= len(val_ds)
    
    if val_loss < best_val_loss:
        best_val_loss = val_loss
        torch.save(model.state_dict(), 'best_model.pth')
        checkpoint_note = "⭐ Saved checkpoint!"
    else:
        checkpoint_note = ""
    print(f"Epoch {epoch:2d} | Val Loss: {val_loss:.4f} {checkpoint_note}")

# 7. Final Test Evaluation
model.load_state_dict(torch.load('best_model.pth'))
model.eval()
correct, total = 0, 0
with torch.no_grad():
    for xb, yb in test_loader:
        preds = (torch.sigmoid(model(xb)) > 0.5).float()
        correct += (preds == yb).sum().item()
        total += yb.size(0)

print(f"\\nFinal Test Accuracy: {correct / total * 100:.2f}%")`,
      explanation: 'End-to-end runnable Python script training a deep neural network on breast cancer clinical data with checkpoint saving and test evaluation.',
    },
    sklearnCode: {
      title: 'Scikit-Learn Classification Report & Confusion Matrix',
      code: `from sklearn.metrics import classification_report, confusion_matrix
import numpy as np

# Convert predictions to evaluation metrics
y_true_mock = np.array([1, 1, 0, 1, 0, 0, 1, 0])
y_pred_mock = np.array([1, 1, 0, 0, 0, 0, 1, 0])

print("Classification Report:")
print(classification_report(y_true_mock, y_pred_mock, target_names=["Malignant", "Benign"]))
print("Confusion Matrix:\\n", confusion_matrix(y_true_mock, y_pred_mock))`,
      explanation: 'Utilizes classification_report to examine Precision, Recall, and F1-score across all classes.',
    },
    runnableCode: {
      code: `import torch

# Demonstrate state_dict saving and restoring
net = torch.nn.Linear(3, 1)
torch.save(net.state_dict(), "temp_checkpoint.pth")

# Load into fresh model
fresh_net = torch.nn.Linear(3, 1)
fresh_net.load_state_dict(torch.load("temp_checkpoint.pth"))

print("Original weight: ", net.weight.data)
print("Restored weight: ", fresh_net.weight.data)
print("Weights match identically:", torch.allclose(net.weight, fresh_net.weight))`,
      expectedOutput: 'Original weight:  tensor([[...]])\nRestored weight:  tensor([[...]])\nWeights match identically: True',
    },
    lineByLineExplanation: [
      { lines: '4-5', codeSnippet: 'torch.save(net.state_dict(), "temp_checkpoint.pth")', explanation: 'Saves parameter tensor weights in portable serialized dictionary format.' },
      { lines: '8-9', codeSnippet: 'fresh_net.load_state_dict(torch.load("temp_checkpoint.pth"))', explanation: 'Loads parameter tensors into a new uninitialized model architecture.' },
      { lines: '13', codeSnippet: 'torch.allclose(...)', explanation: 'Verifies that restored weights are bit-for-bit identical.' },
    ],
    hyperparameters: [
      { name: 'test_split_ratio', defaultVal: '0.15', range: '0.10 to 0.20', effect: 'Fraction of total dataset reserved strictly for final testing', recommendation: '15% provides reliable test sample counts without starving training.' },
      { name: 'stratify', defaultVal: 'y', range: 'y / None', effect: 'Preserves the exact percentage of positive/negative classes across splits', recommendation: 'Always stratify on y for classification tasks.' },
    ],
    assumptions: [
      { assumption: 'Stationary Production Data Distribution', whyItMatters: 'If production inputs drift over time (e.g. seasonal shifts), test accuracy degrades in deployment.', howToVerify: 'Monitor feature drift and prediction distribution in production.' },
    ],
    commonMistakes: [
      { mistake: 'Calling scaler.fit_transform() on the test dataset', whyWrong: 'Fitting on test data re-calculates test mean and variance, causing data leakage and unrealistic validation metrics.', howToFix: 'Call scaler.fit_transform() ONLY on training data; call scaler.transform() on validation and test data.', solution: 'X_test = scaler.transform(X_test)' },
      { mistake: 'Saving model using torch.save(model) instead of torch.save(model.state_dict())', whyWrong: 'Saving the entire model object pickles Python class paths, making it fragile and prone to breaking when code moves or refactors.', howToFix: 'Always save state_dict.', solution: 'torch.save(model.state_dict(), "model.pth")' },
    ],
    realWorldUseCases: [
      { industry: 'Clinical Oncology', application: 'Pathology Diagnostics', benefit: 'Deep classifiers assist doctors by flagging high-risk patient biopsies with 98% recall.' },
      { industry: 'FinTech', application: 'Transaction Fraud Detection', benefit: 'Processes multi-feature transaction streams and checkpoints best models based on PR-AUC.' },
      { industry: 'E-Commerce', application: 'Customer Churn Prediction', benefit: 'Production pipeline retrains monthly and evaluates against holdout test cohorts.' },
    ],
    practiceQuestions: [
      { id: 'dl15-q1', question: 'Why must `scaler.fit_transform()` be applied strictly to the training split, while `scaler.transform()` is used for validation and test splits?', hint: 'What does "fit" calculate?', answer: '"Fit" calculates the mean μ and standard deviation σ. If you fit on the test set or on the combined dataset, test set information leaks into training. In real deployment, future samples arrive one by one and their population statistics are unknown.', explanation: 'The model must be evaluated under realistic conditions where test statistics are not known in advance.' },
      { id: 'dl15-q2', question: 'Why is saving `model.state_dict()` preferred over saving the entire `model` object in PyTorch?', hint: 'Consider code refactoring and Python pickling.', answer: '`state_dict()` saves only the raw parameter weight tensors in a clean dictionary. Saving the entire model object pickles the exact Python class definition and file directory structure, which breaks when code is reorganized or shared.', explanation: '`state_dict` is robust, modular, and portable.' },
    ],
    quiz: [
      {
        id: 'dl15-qz1',
        question: 'What is the correct way to save and reload model weights in PyTorch?',
        options: [
          'Exporting as CSV; importing with Pandas',
          'torch.save(model.state_dict(), "path.pth") and model.load_state_dict(torch.load("path.pth"))',
          'Copy-pasting print(model.parameters()) into a text file',
          'Screenshots of the terminal',
        ],
        correctIndex: 1,
        explanation: 'Saving state_dict() stores an ordered dictionary of parameter tensors, the standard and robust method in PyTorch.',
      },
      {
        id: 'dl15-qz2',
        question: 'When splitting an imbalanced classification dataset, why should you set `stratify=y`?',
        options: [
          'It makes the dataset 10x larger',
          'It ensures that each partition (train, val, test) contains the exact same percentage of positive and negative classes as the original dataset',
          'It automatically balances classes by synthesizing new samples',
          'It trains the model faster',
        ],
        correctIndex: 1,
        explanation: 'Stratification prevents rare positive samples from accidentally ending up entirely in one split while absent in another.',
      },
      {
        id: 'dl15-qz3',
        question: 'If your model achieves 99% training accuracy but 75% validation accuracy, what is the diagnosis and best remedy?',
        options: [
          'Underfitting; add more layers and increase learning rate',
          'Overfitting; apply Dropout, L2 weight decay, and collect or augment training data',
          'The dataset is corrupted',
          'The computer has a virus',
        ],
        correctIndex: 1,
        explanation: 'A large gap between training and validation performance indicates high variance (overfitting); regularization and data augmentation are the standard remedies.',
      },
    ],
    independentExercise: {
      id: 'dl15-ex',
      title: 'Save and Load a Checkpoint with Optimizer State',
      problem: 'Write a Python snippet that saves a full checkpoint dictionary containing epoch, model.state_dict(), optimizer.state_dict(), and best_loss, and then restores all 4 components into fresh instances.',
      hints: ['Use torch.save({"epoch": epoch, "model_state": ..., "opt_state": ...}, "ckpt.pth").', 'Use torch.load and load_state_dict.'],
      starterCode: `import torch

# Save comprehensive checkpoint dictionary
checkpoint = {
    # Fill in
}
`,
      solution: `import torch
import torch.nn as nn
import torch.optim as optim

model = nn.Linear(4, 1)
optimizer = optim.Adam(model.parameters(), lr=1e-3)
epoch = 10
best_loss = 0.25

# Save
torch.save({
    'epoch': epoch,
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'best_loss': best_loss,
}, 'checkpoint.pth')

# Load
ckpt = torch.load('checkpoint.pth')
model2 = nn.Linear(4, 1)
model2.load_state_dict(ckpt['model_state_dict'])
optimizer2 = optim.Adam(model2.parameters(), lr=1e-3)
optimizer2.load_state_dict(ckpt['optimizer_state_dict'])

print(f"Restored checkpoint from epoch {ckpt['epoch']} with best loss {ckpt['best_loss']}")`,
    },
    summary: {
      keyTakeaways: [
        'A production deep learning project follows strict discipline: leak-free scaling, stratified splits, and structured checkpointing.',
        'Always save and load checkpoints using model.state_dict() rather than pickling the full model object.',
        'Evaluate models comprehensively with Precision, Recall, F1, and ROC-AUC rather than accuracy alone.',
      ],
      nextLessonId: 'dl-16-convolutional-neural-networks',
      nextLessonTitle: 'DL-16: Convolutional Neural Networks',
      nextLessonModuleId: 'dl-module-5',
    },
  },
};
