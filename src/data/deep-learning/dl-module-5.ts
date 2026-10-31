import { ModuleData, LessonContent } from '@/lib/types';

export const dlModule5Data: ModuleData = {
  id: 'dl-module-5',
  number: 5,
  title: 'Convolutional, Sequence & Attention Models',
  subtitle: 'Spatial Invariance, Recurrence & Scaled Dot-Product Mechanisms',
  description:
    'Venture into modern deep learning architectures: 2D convolutions, receptive fields, pooling and feature maps in CNNs; transfer learning with frozen vs fine-tuned weights; sequence learning through RNNs, LSTMs, and GRUs; and the intuition and math of Scaled Dot-Product Attention.',
  icon: 'Layers',
  badge: 'Phase 3 · Deep Learning',
  estimatedHours: 16,
  topicsCount: 4,
  lessons: [
    {
      id: 'dl-16-convolutional-neural-networks',
      moduleId: 'dl-module-5',
      title: 'DL-16: Convolutional Neural Networks',
      description: 'Image tensors, 2D convolution filters, feature maps, padding, stride, receptive fields, pooling layers, and spatial invariance.',
      order: 1,
      readTimeMinutes: 30,
      visualizerType: 'cnn-convolution-explorer',
      difficulty: 'Intermediate',
    },
    {
      id: 'dl-17-transfer-learning',
      moduleId: 'dl-module-5',
      title: 'DL-17: Transfer Learning & Fine-Tuning',
      description: 'Pretrained models, feature extraction vs fine-tuning, frozen backbone layers, classification head replacement, and learning rate differentials.',
      order: 2,
      readTimeMinutes: 26,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'dl-18-sequence-learning',
      moduleId: 'dl-module-5',
      title: 'DL-18: Sequence Learning: RNNs, LSTMs & GRUs',
      description: 'Sequential data, recurrent hidden state updates, vanishing gradients through time (BPTT), gating mechanisms in LSTM (forget, input, output), and GRU.',
      order: 3,
      readTimeMinutes: 30,
      visualizerType: 'none',
      difficulty: 'Advanced',
    },
    {
      id: 'dl-19-attention-fundamentals',
      moduleId: 'dl-module-5',
      title: 'DL-19: Attention Fundamentals',
      description: 'Why recurrence bottlenecks sequence modeling, Query-Key-Value paradigm, scaled dot-product formula, attention weight heatmaps, and context aggregation.',
      order: 4,
      readTimeMinutes: 32,
      visualizerType: 'attention-explorer',
      difficulty: 'Advanced',
    },
  ],
};

export const dlModule5Lessons: Record<string, LessonContent> = {
  'dl-16-convolutional-neural-networks': {
    id: 'dl-16-convolutional-neural-networks',
    moduleId: 'dl-module-5',
    title: 'DL-16: Convolutional Neural Networks',
    subtitle: 'Kernels, Feature Maps, Strides, Padding & Translation Invariance',
    order: 1,
    readTimeMinutes: 30,
    difficulty: 'Intermediate',
    visualizerType: 'cnn-convolution-explorer',
    objectives: [
      'Understand how 2D convolutions exploit spatial locality and translation invariance in grid-like data',
      'Calculate output feature map spatial dimensions given input size W, kernel size K, padding P, and stride S',
      'Explain the purpose of Max Pooling and Average Pooling layers in building spatial hierarchies',
      'Use the interactive CNN Convolution Explorer to trace 3×3 kernels scanning across a 5×5 input matrix',
    ],
    prerequisites: ['DL-02: Neural Network Fundamentals', 'DL-05: Forward Propagation'],
    analogy: {
      title: 'The Sliding Magnifying Glass Inspector',
      text: 'Suppose you are searching for stamps on envelopes. Instead of reading the entire envelope in one giant glance with millions of eyes (a dense fully connected layer), you slide a small 3×3 centimeter magnifying glass (a convolutional kernel) across the paper from left to right, top to bottom. The magnifying glass is specially tinted to glow whenever it spots a stamp edge. Because the same magnifying glass slides everywhere, it recognizes the stamp regardless of whether it is stuck in the top-left corner or bottom-right corner. This is weight sharing and translation invariance.',
      metaphor: 'Fully connected layers look at every pixel simultaneously; convolutions slide localized feature detectors everywhere.',
    },
    problemSolved: {
      title: 'The Curse of Dimensionality in Image Recognition',
      description: 'A 1000x1000 RGB image contains 3 million input values. Connecting this to a single hidden layer of 1,000 neurons using dense linear layers would require 3,000,000,000 parameters for just one layer! Convolutional layers solve this parameter explosion through local receptive fields and weight sharing, reducing millions of parameters to a tiny 3x3 filter of just 9 weights.',
      keyPoints: [
        'Local Receptive Fields: Neurons connect only to small local patches of the visual field.',
        'Shared Weights: The exact same kernel filter is applied across all spatial positions.',
        'Translation Invariance: Features learned in one part of the image can be recognized anywhere.',
      ],
    },
    intuition: {
      overview: 'A CNN alternates between convolution layers (which detect features) and pooling layers (which downsample spatial dimensions and broaden receptive fields).',
      steps: [
        { step: 1, title: 'Input Tensor', description: 'Image represented as (Batch, Channels, Height, Width) tensor — e.g. (32, 3, 224, 224).' },
        { step: 2, title: 'Kernel Filtering', description: 'A bank of K learned filters slides across the input, computing element-wise dot products to produce K feature maps.' },
        { step: 3, title: 'Non-Linearity', description: 'Apply point-wise ReLU to eliminate negative filter activations.' },
        { step: 4, title: 'Pooling Downsampling', description: 'Max-pooling extracts the dominant activation in each 2x2 window, cutting spatial dimensions by half.' },
        { step: 5, title: 'Dense Projection', description: 'Deep feature maps are flattened and classified via linear output layers.' },
      ],
    },
    mathematics: {
      overview: 'Mathematical definitions of 2D cross-correlation and output spatial dimensions.',
      foundations: [
        {
          name: '2D Discrete Convolution (Cross-Correlation)',
          latex: 'S(i, j) = (I * K)(i, j) = \\sum_{m} \\sum_{n} I(i + m, j + n) K(m, n) + b',
          explanation: 'Computes sum of element-wise products between receptive patch I and kernel weights K plus bias b.',
        },
        {
          name: 'Output Spatial Dimension Formula',
          latex: 'O = \\left\\lfloor \\frac{W - K + 2P}{S} \\right\\rfloor + 1',
          explanation: 'W is input width, K is kernel size, P is padding, S is stride. Essential for sizing CNN layers.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Convolution Output Dimension Formula',
      objective: 'Prove why the output width of a convolution is O = floor((W - K + 2P)/S) + 1.',
      steps: [
        {
          step: 1,
          label: 'Effective Input Width with Padding',
          latex: 'W_{\\text{padded}} = W + 2P',
          explanation: 'Adding P pixels of padding on both left and right edges increases width by 2P.',
        },
        {
          step: 2,
          label: 'Total Distance the Filter Can Slide',
          latex: '\\text{Travel Distance} = W_{\\text{padded}} - K = W + 2P - K',
          explanation: 'The kernel spans width K; the remaining available sliding room is W + 2P - K.',
        },
        {
          step: 3,
          label: 'Accounting for Stride S and Initial Position',
          latex: '\\text{Number of Steps} = \\left\\lfloor \\frac{W + 2P - K}{S} \\right\\rfloor \\implies O = \\left\\lfloor \\frac{W - K + 2P}{S} \\right\\rfloor + 1',
          explanation: 'Dividing by stride S counts the number of strides, and adding 1 accounts for the initial starting position.',
        },
      ],
    },
    variables: [
      { symbol: 'W', name: 'Input Spatial Dimension', description: 'Height or width of input feature map', dimensions: 'Scalar integer' },
      { symbol: 'K', name: 'Kernel Filter Size', description: 'Spatial size of square kernel (e.g. 3 for 3x3)', dimensions: 'Scalar integer' },
      { symbol: 'P', name: 'Padding', description: 'Number of zero-padding border pixels added to edges', dimensions: 'Scalar integer' },
      { symbol: 'S', name: 'Stride', description: 'Step size in pixels the filter moves on each step', dimensions: 'Scalar integer' },
    ],
    numericalExample: {
      scenario: 'Calculating output dimensions for a 224x224 input image convolved with a 7x7 filter, padding=3, stride=2.',
      dataset: [
        { W: 224, K: 7, P: 3, S: 2 },
      ],
      calculations: [
        { step: 'Padded Width', math: '224 + 2 * 3 = 230', result: '230' },
        { step: 'Sliding Distance', math: '230 - 7 = 223', result: '223' },
        { step: 'Strided Steps', math: 'floor(223 / 2) = 111', result: '111' },
        { step: 'Final Output Dimension', math: '111 + 1', result: '112' },
      ],
      finalConclusion: 'The output feature map has dimensions 112x112, exactly halving the input spatial size.',
    },
    visualExplanation: {
      title: 'Interactive CNN Convolution Explorer',
      description: 'The visualizer above demonstrates a 3×3 kernel scanning across a 5×5 input grid.',
      features: [
        'Select kernels: Vertical Edge, Horizontal Edge, Sharpen, or Ridge detector.',
        'Click on any cell in the 3×3 output feature map to illuminate the corresponding 3×3 receptive field in the input.',
        'Inspect the exact element-wise products and accumulation sum driving feature extraction.',
      ],
    },
    scratchCode: {
      title: '2D Convolution Forward Pass in Pure NumPy',
      code: `import numpy as np

def conv2d_forward(X, K, bias=0.0, stride=1, padding=0):
    # X shape: (H, W), K shape: (KH, KW)
    if padding > 0:
        X = np.pad(X, ((padding, padding), (padding, padding)), mode='constant')
        
    H, W = X.shape
    KH, KW = K.shape
    out_H = (H - KH) // stride + 1
    out_W = (W - KW) // stride + 1
    
    out = np.zeros((out_H, out_W))
    for r in range(out_H):
        for c in range(out_W):
            patch = X[r*stride : r*stride + KH, c*stride : c*stride + KW]
            out[r, c] = np.sum(patch * K) + bias
            
    return out

# 5x5 image with vertical edge
image = np.array([
    [0, 0, 10, 10, 10],
    [0, 0, 10, 10, 10],
    [0, 0, 10, 10, 10],
    [0, 0, 10, 10, 10],
    [0, 0, 10, 10, 10]
])

# Sobel Vertical Edge Kernel
sobel_v = np.array([
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]
])

feature_map = conv2d_forward(image, sobel_v, stride=1, padding=0)
print("Output Feature Map (3x3):\\n", feature_map)`,
      explanation: 'Applies sliding window extraction and sum of products to detect vertical brightness transitions.',
    },
    sklearnCode: {
      title: 'Convolutional Neural Network in PyTorch',
      code: `import torch
import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()
        self.features = nn.Sequential(
            # Block 1: (3, 32, 32) -> (16, 32, 32) -> (16, 16, 16)
            nn.Conv2d(in_channels=3, out_channels=16, kernel_size=3, padding=1),
            nn.BatchNorm2d(16),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2),
            
            # Block 2: (16, 16, 16) -> (32, 16, 16) -> (32, 8, 8)
            nn.Conv2d(in_channels=16, out_channels=32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2)
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(32 * 8 * 8, 128),
            nn.ReLU(),
            nn.Linear(128, num_classes)
        )
        
    def forward(self, x):
        return self.classifier(self.features(x))

model = SimpleCNN()
x = torch.randn(4, 3, 32, 32) # Batch of 4 CIFAR-10 images
print("CNN Output logits shape:", model(x).shape)`,
      explanation: 'Constructs an idiomatic PyTorch CNN with convolutional blocks, pooling, and a dense classification head.',
    },
    runnableCode: {
      code: `import torch
import torch.nn as nn

# Compute output shape using PyTorch Conv2d
conv = nn.Conv2d(in_channels=3, out_channels=32, kernel_size=3, stride=2, padding=1)
pool = nn.MaxPool2d(kernel_size=2, stride=2)

x = torch.randn(1, 3, 64, 64)
x_conv = conv(x)
x_pool = pool(x_conv)

print(f"Input shape:        {x.shape}")
print(f"After Conv (s=2):   {x_conv.shape} (Formula: (64-3+2*1)/2 + 1 = 32)")
print(f"After MaxPool(s=2): {x_pool.shape} (Halved: 32 / 2 = 16)")`,
      expectedOutput: 'Input shape:        torch.Size([1, 3, 64, 64])\nAfter Conv (s=2):   torch.Size([1, 32, 32, 32]) (Formula: (64-3+2*1)/2 + 1 = 32)\nAfter MaxPool(s=2): torch.Size([1, 32, 16, 16]) (Halved: 32 / 2 = 16)',
    },
    lineByLineExplanation: [
      { lines: '5', codeSnippet: 'conv = nn.Conv2d(3, 32, kernel_size=3, stride=2, padding=1)', explanation: '3 input channels (RGB), 32 output feature maps, stride=2 cuts spatial size in half.' },
      { lines: '6', codeSnippet: 'pool = nn.MaxPool2d(kernel_size=2, stride=2)', explanation: '2x2 max pooling further halves spatial dimensions.' },
      { lines: '11-13', codeSnippet: 'print shapes', explanation: 'Demonstrates spatial reduction from 64x64 down to 32x32, then 16x16.' },
    ],
    hyperparameters: [
      { name: 'kernel_size', defaultVal: '3', range: '3, 5, 7', effect: 'Spatial size of receptive field', recommendation: 'Stacking two 3x3 filters has the same effective receptive field as one 5x5 filter but with 28% fewer parameters and an extra non-linearity (VGG principle).' },
      { name: 'padding', defaultVal: 'same (1 for 3x3)', range: '0 (valid) or P = (K-1)/2 (same)', effect: 'Maintains spatial dimensions so border pixels are not discarded', recommendation: 'Always use padding=1 for 3x3 convolutions.' },
    ],
    assumptions: [
      { assumption: 'Spatial Grid Locality', whyItMatters: 'CNNs assume nearby pixels are strongly correlated. If pixels are randomly permuted across the image, CNNs fail to recognize patterns.', howToVerify: 'Verify that input features represent spatial, temporal, or frequency grids.' },
    ],
    commonMistakes: [
      { mistake: 'Miscalculating flattened dimensions into the first linear layer', whyWrong: 'Entering the wrong feature count in nn.Linear(wrong_dim, 128) throws a runtime matrix shape error.', howToFix: 'Calculate dimensions with the formula or inspect shape using nn.AdaptiveAvgPool2d((1, 1)).', solution: 'nn.AdaptiveAvgPool2d((1, 1)); nn.Flatten()' },
      { mistake: 'Using oversized kernels like 11x11 or 7x7 in deep layers', whyWrong: 'Large kernels dramatically increase parameter count and compute with no benefit in deep layers.', howToFix: 'Use 3x3 kernels everywhere (Simonyan & Zisserman, VGGNet).', solution: 'kernel_size=3' },
    ],
    realWorldUseCases: [
      { industry: 'Medical Imaging', application: 'Skin Cancer Melanoma Screening', benefit: 'Deep CNNs detect malignant lesions in dermoscopy photos with dermatologist-level accuracy.' },
      { industry: 'Automotive & Robotics', application: 'Lane Boundary Detection', benefit: 'Processes 60 FPS video streams from onboard cameras with low-latency TensorRT acceleration.' },
      { industry: 'Agriculture', application: 'Drone Crop Disease Monitoring', benefit: 'Classifies fungal infections across aerial hectare surveys automatically.' },
    ],
    practiceQuestions: [
      { id: 'dl16-q1', question: 'Why does stacking two 3x3 convolutional layers have the same receptive field as a single 5x5 layer, and why is the 3x3 stack preferred?', hint: 'Calculate parameter count: 2 * (3*3) vs 1 * (5*5).', answer: 'Two 3x3 layers cover a 5x5 receptive field (3 + 3 - 1 = 5) but use only 18 weights instead of 25 weights (28% fewer parameters), and include an additional non-linear activation between them.', explanation: 'This VGG principle allows deeper networks with lower compute.' },
      { id: 'dl16-q2', question: 'What is the purpose of Max Pooling in a Convolutional Neural Network?', hint: 'What happens to spatial size and small translations?', answer: 'Max pooling downsamples spatial dimensions, reducing compute for subsequent layers while providing translational invariance to small shifts in feature position.', explanation: 'It retains the strongest feature activation in each local window.' },
    ],
    quiz: [
      {
        id: 'dl16-qz1',
        question: 'If an input image of size 64x64 is passed through a convolution with kernel size 5, stride 1, and padding 0, what is the output spatial size?',
        options: [
          '64x64',
          '60x60',
          '58x58',
          '32x32',
        ],
        correctIndex: 1,
        explanation: 'Formula: (64 - 5 + 2*0) / 1 + 1 = 59 + 1 = 60x60.',
      },
      {
        id: 'dl16-qz2',
        question: 'What core property of images allows CNNs to share weights across the entire image?',
        options: [
          'RGB pixels are always integers',
          'Translation invariance: a cat or an edge has the exact same visual properties whether it appears on the left, right, top, or bottom of the image',
          'Images contain no negative values',
          'All images are squares',
        ],
        correctIndex: 1,
        explanation: 'Translation invariance means the filter that recognizes an eye or edge in the top corner is equally valid for the bottom corner, allowing parameter sharing.',
      },
      {
        id: 'dl16-qz3',
        question: 'What is the spatial size of a 28x28 feature map after passing through a MaxPool2d layer with kernel_size=2 and stride=2?',
        options: [
          '26x26',
          '14x14',
          '7x7',
          '28x28',
        ],
        correctIndex: 1,
        explanation: 'Stride 2 non-overlapping pooling divides spatial dimensions by 2: 28 / 2 = 14x14.',
      },
    ],
    independentExercise: {
      id: 'dl16-ex',
      title: 'Calculate CNN Feature Map Dimensions',
      problem: 'Write a Python function `get_conv_output_dim(W, K, P, S)` that implements the mathematical formula O = floor((W - K + 2*P) / S) + 1 and verify it for W=32, K=3, P=1, S=1 (should return 32).',
      hints: ['Use integer division //.'],
      starterCode: `def get_conv_output_dim(W, K, P, S):
    pass

print(get_conv_output_dim(32, 3, 1, 1))
`,
      solution: `def get_conv_output_dim(W, K, P, S):
    return (W - K + 2 * P) // S + 1

print("Output size:", get_conv_output_dim(32, 3, 1, 1))
assert get_conv_output_dim(32, 3, 1, 1) == 32
print("Formula verified!")`,
    },
    summary: {
      keyTakeaways: [
        'Convolutional layers exploit spatial locality and weight sharing to dramatically reduce parameter counts on image data.',
        'Output spatial dimensions follow O = floor((W - K + 2P)/S) + 1.',
        'Stacking small 3x3 kernels provides deeper non-linear hierarchies with fewer parameters than large filters.',
      ],
      nextLessonId: 'dl-17-transfer-learning',
      nextLessonTitle: 'DL-17: Transfer Learning & Fine-Tuning',
      nextLessonModuleId: 'dl-module-5',
    },
  },

  'dl-17-transfer-learning': {
    id: 'dl-17-transfer-learning',
    moduleId: 'dl-module-5',
    title: 'DL-17: Transfer Learning & Fine-Tuning',
    subtitle: 'Pretrained Vision & NLP Backbones: Feature Extraction vs Full Fine-Tuning',
    order: 2,
    readTimeMinutes: 26,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Explain the transfer learning spectrum: Feature Extraction (frozen backbone) vs Full Fine-Tuning vs Layer-wise discriminative learning rates',
      'Replace the final classification head of a pretrained backbone (e.g. ResNet-50) for custom target classes',
      'Understand catastrophic forgetting and how freezing early layers prevents destroying general visual primitives',
      'Evaluate data size vs domain similarity to select the optimal transfer learning strategy',
    ],
    prerequisites: ['DL-16: Convolutional Neural Networks', 'DL-13: PyTorch Fundamentals'],
    analogy: {
      title: 'The Accomplished Pianist Learning the Harpsichord',
      text: 'Suppose an accomplished concert pianist wants to learn the harpsichord. He does not start by learning how to read music or practicing finger dexterity scales from childhood. He transfers 95% of his existing knowledge—music theory, rhythm, sight-reading—and only adapts the final 5% specific to the harpsichord (its lighter key action and plucked strings). In deep learning, training a vision model from scratch requires millions of images. Transfer learning downloads a model that already knows edges, textures, and shapes from 14 million ImageNet photos, and adapts only the final decision layer to your specific 500 medical X-ray images.',
      metaphor: 'Training from scratch is teaching an infant to speak; transfer learning is hiring a fluent linguist to learn a specialized medical vocabulary.',
    },
    problemSolved: {
      title: 'Overcoming Data Scarcity in Real-World Domains',
      description: 'Most real-world companies do not possess millions of labeled training images. Training a 50-layer deep network from scratch on 500 images results in immediate 100% memorization and catastrophic overfitting. Transfer learning enables high performance even with small datasets.',
      keyPoints: [
        'Universal Feature Reuse: Early layers of ImageNet models learn Gabor-like filters, color blobs, and edges useful across all computer vision tasks.',
        '100x Training Acceleration: Convergence occurs in 5-10 epochs rather than hundreds of epochs.',
        'Freezing Backbones: Setting `param.requires_grad = False` prevents backprop from altering pretrained weights during initial head adaptation.',
      ],
    },
    intuition: {
      overview: 'Transfer learning repurposes a model trained on a massive source task (e.g. ImageNet-1k) for a target task by replacing its final output head and fine-tuning weights with small learning rates.',
      steps: [
        { step: 1, title: 'Pretrained Ingestion', description: 'Download a verified backbone architecture (e.g. ResNet-50, EfficientNet, or ViT) with pretrained weights.' },
        { step: 2, title: 'Backbone Freeze', description: 'Loop through model parameters and set requires_grad = False to freeze feature extraction.' },
        { step: 3, title: 'Head Replacement', description: 'Replace model.fc or model.classifier with a new linear layer matching target class count.' },
        { step: 4, title: 'Head Warmup', description: 'Train only the new classification head for 3-5 epochs until initial loss stabilizes.' },
        { step: 5, title: 'Unfreeze & Fine-Tune', description: 'Unfreeze top backbone blocks and train end-to-end with a 10x smaller learning rate (e.g. 1e-5).' },
      ],
    },
    mathematics: {
      overview: 'Formulation of discriminative layer-wise learning rates during fine-tuning.',
      foundations: [
        {
          name: 'Layer-Wise Discriminative Learning Rates',
          latex: '\\eta^{(l)} = \\eta_{\\text{base}} \\cdot \\xi^{L - l}, \\quad \\xi \\in (0, 1)',
          explanation: 'Early layers l receive exponentially smaller learning rates than final layers L, preserving foundational features while allowing high-level specialization.',
        },
      ],
    },
    derivation: {
      title: 'The 2x2 Transfer Learning Decision Matrix',
      objective: 'Classify optimal fine-tuning strategy based on Target Dataset Size and Domain Similarity to Source.',
      steps: [
        {
          step: 1,
          label: 'Small Data + High Similarity',
          latex: '\\text{Action: Linear Feature Extraction (Freeze Backbone)}',
          explanation: 'Freeze the entire backbone; train only the new classification head to prevent overfitting.',
        },
        {
          step: 2,
          label: 'Large Data + High Similarity',
          latex: '\\text{Action: Full Fine-Tuning with Low Learning Rate}',
          explanation: 'Fine-tune the entire network with a small learning rate (e.g. 1e-4) to calibrate high-level features.',
        },
        {
          step: 3,
          label: 'Small Data + Low Similarity',
          latex: '\\text{Action: Freeze Early Layers, Train Intermediate Blocks}',
          explanation: 'Generic low-level edges are still useful, but high-level features differ; freeze early blocks and train from middle layers.',
        },
        {
          step: 4,
          label: 'Large Data + Low Similarity',
          latex: '\\text{Action: Full Fine-Tuning or Train from Scratch}',
          explanation: 'With sufficient data, the network can afford to rewrite all weights to suit the novel domain.',
        },
      ],
    },
    variables: [
      { symbol: '\\xi', name: 'Layer Decay Factor', description: 'Multiplicative reduction per layer depth (typically 0.75 - 0.9)', dimensions: 'Scalar' },
      { symbol: 'requires_grad', name: 'Parameter Freeze Flag', description: 'Controls whether autograd computes gradients for a layer', dimensions: 'Boolean' },
    ],
    numericalExample: {
      scenario: 'Calculating layer-wise learning rates with base_lr = 1e-3 and decay factor ξ = 0.5 across 3 blocks.',
      dataset: [
        { block: 'Classifier Head (L)', formula: '1e-3 * 0.5^0', lr: 0.001 },
        { block: 'Top Conv Block (L-1)', formula: '1e-3 * 0.5^1', lr: 0.0005 },
        { block: 'Base Conv Block (L-2)', formula: '1e-3 * 0.5^2', lr: 0.00025 },
      ],
      calculations: [
        { step: 'Head LR', math: '0.001', result: '0.001' },
        { step: 'Top Block LR', math: '0.001 * 0.5', result: '0.0005' },
        { step: 'Base Block LR', math: '0.0005 * 0.5', result: '0.00025' },
      ],
      finalConclusion: 'The classification head trains at full speed, while the base backbone updates cautiously to preserve pretrained feature detectors.',
    },
    visualExplanation: {
      title: 'Transfer Learning Architecture: Backbone vs Head',
      description: 'The feature extractor backbone (95% of weights) is frozen; only the newly attached task-specific head receives initial training updates.',
      features: [
        'Frozen Layers (requires_grad = False): Gradient computation is skipped, saving compute and memory.',
        'Trainable Head (requires_grad = True): Standard linear layers trained on custom classes.',
        'Fine-Tuning: Top layers are subsequently unfrozen with a low learning rate.',
      ],
    },
    scratchCode: {
      title: 'Transfer Learning Pipeline in PyTorch using torchvision.models',
      code: `import torch
import torch.nn as nn
from torchvision import models

# 1. Load Pretrained ResNet-18 Backbone
# (Using modern weights parameter syntax)
weights = models.ResNet18_Weights.DEFAULT
model = models.resnet18(weights=weights)

# 2. Freeze all backbone parameters
for param in model.parameters():
    param.requires_grad = False

# 3. Inspect and replace final fully-connected head
# ResNet-18 model.fc has in_features=512, out_features=1000
in_features = model.fc.in_features
num_custom_classes = 3 # e.g. ["Cat", "Dog", "Bird"]

# New head parameters have requires_grad=True by default!
model.fc = nn.Sequential(
    nn.Linear(in_features, 128),
    nn.ReLU(),
    nn.Dropout(0.3),
    nn.Linear(128, num_custom_classes)
)

# 4. Verify parameter status
trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
frozen = sum(p.numel() for p in model.parameters() if not p.requires_grad)

print(f"Frozen Backbone Parameters:    {frozen:,} (99.4%)")
print(f"Trainable Custom Head Params:  {trainable:,} (0.6%)")`,
      explanation: 'Freezes 11 million ResNet parameters and trains only the 66,000 parameters of the newly attached head.',
    },
    sklearnCode: {
      title: 'Extracting Embeddings for Scikit-Learn Classifiers',
      code: `import torch
import torch.nn as nn
from torchvision import models
from sklearn.linear_model import LogisticRegression
import numpy as np

# Use pretrained model as a fixed feature extractor
model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)
# Strip final classification head to output 512-dim embedding vectors
feature_extractor = nn.Sequential(*list(model.children())[:-1], nn.Flatten())
feature_extractor.eval()

# Extract features from a synthetic image batch
with torch.no_grad():
    sample_images = torch.randn(20, 3, 224, 224)
    embeddings = feature_extractor(sample_images).numpy()

# Train standard Logistic Regression on deep embeddings!
mock_labels = np.random.randint(0, 2, size=20)
clf = LogisticRegression()
clf.fit(embeddings, mock_labels)
print(f"Trained Logistic Regression on {embeddings.shape[1]}-dimensional deep embeddings!")`,
      explanation: 'Demonstrates extracting deep embeddings from a pretrained neural network and training a classical classifier on top.',
    },
    runnableCode: {
      code: `import torch
import torchvision.models as models

# Check how many parameters require gradients before and after freezing
model = models.resnet18(weights=None)
print("Before freeze - requires_grad count:", sum(1 for p in model.parameters() if p.requires_grad))

for p in model.parameters():
    p.requires_grad = False

print("After freeze - requires_grad count: ", sum(1 for p in model.parameters() if p.requires_grad))

# Replace final head
model.fc = torch.nn.Linear(512, 2)
print("After head replace - trainable params:", sum(1 for p in model.parameters() if p.requires_grad))`,
      expectedOutput: 'Before freeze - requires_grad count: 62\nAfter freeze - requires_grad count:  0\nAfter head replace - trainable params: 2',
    },
    lineByLineExplanation: [
      { lines: '4-5', codeSnippet: 'model = models.resnet18(...)', explanation: 'Instantiates a ResNet-18 model.' },
      { lines: '7-8', codeSnippet: 'for p in model.parameters(): p.requires_grad = False', explanation: 'Freezes every parameter tensor in the entire network.' },
      { lines: '13', codeSnippet: 'model.fc = torch.nn.Linear(512, 2)', explanation: 'Attaching a fresh layer creates new tensors with requires_grad=True by default.' },
    ],
    hyperparameters: [
      { name: 'fine_tune_learning_rate', defaultVal: '1e-5', range: '1e-6 to 1e-4', effect: 'Step size used when unfreezing backbone blocks', recommendation: 'Always use a learning rate 10x-100x smaller than used for the head to prevent destroying pretrained representations.' },
    ],
    assumptions: [
      { assumption: 'Image Preprocessing Normalization Alignment', whyItMatters: 'Pretrained models were trained on images normalized with specific ImageNet mean [0.485, 0.456, 0.406] and std [0.229, 0.224, 0.225]. Failing to match this normalization degrades accuracy by 15-30%.', howToVerify: 'Always include torchvision.transforms.Normalize(mean=..., std=...) matching model documentation.' },
    ],
    commonMistakes: [
      { mistake: 'Fine-tuning the backbone immediately with a large learning rate', whyWrong: 'The random initial weights of the new head produce massive, random error gradients that backpropagate into the backbone, causing catastrophic forgetting of all pretrained features.', howToFix: 'Train the head alone for 3-5 epochs with the backbone frozen before unfreezing.', solution: 'Head warmup first; then unfreeze with lr=1e-5' },
      { mistake: 'Passing unfrozen parameters to the optimizer during initial head warmup', whyWrong: 'If model.parameters() is passed to optim.Adam, PyTorch allocates optimizer state (momentum, variance buffers) for all 11M frozen parameters, wasting GPU VRAM.', howToFix: 'Filter parameters passed to the optimizer using a list comprehension: optim.Adam(filter(lambda p: p.requires_grad, model.parameters()), lr=1e-3).', solution: 'optimizer = torch.optim.Adam(filter(lambda p: p.requires_grad, model.parameters()), lr=1e-3)' },
    ],
    realWorldUseCases: [
      { industry: 'Industrial Defect Detection', application: 'Factory Assembly Inspection', benefit: 'Fine-tunes a pretrained vision model on only 100 photos of cracked metal parts with 99% accuracy.' },
      { industry: 'Document Processing & OCR', application: 'Invoice Field Extraction (LayoutLM)', benefit: 'Transfers pretrained multimodal document models to custom receipts and tax forms.' },
      { industry: 'Satellite Remote Sensing', application: 'Deforestation Tracking', benefit: 'Adapts standard satellite imagery models to specialized multispectral infrared bands.' },
    ],
    practiceQuestions: [
      { id: 'dl17-q1', question: 'What is "Catastrophic Forgetting" and how does freezing backbone layers prevent it?', hint: 'What happens if large random gradients hit a pretrained model?', answer: 'Catastrophic forgetting occurs when a neural network overwrites its previously learned general knowledge with task-specific noise. Freezing early layers physically locks their parameters so no gradients can alter them during initial training.', explanation: 'It protects foundational feature representations.' },
      { id: 'dl17-q2', question: 'Why must input images be normalized with ImageNet mean and std when using torchvision pretrained models?', hint: 'Think about distribution shift.', answer: 'The pretrained weights were optimized under the exact statistical distribution of ImageNet (mean [0.485, 0.456, 0.406]). If test images have a different mean or range, early layer activations shift, distorting feature detection.', explanation: 'Inputs must match the distribution the weights expect.' },
    ],
    quiz: [
      {
        id: 'dl17-qz1',
        question: 'How do you freeze a PyTorch layer so its weights are not updated during training?',
        options: [
          'Delete the layer from the model',
          'Set `param.requires_grad = False` for all parameters in the layer',
          'Set the learning rate to infinity',
          'Multiply weights by 0',
        ],
        correctIndex: 1,
        explanation: 'Setting requires_grad = False tells the autograd engine not to compute or store gradients for those parameters.',
      },
      {
        id: 'dl17-qz2',
        question: 'If you have a small dataset (e.g. 300 images) highly similar to ImageNet, which transfer learning strategy should you use?',
        options: [
          'Train the entire 152-layer ResNet from scratch',
          'Freeze the entire backbone and train only a new linear classification head',
          'Use an untrained random network',
          'Delete all convolutional layers',
        ],
        correctIndex: 1,
        explanation: 'With small data, training the backbone would cause severe overfitting; freezing the backbone uses existing features safely.',
      },
      {
        id: 'dl17-qz3',
        question: 'What is the recommended rule of thumb for the learning rate when unfreezing a backbone for fine-tuning?',
        options: [
          'Use a learning rate 10x to 100x smaller than the initial head training learning rate',
          'Use a learning rate 100x larger to force rapid adaptation',
          'Learning rate must always be exactly 1.0',
          'Zero learning rate',
        ],
        correctIndex: 0,
        explanation: 'A small learning rate (e.g. 1e-5) gently adapts the backbone to the new domain without destroying general pretrained features.',
      },
    ],
    independentExercise: {
      id: 'dl17-ex',
      title: 'Replace and Freeze a Pretrained Model Head',
      problem: 'Write a Python function `adapt_resnet(num_classes)` that loads a ResNet-18, freezes all parameters, replaces the final `fc` layer with a Linear layer for `num_classes`, and returns the model.',
      hints: ['Iterate through model.parameters() setting p.requires_grad = False.', 'Assign model.fc = nn.Linear(512, num_classes).'],
      starterCode: `import torchvision.models as models
import torch.nn as nn

def adapt_resnet(num_classes):
    # Load ResNet-18, freeze, replace head
    pass
`,
      solution: `import torchvision.models as models
import torch.nn as nn

def adapt_resnet(num_classes):
    model = models.resnet18(weights=None)
    for p in model.parameters():
        p.requires_grad = False
    in_features = model.fc.in_features
    model.fc = nn.Linear(in_features, num_classes)
    return model

m = adapt_resnet(5)
trainable = sum(p.numel() for p in m.parameters() if p.requires_grad)
print("Trainable parameters:", trainable)
assert trainable == 512 * 5 + 5`,
    },
    summary: {
      keyTakeaways: [
        'Transfer learning repurposes deep backbones trained on massive datasets, slashing training time and data requirements.',
        'Always freeze the backbone during initial head training to avoid catastrophic forgetting.',
        'Use discriminative low learning rates (e.g. 1e-5) when fine-tuning unfrozen backbone blocks.',
      ],
      nextLessonId: 'dl-18-sequence-learning',
      nextLessonTitle: 'DL-18: Sequence Learning: RNNs, LSTMs & GRUs',
      nextLessonModuleId: 'dl-module-5',
    },
  },

  'dl-18-sequence-learning': {
    id: 'dl-18-sequence-learning',
    moduleId: 'dl-module-5',
    title: 'DL-18: Sequence Learning: RNNs, LSTMs & GRUs',
    subtitle: 'Recurrent Memory, Backpropagation Through Time & Gated Architectures',
    order: 3,
    readTimeMinutes: 30,
    difficulty: 'Advanced',
    visualizerType: 'none',
    objectives: [
      'Understand why feedforward networks fail on sequential data with temporal dependencies',
      'Trace Recurrent Neural Network (RNN) hidden state updates h_t = tanh(W_hh h_{t-1} + W_xh x_t + b)',
      'Analyze the Vanishing and Exploding Gradient problem in Backpropagation Through Time (BPTT)',
      'Deconstruct Long Short-Term Memory (LSTM) gates (Forget, Input, Cell Update, Output) and GRUs',
    ],
    prerequisites: ['DL-03: Activation Functions', 'DL-07: Backpropagation'],
    analogy: {
      title: 'The Film Strip Reader vs The Instant Polaroid',
      text: 'A feedforward network is like taking an instant Polaroid photograph: it evaluates each picture in total isolation, with zero memory of what happened 5 seconds ago. If you show it the word "bank", it cannot know whether it means a financial institution or a river edge. A Recurrent Neural Network is like watching a motion picture film strip: as each frame (time step t) rolls past, the projector updates a running notepad of working memory (hidden state h_t). What it thinks about the word "bank" depends on the preceding words stored in its notepad ("sat on the muddy...").',
      metaphor: 'Feedforward networks process independent samples; recurrent networks maintain a persistent internal state across time.',
    },
    problemSolved: {
      title: 'Handling Variable-Length Sequences and Temporal Context',
      description: 'Standard neural networks require fixed-size input vectors and cannot model temporal order or context. RNNs process sequences of arbitrary length by sharing the same weight matrix recursively across all time steps.',
      keyPoints: [
        'Weight Sharing Across Time: The exact same parameter matrices (W_xh, W_hh) are applied at every time step t.',
        'Persistent Memory: The hidden state h_t acts as a lossy summary of all past tokens x₁ through x_t.',
        'Gated Memory Highway: LSTMs introduce an additive Cell State c_t that allows error gradients to travel back across hundreds of time steps without decaying.',
      ],
    },
    intuition: {
      overview: 'An RNN unrolls across time steps: at each step t, it receives the current input x_t and previous hidden state h_{t-1}, producing updated state h_t and output y_hat_t.',
      steps: [
        { step: 1, title: 'Input Sequence Ingestion', description: 'Sequence [x₁, x₂, ..., x_T] is processed sequentially.' },
        { step: 2, title: 'Hidden State Update', description: 'h_t = tanh(W_xh x_t + W_hh h_{t-1} + b_h).' },
        { step: 3, title: 'BPTT Unrolling', description: 'During backpropagation, error gradients flow backward through time from step T to step 1.' },
        { step: 4, title: 'LSTM Gating', description: 'Forget gate f_t decides what to erase from memory; input gate i_t decides what to store; output gate o_t decides what to emit.' },
      ],
    },
    mathematics: {
      overview: 'Mathematical formulations of vanilla RNNs and Long Short-Term Memory (LSTM) cells.',
      foundations: [
        {
          name: 'Vanilla RNN Hidden State',
          latex: 'h_t = \\tanh\\left( W_{xh} x_t + W_{hh} h_{t-1} + b_h \\right)',
          explanation: 'Linear combination of current input x_t and previous hidden memory h_{t-1} squashed by tanh.',
        },
        {
          name: 'LSTM Forget Gate',
          latex: 'f_t = \\sigma\\left( W_f [h_{t-1}, x_t] + b_f \\right)',
          explanation: 'Sigmoid gate outputting values between 0 (completely erase) and 1 (completely preserve).',
        },
        {
          name: 'LSTM Cell State Update',
          latex: 'c_t = f_t \\odot c_{t-1} + i_t \\odot \\tilde{c}_t, \\quad \\tilde{c}_t = \\tanh\\left( W_c [h_{t-1}, x_t] + b_c \\right)',
          explanation: 'Linear additive memory highway that prevents gradients from vanishing during BPTT.',
        },
        {
          name: 'LSTM Hidden State Output',
          latex: 'h_t = o_t \\odot \\tanh(c_t), \\quad o_t = \\sigma\\left( W_o [h_{t-1}, x_t] + b_o \\right)',
          explanation: 'Filters the cell state through the output gate to produce the observable hidden representation.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Vanishing Gradient in Vanilla RNNs',
      objective: 'Prove why the gradient ∂L_T / ∂h_1 exponentially vanishes as sequence length T increases.',
      steps: [
        {
          step: 1,
          label: 'Chain Rule Across Time Steps',
          latex: '\\frac{\\partial L_T}{\\partial h_1} = \\frac{\\partial L_T}{\\partial h_T} \\prod_{t=2}^{T} \\frac{\\partial h_t}{\\partial h_{t-1}}',
          explanation: 'The total gradient is a continuous product of Jacobian matrices across all time steps.',
        },
        {
          step: 2,
          label: 'Single Step Jacobian Evaluation',
          latex: '\\frac{\\partial h_t}{\\partial h_{t-1}} = \\text{diag}\\left( 1 - h_t^2 \\right) W_{hh}^T',
          explanation: 'Derivative of tanh is bounded by 1.0, and often much less than 1.0.',
        },
        {
          step: 3,
          label: 'Repeated Matrix Powers',
          latex: '\\prod_{t=2}^{T} W_{hh}^T \\approx (W_{hh})^{T-1}',
          explanation: 'If the largest eigenvalue of W_hh is λ < 1, then λ^(T-1) -> 0 exponentially as T exceeds 20-30 tokens, completely wiping out long-term dependencies.',
        },
      ],
    },
    variables: [
      { symbol: 'x_t', name: 'Input Vector at Step t', description: 'Feature vector or token embedding at time t', dimensions: '(N, d_in)' },
      { symbol: 'h_t', name: 'Hidden State Vector', description: 'Recurrent working memory vector at time t', dimensions: '(N, d_hidden)' },
      { symbol: 'c_t', name: 'LSTM Cell State', description: 'Long-term memory conduit with linear additive updates', dimensions: '(N, d_hidden)' },
      { symbol: 'f_t, i_t, o_t', name: 'LSTM Gates', description: 'Forget, Input, and Output gating tensors', dimensions: '(N, d_hidden)' },
    ],
    numericalExample: {
      scenario: 'Calculating 1 step of an LSTM forget gate with h_{t-1} = 0.5, x_t = 1.0, W_f = [0.8, -0.4], b_f = -0.5.',
      dataset: [
        { h_prev: 0.5, x: 1.0, w_fh: 0.8, w_fx: -0.4, b_f: -0.5 },
      ],
      calculations: [
        { step: 'Linear combination z_f', math: '(0.5)(0.8) + (1.0)(-0.4) + (-0.5) = 0.4 - 0.4 - 0.5', result: '-0.50' },
        { step: 'Forget gate activation f_t', math: 'sigmoid(-0.50) = 1 / (1 + e^0.5) = 1 / (1 + 1.6487)', result: '0.3775' },
      ],
      finalConclusion: 'The forget gate outputs 0.3775, signaling the cell to retain 37.8% of past cell memory c_{t-1} and discard 62.2%.',
    },
    visualExplanation: {
      title: 'LSTM Memory Cell Architecture',
      description: 'The horizontal cell state line across the top acts as a conveyer belt running straight down the entire sequence with minor linear interactions.',
      features: [
        'Forget Gate: Erases obsolete history using pointwise multiplication by f_t.',
        'Input Gate: Modulates candidate memory i_t ⊙ c_tilde_t to write new facts.',
        'Additive Cell Update: c_t = f_t ⊙ c_{t-1} + i_t ⊙ c_tilde_t guarantees gradient preservation.',
      ],
    },
    scratchCode: {
      title: 'Vanilla RNN Forward Pass Unrolled in Pure NumPy',
      code: `import numpy as np

def rnn_forward(X_seq, W_xh, W_hh, b_h):
    # X_seq shape: (T_steps, N_batch, D_in)
    T, N, D = X_seq.shape
    H_dim = W_hh.shape[0]
    
    # Store hidden states for all time steps
    h_states = np.zeros((T + 1, N, H_dim))
    
    for t in range(T):
        x_t = X_seq[t]
        h_prev = h_states[t]
        # h_t = tanh(x_t @ W_xh + h_prev @ W_hh + b_h)
        h_next = np.tanh(x_t @ W_xh + h_prev @ W_hh + b_h)
        h_states[t + 1] = h_next
        
    return h_states[1:] # Discard initial zero state

# Simulate sequence of 5 time steps, batch of 2, 3 input features
T_steps, N_batch, D_in, H_dim = 5, 2, 3, 4
X = np.random.randn(T_steps, N_batch, D_in)

W_xh = np.random.randn(D_in, H_dim) * 0.1
W_hh = np.random.randn(H_dim, H_dim) * 0.1
b_h = np.zeros((1, H_dim))

all_h = rnn_forward(X, W_xh, W_hh, b_h)
print("Unrolled hidden states shape (T, N, H):", all_h.shape)
print("Final hidden state h_T:\\n", np.round(all_h[-1], 4))`,
      explanation: 'Executes recurrent sequence propagation unrolling across T time steps using pure matrix operations.',
    },
    sklearnCode: {
      title: 'PyTorch nn.LSTM and nn.GRU Modules',
      code: `import torch
import torch.nn as nn

# Sequence: batch_size=4, seq_len=10, input_dim=8
x_seq = torch.randn(4, 10, 8)

# PyTorch LSTM with batch_first=True
lstm = nn.LSTM(input_size=8, hidden_size=16, num_layers=2, batch_first=True, dropout=0.2)
output_seq, (h_n, c_n) = lstm(x_seq)

print("LSTM output_seq shape (N, T, H):", output_seq.shape)
print("Final hidden state h_n shape:   ", h_n.shape)
print("Final cell state c_n shape:     ", c_n.shape)

# PyTorch GRU (Gated Recurrent Unit - simpler, no separate cell state)
gru = nn.GRU(input_size=8, hidden_size=16, batch_first=True)
gru_out, gru_hn = gru(x_seq)
print("GRU output shape:               ", gru_out.shape)`,
      explanation: 'PyTorch provides highly optimized cuDNN-accelerated LSTM and GRU modules that process temporal sequences in parallel.',
    },
    runnableCode: {
      code: `import torch
import torch.nn as nn

# Demonstrate RNN hidden state progression
rnn = nn.RNN(input_size=2, hidden_size=3, batch_first=True)
# 1 sequence with 3 time steps
x = torch.tensor([[[1.0, 0.0], [0.0, 1.0], [1.0, 1.0]]])

out, h_final = rnn(x)
print("All hidden states across 3 time steps:\\n", out.detach())
print("Final hidden state matches out[:, -1, :]:", torch.allclose(out[:, -1, :], h_final[0]))`,
      expectedOutput: 'All hidden states across 3 time steps:\n tensor([[[...]]])\nFinal hidden state matches out[:, -1, :]: True',
    },
    lineByLineExplanation: [
      { lines: '5', codeSnippet: 'rnn = nn.RNN(input_size=2, hidden_size=3, batch_first=True)', explanation: 'Instantiates a single-layer recurrent neural network.' },
      { lines: '7', codeSnippet: 'x = torch.tensor([[[1.0, 0.0], ...]])', explanation: 'Creates a sequence of 3 consecutive 2-dimensional tokens.' },
      { lines: '11', codeSnippet: 'print(torch.allclose(out[:, -1, :], h_final[0]))', explanation: 'Confirms that the last slice of the sequence output is identically the final hidden state.' },
    ],
    hyperparameters: [
      { name: 'hidden_size', defaultVal: '128', range: '32 to 512', effect: 'Dimensionality of the recurrent memory vector', recommendation: '128 or 256 for time-series forecasting.' },
      { name: 'num_layers', defaultVal: '1', range: '1 to 4', effect: 'Number of stacked recurrent layers', recommendation: '2 layers is usually optimal; deeper RNNs are prone to severe vanishing gradients.' },
    ],
    assumptions: [
      { assumption: 'Sequential Temporal Causality', whyItMatters: 'Standard unidirectional RNNs assume step t can only access past context [0 ... t-1]. If future context is available, bidirectional RNNs (BiLSTM) should be used.', howToVerify: 'Check if inference happens in real time (unidirectional) or offline over full files (bidirectional).' },
    ],
    commonMistakes: [
      { mistake: 'Forgetting `batch_first=True` in PyTorch RNN/LSTM', whyWrong: 'PyTorch historically defaults to (SeqLen, Batch, Dim). Forgetting batch_first=True silently transposes batch and sequence dimensions, corrupting training.', howToFix: 'Always declare batch_first=True.', solution: 'nn.LSTM(in_dim, hidden_dim, batch_first=True)' },
      { mistake: 'Using Vanilla RNNs on sequences longer than 20 tokens', whyWrong: 'Vanilla RNNs suffer from exponential vanishing gradients, completely losing memory of tokens beyond 10-15 steps.', howToFix: 'Use LSTM, GRU, or Transformers.', solution: 'nn.LSTM(...)' },
    ],
    realWorldUseCases: [
      { industry: 'Quantitative Finance', application: 'High-Frequency Stock Volatility Forecasting', benefit: 'LSTMs model autocorrelations and seasonal lag dynamics in non-stationary financial time series.' },
      { industry: 'Industrial IoT & Energy', application: 'Wind Turbine Predictive Maintenance', benefit: 'Ingests vibration sensor telemetry streams to detect mechanical bearing failure hours before catastrophic breakdown.' },
      { industry: 'Healthcare Monitoring', application: 'ICU Patient Sepsis Prediction', benefit: 'Processes multi-hour vital sign sequences (heart rate, blood pressure, oxygen) with variable sampling rates.' },
    ],
    practiceQuestions: [
      { id: 'dl18-q1', question: 'What specific architectural feature in LSTMs prevents vanishing gradients along the time dimension?', hint: 'Look at the cell state update equation.', answer: 'The additive Cell State update: c_t = f_t ⊙ c_{t-1} + i_t ⊙ c_tilde_t. Because the interaction is additive rather than a chain of matrix multiplications, gradients can flow straight back across time without decaying exponentially.', explanation: 'The error gradient has a direct linear conduit back through time.' },
      { id: 'dl18-q2', question: 'What is the primary difference between an LSTM and a GRU (Gated Recurrent Unit)?', hint: 'Count the gates and memory states.', answer: 'A GRU merges the cell state and hidden state into a single vector and uses only 2 gates (Reset and Update) instead of 3 gates, making it computationally faster with fewer parameters while maintaining comparable performance.', explanation: 'GRU is a lightweight modern variant of LSTM.' },
    ],
    quiz: [
      {
        id: 'dl18-qz1',
        question: 'Why do vanilla Recurrent Neural Networks fail to learn dependencies across long sequences (>30 steps)?',
        options: [
          'Because computers run out of disk space',
          'Because backpropagating through time involves repeated matrix multiplication by W_hh, causing gradients to exponentially vanish or explode',
          'Because RNNs can only process integers',
          'Because sequences can only be 10 tokens long',
        ],
        correctIndex: 1,
        explanation: 'Repeated multiplication by W_hh and tanh slopes < 1 over dozens of time steps shrinks the gradient to zero.',
      },
      {
        id: 'dl18-qz2',
        question: 'What is the role of the Forget Gate in an LSTM cell?',
        options: [
          'It forgets the model weights and resets them to zero',
          'It outputs values between 0 and 1 via Sigmoid to decide which portions of the previous cell state c_{t-1} to discard',
          'It deletes the training dataset',
          'It shuts down the GPU',
        ],
        correctIndex: 1,
        explanation: 'The forget gate f_t = σ(W_f [h_{t-1}, x_t] + b_f) modulates what information should be erased from the cell state.',
      },
      {
        id: 'dl18-qz3',
        question: 'What does `batch_first=True` signify in PyTorch recurrent modules?',
        options: [
          'The input tensor has shape (Batch, SequenceLength, Features) instead of (SequenceLength, Batch, Features)',
          'It trains the first batch 10x faster',
          'It runs on CPU only',
          'It sorts the batch alphabetically',
        ],
        correctIndex: 0,
        explanation: 'batch_first=True aligns tensor dimensions with standard PyTorch convention (N, T, D) rather than legacy (T, N, D).',
      },
    ],
    independentExercise: {
      id: 'dl18-ex',
      title: 'Extract Sequence Embeddings from a BiLSTM',
      problem: 'Instantiate a PyTorch `nn.LSTM(input_size=10, hidden_size=20, batch_first=True, bidirectional=True)`. Pass a random tensor of shape (2, 5, 10) through it and verify that the output feature dimension is 40 (2 * hidden_size).',
      hints: ['Bidirectional LSTMs concatenate forward and backward hidden states, doubling output size.'],
      starterCode: `import torch
import torch.nn as nn

# Instantiate BiLSTM and print output shape
`,
      solution: `import torch
import torch.nn as nn

bilstm = nn.LSTM(input_size=10, hidden_size=20, batch_first=True, bidirectional=True)
x = torch.randn(2, 5, 10)
out, (hn, cn) = bilstm(x)

print("BiLSTM Output shape:", out.shape)
assert out.shape == (2, 5, 40)
print("Verified: bidirectional doubles hidden dimension to 40!")`,
    },
    summary: {
      keyTakeaways: [
        'Recurrent architectures share weights across time steps to process variable-length sequential data.',
        'LSTMs solve vanishing gradients through time via an additive linear Cell State conduit and gating mechanisms.',
        'Always set batch_first=True in PyTorch recurrent models to avoid dimension permutation bugs.',
      ],
      nextLessonId: 'dl-19-attention-fundamentals',
      nextLessonTitle: 'DL-19: Attention Fundamentals',
      nextLessonModuleId: 'dl-module-5',
    },
  },

  'dl-19-attention-fundamentals': {
    id: 'dl-19-attention-fundamentals',
    moduleId: 'dl-module-5',
    title: 'DL-19: Attention Fundamentals',
    subtitle: 'Breaking the Sequential Bottleneck: Queries, Keys, Values & Scaled Dot Products',
    order: 4,
    readTimeMinutes: 32,
    difficulty: 'Advanced',
    visualizerType: 'attention-explorer',
    objectives: [
      'Identify the fundamental information bottleneck of Recurrent Neural Networks: compressing an entire history into a single vector h_t',
      'Understand the Query (Q), Key (K), and Value (V) retrieval analogy inspired by database search',
      'Derive the Scaled Dot-Product Attention formula: Attention(Q, K, V) = softmax(Q Kᵀ / √d_k) V',
      'Use the interactive Attention Explorer to inspect attention matrices, temperature scaling, and context vectors over ["AI", "learns", "fast"]',
    ],
    prerequisites: ['DL-18: Sequence Learning: RNNs, LSTMs & GRUs', 'Matrix multiplication and Softmax'],
    analogy: {
      title: 'The Database Query vs The Crowded Filing Cabinet',
      text: 'An RNN is like an office clerk with a tiny desk: every time a new document arrives, he shreds it and scribbles an updated summary on a single sticky note (h_t). By document 50, the sticky note is an illegible smudge. Attention gives the clerk a giant digital database: every document is filed with a descriptive tag (Key K) and its full content (Value V). When the clerk needs information to answer a question (Query Q), he computes how relevant every tag is to his question via a dot product (QKᵀ), applies Softmax to calculate attention weights, and pulls a weighted blend of the actual documents (V).',
      metaphor: 'RNNs force information through a single bottleneck vector; Attention allows direct random-access retrieval across all tokens.',
    },
    problemSolved: {
      title: 'The Information Bottleneck and Sequential Compute Stall',
      description: 'LSTMs must process tokens sequentially (t=1, then t=2, then t=3): this sequential dependency makes parallelization impossible on modern GPUs. Furthermore, compressing a 1,000-word sentence into a fixed 512-dim vector causes catastrophic information loss. Attention solves both problems: it connects all pairs of tokens with O(1) path length and runs entirely via parallel matrix multiplications.',
      keyPoints: [
        'Direct Token-to-Token Connections: Maximum signal path length is O(1) regardless of sequence distance.',
        'Massive GPU Parallelization: Entire sequences are processed simultaneously via tensor multiplications without temporal loops.',
        'Interpretability: The attention matrix Softmax(QKᵀ / √d_k) provides a transparent visual heatmap of which words attend to which other words.',
      ],
    },
    intuition: {
      overview: 'Self-attention allows every token in a sentence to look at every other token in the sentence, calculate semantic affinity, and extract relevant contextual information.',
      steps: [
        { step: 1, title: 'Linear Projections', description: 'Input embeddings X are multiplied by weight matrices W_Q, W_K, W_V to produce Query (Q), Key (K), and Value (V) tensors.' },
        { step: 2, title: 'Affinity Matrix', description: 'Compute raw dot products between all Queries and Keys: S = Q Kᵀ.' },
        { step: 3, title: 'Temperature Scaling', description: 'Divide scores by √d_k to prevent Softmax saturation on large embedding dimensions.' },
        { step: 4, title: 'Softmax Attention Weights', description: 'Apply Softmax along rows: A = softmax(S / √d_k) to yield normalized percentage weights summing to 1.0.' },
        { step: 5, title: 'Context Aggregation', description: 'Multiply attention weights by Values: Output = A · V.' },
      ],
    },
    mathematics: {
      overview: 'The iconic Scaled Dot-Product Attention equation (Vaswani et al. 2017).',
      foundations: [
        {
          name: 'Scaled Dot-Product Attention',
          latex: '\\text{Attention}(Q, K, V) = \\text{softmax}\\left( \\frac{Q K^T}{\\sqrt{d_k}} \\right) V',
          explanation: 'Q, K, V are matrices of shape (T, d_k), (T, d_k), and (T, d_v). The softmax output is a (T x T) attention weight matrix.',
        },
        {
          name: 'Variance of Dot Product',
          latex: 'q_i, k_i \\sim \\mathcal{N}(0, 1) \\implies \\text{Var}\\left( \\sum_{i=1}^{d_k} q_i k_i \\right) = d_k',
          explanation: 'The dot product of two d_k-dimensional standard normal vectors has variance d_k and standard deviation √d_k. Dividing by √d_k scales variance back to 1.0.',
        },
      ],
    },
    derivation: {
      title: 'Why the Scaling Factor √d_k Is Mathematically Essential',
      objective: 'Prove why omitting √d_k causes vanishing gradients in the Softmax function for large embedding dimensions.',
      steps: [
        {
          step: 1,
          label: 'Variance of Unscaled Dot Products',
          latex: 'q \\cdot k = \\sum_{i=1}^{d_k} q_i k_i \\implies \\text{Var}(q \\cdot k) = d_k',
          explanation: 'For modern LLMs where d_k = 128, the dot products have standard deviation sqrt(128) ≈ 11.3.',
        },
        {
          step: 2,
          label: 'Softmax Saturation Dynamics',
          latex: 'z_i \\sim \\pm 15 \\implies \\text{softmax}(\\mathbf{z}) \\approx [0, 0, ..., 1, ..., 0]',
          explanation: 'When inputs to Softmax are large in magnitude, Softmax outputs a sharp one-hot distribution.',
        },
        {
          step: 3,
          label: 'Vanishing Gradient Consequence',
          latex: '\\frac{\\partial \\text{softmax}_i}{\\partial z_j} = s_i (\\delta_{ij} - s_j) \\approx 0 \\text{ when } s_i \\in \\{0, 1\\}',
          explanation: 'In the saturated region, the gradient of Softmax vanishes to zero, freezing learning. Dividing by √d_k scales variance to 1.0, preserving healthy gradients.',
        },
      ],
    },
    variables: [
      { symbol: 'Q', name: 'Query Matrix', description: '"What am I looking for?" representation of tokens', dimensions: '(T, d_k)' },
      { symbol: 'K', name: 'Key Matrix', description: '"What information do I have?" representation of tokens', dimensions: '(T, d_k)' },
      { symbol: 'V', name: 'Value Matrix', description: 'The actual semantic content extracted by attention', dimensions: '(T, d_v)' },
      { symbol: 'd_k', name: 'Key / Query Dimension', description: 'Dimensionality of projection space (e.g. 64 or 128)', dimensions: 'Scalar integer' },
      { symbol: 'A', name: 'Attention Weight Heatmap', description: 'Softmax probabilities indicating token-to-token affinity', dimensions: '(T, T)' },
    ],
    numericalExample: {
      scenario: 'Computing self-attention for 2 tokens with d_k = 2. Q = [[1, 0], [0, 2]], K = [[1, 0], [0, 1]], V = [[2, 1], [0, 3]].',
      dataset: [
        { token: 'Token 1', q: '[1, 0]', k: '[1, 0]', v: '[2, 1]' },
        { token: 'Token 2', q: '[0, 2]', k: '[0, 1]', v: '[0, 3]' },
      ],
      calculations: [
        { step: 'Raw Dot Products QK^T', math: '[[1*1 + 0*0, 1*0 + 0*1], [0*1 + 2*0, 0*0 + 2*1]]', result: '[[1.0, 0.0], [0.0, 2.0]]' },
        { step: 'Scale by sqrt(2) = 1.414', math: '[[1/1.414, 0], [0, 2/1.414]] = [[0.707, 0], [0, 1.414]]', result: '[[0.707, 0.0], [0.0, 1.414]]' },
        { step: 'Softmax Row 1', math: 'exp([0.707, 0]) = [2.028, 1.0]; sum = 3.028 -> [2.028/3.028, 1/3.028]', result: '[0.67, 0.33]' },
        { step: 'Output Context Token 1', math: '0.67 * [2, 1] + 0.33 * [0, 3] = [1.34, 0.67] + [0, 0.99]', result: '[1.34, 1.66]' },
      ],
      finalConclusion: 'Token 1 attends 67% to itself and 33% to Token 2, producing an enriched context vector [1.34, 1.66].',
    },
    visualExplanation: {
      title: 'Interactive Scaled Dot-Product Self-Attention Explorer',
      description: 'The visualizer above simulates scaled dot-product attention on a 3-token sequence ["AI", "learns", "fast"].',
      features: [
        'Inspect the 3×3 Softmax Attention Weight Heatmap showing pairwise affinities.',
        'Click on any token ("AI", "learns", "fast") to observe its exact percentage attention distribution across all tokens.',
        'View the enriched Context Vector output resulting from weighting Values V by attention weights.',
      ],
    },
    scratchCode: {
      title: 'Scaled Dot-Product Attention in Pure NumPy',
      code: `import numpy as np

def scaled_dot_product_attention(Q, K, V, mask=None):
    # Q, K, V shapes: (T, d_k)
    d_k = Q.shape[-1]
    
    # 1. Compute raw dot products: S = Q @ K.T
    scores = Q @ K.T
    
    # 2. Scale by sqrt(d_k)
    scores = scores / np.sqrt(d_k)
    
    # 3. Optional masking (for decoder autoregressive generation)
    if mask is not None:
        scores = np.where(mask == 0, -1e9, scores)
        
    # 4. Softmax over last dimension (rows)
    exp_scores = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
    attention_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)
    
    # 5. Output = AttentionWeights @ V
    output = attention_weights @ V
    return output, attention_weights

# Test with 3 tokens, embedding dimension 4
tokens = ["AI", "learns", "fast"]
T, d_k = len(tokens), 4
np.random.seed(42)

Q = np.random.randn(T, d_k)
K = np.random.randn(T, d_k)
V = np.random.randn(T, d_k)

out, weights = scaled_dot_product_attention(Q, K, V)
print("Attention Weight Matrix (3x3):\\n", np.round(weights, 3))
print("Row sums (must equal 1.0):", np.sum(weights, axis=-1))
print("Context Output shape:", out.shape)`,
      explanation: 'Clean vectorized implementation of scaled dot-product attention in 20 lines of pure NumPy.',
    },
    sklearnCode: {
      title: 'PyTorch MultiheadAttention and SDPA Function',
      code: `import torch
import torch.nn as nn
import torch.nn.functional as F

# Batch of 2 sentences, 4 tokens each, embedding dim 8
batch_size, seq_len, embed_dim = 2, 4, 8
x = torch.randn(batch_size, seq_len, embed_dim)

# 1. PyTorch 2.0+ Scaled Dot-Product Attention (FlashAttention kernel accelerated)
q = k = v = x
out_sdpa = F.scaled_dot_product_attention(q, k, v)
print("F.scaled_dot_product_attention output shape:", out_sdpa.shape)

# 2. Standard nn.MultiheadAttention Module
mha = nn.MultiheadAttention(embed_dim=embed_dim, num_heads=2, batch_first=True)
attn_output, attn_weights = mha(x, x, x)
print("nn.MultiheadAttention output shape:         ", attn_output.shape)`,
      explanation: 'In PyTorch 2.0+, F.scaled_dot_product_attention fuses matrix multiplications and softmax into hardware-accelerated GPU kernels (FlashAttention), saving memory and accelerating execution by 3x.',
    },
    runnableCode: {
      code: `import torch
import torch.nn.functional as F

# Demonstrate impact of temperature scaling
d_k = 64
q = torch.randn(1, 4, d_k)
k = torch.randn(1, 4, d_k)

raw_scores = torch.matmul(q, k.transpose(-2, -1))
scaled_scores = raw_scores / (d_k ** 0.5)

raw_softmax = F.softmax(raw_scores, dim=-1)
scaled_softmax = F.softmax(scaled_scores, dim=-1)

print("Raw scores std:   ", raw_scores.std().item())
print("Scaled scores std:", scaled_scores.std().item(), "(Normalized to ~1.0!)")
print("Raw Softmax entropy (peaked):   ", -(raw_softmax * torch.log(raw_softmax + 1e-9)).sum().item())
print("Scaled Softmax entropy (healthy):", -(scaled_softmax * torch.log(scaled_softmax + 1e-9)).sum().item())`,
      expectedOutput: 'Raw scores std:    ...\nScaled scores std: ... (Normalized to ~1.0!)\nRaw Softmax entropy (peaked):    ...\nScaled Softmax entropy (healthy): ...',
    },
    lineByLineExplanation: [
      { lines: '4-6', codeSnippet: 'd_k = 64; q = torch.randn(1, 4, d_k); k = torch.randn(1, 4, d_k)', explanation: 'Creates Query and Key tensors with dimension 64.' },
      { lines: '8-9', codeSnippet: 'raw_scores = ...; scaled_scores = raw_scores / (d_k ** 0.5)', explanation: 'Computes unscaled vs scaled attention affinity matrices.' },
      { lines: '11-12', codeSnippet: 'raw_softmax = ...; scaled_softmax = ...', explanation: 'Demonstrates that scaling prevents the Softmax distribution from collapsing into a saturated one-hot state.' },
    ],
    hyperparameters: [
      { name: 'num_heads', defaultVal: '8', range: '4 to 32', effect: 'Number of parallel attention heads in Multi-Head Attention', recommendation: '8 heads with head_dim=64 yields 512 total embedding dimensions.' },
      { name: 'dropout', defaultVal: '0.1', range: '0.0 to 0.2', effect: 'Dropout applied to attention weights to prevent co-adaptation', recommendation: '0.1 during pretraining; 0.0 during inference.' },
    ],
    assumptions: [
      { assumption: 'Permutation Equivariance', whyItMatters: 'Dot-product attention has no intrinsic notion of word order. Without adding Positional Encodings to input embeddings, "dog bites man" and "man bites dog" produce identical attention weights.', howToVerify: 'Always add sinusoidal or rotary (RoPE) positional encodings to token embeddings.' },
    ],
    commonMistakes: [
      { mistake: 'Forgetting the scaling factor 1 / sqrt(d_k)', whyWrong: 'Large embedding dimensions cause dot products to grow into tens or hundreds, pushing Softmax into saturated zero-gradient regions.', howToFix: 'Always divide QK^T by sqrt(d_k).', solution: 'scores = (Q @ K.T) / np.sqrt(d_k)' },
      { mistake: 'Forgetting to add Positional Encodings to inputs', whyWrong: 'Without positional information, the Transformer acts as a set-processing model (Bag-of-Words) and cannot understand grammar or sequence order.', howToFix: 'Add positional embeddings before the first attention layer.', solution: 'x = token_embeddings + pos_embeddings' },
    ],
    realWorldUseCases: [
      { industry: 'Large Language Models', application: 'GPT-4 & Claude Transformer Decoders', benefit: 'Self-attention powers autoregressive next-token prediction across 128k token context windows.' },
      { industry: 'Vision Transformers (ViT)', application: 'Image Classification without Convolutions', benefit: 'Splits images into 16x16 patches and applies self-attention across patches to capture global relationships.' },
      { industry: 'Protein Folding', application: 'AlphaFold Evoformer Blocks', benefit: 'Attention across amino acid sequence pairs uncovers 3D evolutionary contact constraints.' },
    ],
    practiceQuestions: [
      { id: 'dl19-q1', question: 'What is the role of the Query, Key, and Value vectors in self-attention?', hint: 'Recall the search engine database analogy.', answer: 'The Query represents what the current token is searching for; the Key represents what attributes each token has; their dot product computes relevance weights; the Value is the actual semantic content extracted based on those weights.', explanation: 'It is a soft, differentiable content-based retrieval mechanism.' },
      { id: 'dl19-q2', question: 'Why does self-attention have an O(N²) computational complexity with respect to sequence length N?', hint: 'How many pairwise dot products are computed in QKᵀ?', answer: 'Every token computes a dot product with every other token in the sequence, producing an N x N matrix of attention scores.', explanation: 'For sequence length N=10,000, N² is 100,000,000 elements, requiring FlashAttention or linear attention approximations.' },
    ],
    quiz: [
      {
        id: 'dl19-qz1',
        question: 'What is the formula for Scaled Dot-Product Attention introduced by Vaswani et al. in 2017?',
        options: [
          'Attention(Q, K, V) = ReLU(Q + K) · V',
          'Attention(Q, K, V) = softmax(Q Kᵀ / √d_k) V',
          'Attention(Q, K, V) = (Q · K) / V',
          'Attention(Q, K, V) = tanh(W_hh h + W_xh x)',
        ],
        correctIndex: 1,
        explanation: 'Scaled Dot-Product Attention multiplies Queries and Keys, scales by √d_k, applies Softmax along rows, and aggregates Values: softmax(QKᵀ / √d_k) V.',
      },
      {
        id: 'dl19-qz2',
        question: 'Why must we divide the dot product QKᵀ by √d_k?',
        options: [
          'To ensure the matrix is invertible',
          'To normalize the variance of the dot products to 1.0, preventing Softmax from saturating into regions with vanishing gradients',
          'To convert floating point numbers to integers',
          'To delete stop words from sentences',
        ],
        correctIndex: 1,
        explanation: 'When d_k is large, dot products grow large in magnitude, pushing Softmax into saturated flat zones where gradients vanish. Dividing by √d_k solves this.',
      },
      {
        id: 'dl19-qz3',
        question: 'Why are Positional Encodings strictly required in Transformer architectures?',
        options: [
          'Because Transformers cannot process negative numbers',
          'Because Self-Attention is permutation-equivariant; without positional encodings, the model has no awareness of word order or sequence position',
          'To make the model run on GPU',
          'To compress the text file size',
        ],
        correctIndex: 1,
        explanation: 'Attention treats tokens as an unordered set; positional encodings inject position information so the model can distinguish word order.',
      },
    ],
    independentExercise: {
      id: 'dl19-ex',
      title: 'Compute Attention Weights by Hand in Python',
      problem: 'Write a Python function `get_attention_weights(Q, K)` that computes softmax(Q @ K.T / sqrt(d_k)) for Q and K of shape (2, 4) and verifies that each row sums to 1.0.',
      hints: ['Use np.exp and divide by row sums np.sum(..., axis=-1, keepdims=True).'],
      starterCode: `import numpy as np

def get_attention_weights(Q, K):
    pass

Q = np.random.randn(2, 4)
K = np.random.randn(2, 4)
`,
      solution: `import numpy as np

def get_attention_weights(Q, K):
    d_k = Q.shape[-1]
    scores = (Q @ K.T) / np.sqrt(d_k)
    exp_s = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
    weights = exp_s / np.sum(exp_s, axis=-1, keepdims=True)
    return weights

Q = np.random.randn(2, 4)
K = np.random.randn(2, 4)
W = get_attention_weights(Q, K)
print("Attention weights:\\n", np.round(W, 4))
print("Row sums:", np.sum(W, axis=-1))
assert np.allclose(np.sum(W, axis=-1), [1.0, 1.0])`,
    },
    summary: {
      keyTakeaways: [
        'Attention eliminates the sequential bottleneck of RNNs by connecting all tokens with O(1) path length.',
        'Scaled dot-product formula: Attention(Q, K, V) = softmax(QKᵀ / √d_k) V.',
        'Scaling by √d_k prevents Softmax saturation and vanishing gradients on large embedding dimensions.',
      ],
      nextLessonId: 'dl-20-deep-learning-evaluation',
      nextLessonTitle: 'DL-20: Deep Learning Evaluation & Diagnostics',
      nextLessonModuleId: 'dl-module-6',
    },
  },
};
