import { ModuleData, LessonContent } from '@/lib/types';

export const dlModule3Data: ModuleData = {
  id: 'dl-module-3',
  number: 3,
  title: 'Deep Regularization, Initialization & Tuning',
  subtitle: 'Bias-Variance Dynamics, Normalization Layers & Hyperparameter Optimization',
  description:
    'Equip deep neural networks for robust generalization: diagnosis of underfitting vs overfitting, L1/L2 weight decay, Dropout, Early Stopping, Xavier/He initialization, Batch Normalization, Layer Normalization, and controlled hyperparameter tuning protocols.',
  icon: 'ShieldCheck',
  badge: 'Phase 3 · Deep Learning',
  estimatedHours: 12,
  topicsCount: 3,
  lessons: [
    {
      id: 'dl-10-regularization',
      moduleId: 'dl-module-3',
      title: 'DL-10: Overfitting and Regularization',
      description: 'Bias-variance tradeoff, L1/L2 weight decay, inverted Dropout, early stopping, data augmentation, and generalization gap inspection.',
      order: 1,
      readTimeMinutes: 28,
      visualizerType: 'overfitting-explorer',
      difficulty: 'Intermediate',
    },
    {
      id: 'dl-11-initialization-normalization',
      moduleId: 'dl-module-3',
      title: 'DL-11: Weight Initialization & Normalization',
      description: 'Xavier/Glorot and He/Kaiming variance derivations, Internal Covariate Shift, Batch Normalization, and Layer Normalization.',
      order: 2,
      readTimeMinutes: 30,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'dl-12-hyperparameter-tuning',
      moduleId: 'dl-module-3',
      title: 'DL-12: Hyperparameter Tuning & Experimentation',
      description: 'Learning rate schedules (cosine annealing, warmup), batch size scaling rules, grid vs random vs Bayesian search, and controlled experiments.',
      order: 3,
      readTimeMinutes: 26,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
  ],
};

export const dlModule3Lessons: Record<string, LessonContent> = {
  'dl-10-regularization': {
    id: 'dl-10-regularization',
    moduleId: 'dl-module-3',
    title: 'DL-10: Overfitting and Regularization',
    subtitle: 'Taming High Variance: Weight Decay, Inverted Dropout & Early Stopping',
    order: 1,
    readTimeMinutes: 28,
    difficulty: 'Intermediate',
    visualizerType: 'overfitting-explorer',
    objectives: [
      'Diagnose High Bias (Underfitting) vs High Variance (Overfitting) from training and validation loss curves',
      'Derive L2 regularization (weight decay) and explain how it prevents extreme decision boundaries',
      'Understand Inverted Dropout and why scaling by 1/(1-p) during training keeps inference deterministic',
      'Use the interactive Overfitting Explorer to manipulate capacity, Dropout, and L2 regularization',
    ],
    prerequisites: ['DL-08: Gradient Descent and Optimizers', 'DL-09: Training a Neural Network'],
    analogy: {
      title: 'The Exam Crammer vs The Master Thinker',
      text: 'Imagine a student studying for a biology exam. The crammer memorizes every specific practice question down to the comma and punctuation (overfitting): he gets 100% on the practice test, but scores 50% on the real exam because the phrasing changed slightly. The master thinker is forced to study under restrictions: the teacher randomly blacks out 30% of his study notes every day (Dropout) and penalizes overly convoluted explanations (Weight Decay). This forces the student to learn robust, general underlying principles that transfer effortlessly to new test problems.',
      metaphor: 'Overfitting is memorizing the sample noise; regularization is forcing the network to learn simple, general rules.',
    },
    problemSolved: {
      title: 'Controlling Vast Representational Capacity',
      description: 'Deep neural networks possess millions or billions of parameters, easily capable of memorizing every training label even if labels are randomized noise (Zhang et al. 2016). Regularization techniques constrain the effective model complexity so the network learns genuine patterns rather than noise.',
      keyPoints: [
        'Weight Decay (L2): Pulls weights towards zero, smoothing decision surfaces and suppressing extreme sensitivities.',
        'Inverted Dropout: Randomly deactivates neurons with probability p on each forward pass, training an implicit ensemble of 2ᴺ thinned sub-networks.',
        'Early Stopping: Halts training when validation loss stops improving, preserving the model at peak generalization.',
      ],
    },
    intuition: {
      overview: 'Regularization modifies the learning process to penalize complexity, inject noise, or halt optimization before the model begins memorizing training quirks.',
      steps: [
        { step: 1, title: 'Loss Penalty', description: 'Augment the loss objective: L_total = L_data + λ R(w).' },
        { step: 2, title: 'Activation Thinning', description: 'During each training pass, randomly drop a fraction p of hidden neuron outputs.' },
        { step: 3, title: 'Validation Tracking', description: 'Evaluate validation loss at the end of every epoch.' },
        { step: 4, title: 'Early Stop Check', description: 'If validation loss fails to reach a new minimum within a patience window (e.g. 5 epochs), stop training.' },
      ],
    },
    mathematics: {
      overview: 'Mathematical formulations of L1, L2, and Inverted Dropout regularization.',
      foundations: [
        {
          name: 'L2 Regularization (Ridge / Weight Decay)',
          latex: 'L_{\\text{reg}} = L_0 + \\frac{\\lambda}{2} \\sum_{l} \\|W^{(l)}\\|_F^2 = L_0 + \\frac{\\lambda}{2} \\sum_{i,j} w_{ij}^2',
          explanation: 'Adds the squared Frobenius norm of all weight matrices scaled by hyperparameter λ.',
        },
        {
          name: 'L2 Weight Shrinkage Gradient',
          latex: 'w_{t+1} = w_t - \\alpha \\left( \\frac{\\partial L_0}{\\partial w_t} + \\lambda w_t \\right) = (1 - \\alpha \\lambda) w_t - \\alpha \\frac{\\partial L_0}{\\partial w_t}',
          explanation: 'On every step, weight w_t is first shrunk by factor (1 - αλ) before the gradient update is subtracted.',
        },
        {
          name: 'Inverted Dropout Forward Formulation',
          latex: 'm \\sim \\text{Bernoulli}(1 - p), \\quad a_{\\text{dropped}} = \\frac{1}{1-p} \\cdot (a \\odot m)',
          explanation: 'Scaling by 1/(1-p) during training guarantees that expected activations remain identical during test time.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Weight Shrinkage Equivalence',
      objective: 'Prove that adding an L2 penalty to the loss function is mathematically equivalent to shrinking weights by (1 - αλ) at each step.',
      steps: [
        {
          step: 1,
          label: 'Regularized Loss Formulation',
          latex: 'L(w) = L_0(w) + \\frac{\\lambda}{2} w^2',
          explanation: 'L₀ is the original data loss (e.g. Cross-Entropy).',
        },
        {
          step: 2,
          label: 'Taking Derivative with Respect to w',
          latex: '\\frac{\\partial L}{\\partial w} = \\frac{\\partial L_0}{\\partial w} + \\frac{\\lambda}{2} \\cdot (2w) = \\frac{\\partial L_0}{\\partial w} + \\lambda w',
          explanation: 'The power rule differentiates the squared weight penalty cleanly into λw.',
        },
        {
          step: 3,
          label: 'Gradient Descent Update Substitution',
          latex: 'w_{new} = w - \\alpha \\frac{\\partial L}{\\partial w} = w - \\alpha \\left( \\frac{\\partial L_0}{\\partial w} + \\lambda w \\right) = w - \\alpha \\lambda w - \\alpha \\frac{\\partial L_0}{\\partial w} = (1 - \\alpha \\lambda) w - \\alpha \\frac{\\partial L_0}{\\partial w}',
          explanation: 'Because αλ is a small positive quantity, (1 - αλ) < 1, which continually decays the weight magnitude toward zero on every step.',
        },
      ],
    },
    variables: [
      { symbol: '\\lambda', name: 'Weight Decay Coefficient', description: 'Strength of the L2 penalty hyperparameter', dimensions: 'Scalar (typically 1e-4 to 1e-2)' },
      { symbol: 'p', name: 'Dropout Probability', description: 'Fraction of activations randomly zeroed out', dimensions: 'Scalar (typically 0.1 to 0.5)' },
      { symbol: 'm', name: 'Dropout Mask', description: 'Binary tensor of 0s and 1s sampled from Bernoulli distribution', dimensions: 'Matches layer activations' },
      { symbol: 'Patience', name: 'Early Stopping Window', description: 'Number of non-improving epochs tolerated before stopping', dimensions: 'Integer (e.g. 5 or 10)' },
    ],
    numericalExample: {
      scenario: 'Calculating the weight shrinkage effect with learning rate α = 0.01 and weight decay λ = 0.1 on weight w = 2.0.',
      dataset: [
        { initial_w: 2.0, grad_L0: 0.5, alpha: 0.01, lambda_reg: 0.1 },
      ],
      calculations: [
        { step: 'Shrinkage factor', math: '1 - alpha * lambda = 1 - (0.01 * 0.1) = 1 - 0.001', result: '0.999' },
        { step: 'Shrunk weight', math: '2.0 * 0.999', result: '1.998' },
        { step: 'Data gradient update', math: 'alpha * grad_L0 = 0.01 * 0.5', result: '0.005' },
        { step: 'Final updated weight', math: '1.998 - 0.005', result: '1.9930' },
      ],
      finalConclusion: 'The weight decays from 2.0 to 1.993; without weight decay, the updated weight would have been 1.9950.',
    },
    visualExplanation: {
      title: 'Interactive Overfitting & Generalization Explorer',
      description: 'The visualizer above simulates training and validation loss curves as model capacity, L2 weight decay, and Dropout vary.',
      features: [
        'Notice how high capacity causes training loss to plummet while validation loss diverges after epoch 12.',
        'Increase Dropout and L2 Weight Decay to observe the generalization gap shrink.',
        'View the green Early Stopping marker indicating the ideal checkpoint to save before overfitting takes hold.',
      ],
    },
    scratchCode: {
      title: 'Inverted Dropout Implementation in NumPy',
      code: `import numpy as np

def inverted_dropout_forward(a, p=0.2, training=True):
    if not training or p == 0.0:
        return a, None
        
    # Sample binary mask: 1 with probability (1 - p), 0 with probability p
    # Scale by 1 / (1 - p) so expected value E[a_drop] == E[a]
    mask = (np.random.rand(*a.shape) >= p) / (1.0 - p)
    a_dropped = a * mask
    return a_dropped, mask

def inverted_dropout_backward(dout, mask):
    if mask is None:
        return dout
    return dout * mask

# Test on synthetic layer activation
A_sample = np.ones((2, 5)) * 10.0
A_drop, mask = inverted_dropout_forward(A_sample, p=0.4, training=True)

print("Original Activations:\\n", A_sample)
print("After Inverted Dropout (p=0.4):\\n", np.round(A_drop, 2))
print("Mean preserved:", np.isclose(np.mean(A_drop), 10.0, atol=2.0))`,
      explanation: 'Implements inverted dropout where training activations are scaled up by 1/(1-p), eliminating the need for scaling during inference.',
    },
    sklearnCode: {
      title: 'PyTorch Regularization (Dropout & Weight Decay in Practice)',
      code: `import torch
import torch.nn as nn
import torch.optim as optim

class RegularizedNet(nn.Module):
    def __init__(self, in_features, hidden_dim, p_drop=0.3):
        super().__init__()
        self.fc1 = nn.Linear(in_features, hidden_dim)
        self.relu = nn.ReLU()
        self.dropout = nn.Dropout(p=p_drop) # Dropout layer
        self.fc2 = nn.Linear(hidden_dim, 1)

    def forward(self, x):
        h = self.dropout(self.relu(self.fc1(x)))
        return self.fc2(h)

model = RegularizedNet(20, 64, p_drop=0.3)

# L2 weight decay is configured directly in the optimizer!
optimizer = optim.AdamW(model.parameters(), lr=1e-3, weight_decay=0.01)

print("Regularized network and AdamW configured!")`,
      explanation: 'Demonstrates configuring nn.Dropout inside model forward and L2 weight decay via weight_decay in AdamW.',
    },
    runnableCode: {
      code: `import torch

# Demonstrate Dropout mode switching: train vs eval
dropout = torch.nn.Dropout(p=0.5)
x = torch.ones(1, 6) * 4.0

# Training mode: zeroes 50% and doubles the rest (4.0 / 0.5 = 8.0)
dropout.train()
print("Train mode output:", dropout(x))

# Evaluation mode: identity passthrough (4.0 untouched)
dropout.eval()
print("Eval mode output: ", dropout(x))`,
      expectedOutput: 'Train mode output: tensor([[...]])\nEval mode output:  tensor([[4., 4., 4., 4., 4., 4.]])',
    },
    lineByLineExplanation: [
      { lines: '2-3', codeSnippet: 'dropout = torch.nn.Dropout(p=0.5); x = torch.ones(1, 6) * 4.0', explanation: 'Creates a 50% dropout layer and input tensor filled with 4.0.' },
      { lines: '6-7', codeSnippet: 'dropout.train(); print(dropout(x))', explanation: 'In training mode, roughly half the elements become 0.0 and surviving elements become 8.0.' },
      { lines: '10-11', codeSnippet: 'dropout.eval(); print(dropout(x))', explanation: 'In eval mode, dropout acts as an identity function, leaving all 4.0 values untouched.' },
    ],
    hyperparameters: [
      { name: 'weight_decay', defaultVal: '0.01', range: '1e-5 to 0.1', effect: 'Penalizes large weight magnitudes in AdamW / SGD', recommendation: '0.01 for AdamW, 1e-4 for SGD.' },
      { name: 'dropout_rate', defaultVal: '0.2', range: '0.1 to 0.5', effect: 'Probability of zeroing activations during training passes', recommendation: '0.1-0.2 in shallow/transformer layers; 0.5 in dense fully-connected classification heads.' },
      { name: 'early_stopping_patience', defaultVal: '5', range: '3 to 20', effect: 'Number of epochs without validation loss improvement before halting', recommendation: '5 for fast training; 10-15 for large foundation model fine-tuning.' },
    ],
    assumptions: [
      { assumption: 'Sufficient Base Network Capacity', whyItMatters: 'If the base network is already underfitting (high bias), adding Dropout or Weight Decay will make performance worse.', howToVerify: 'Always overfit a tiny batch of 10 samples first to verify model capacity before adding regularization.' },
      { assumption: 'Validation Set Truly Represents Test Distribution', whyItMatters: 'Early stopping on a biased validation set causes premature termination on a sub-optimal checkpoint.', howToVerify: 'Verify that validation data is drawn from identical distribution without leakage.' },
    ],
    commonMistakes: [
      { mistake: 'Adding Dropout to the output layer', whyWrong: 'Zeroing output logits corrupts the final class probabilities and destroys classification predictions.', howToFix: 'Never place a Dropout layer after the final linear projection layer.', solution: 'nn.Sequential(..., nn.Dropout(0.3), nn.Linear(hidden, num_classes))' },
      { mistake: 'Applying weight decay to bias vectors and LayerNorm parameters', whyWrong: 'Decaying biases and normalization scale/shift parameters causes underfitting with no regularization benefit.', howToFix: 'Filter out bias and 1D normalization weights from weight decay in PyTorch.', solution: 'params = [{"params": [p for n, p in model.named_parameters() if "bias" not in n], "weight_decay": 0.01}, ...]' },
    ],
    realWorldUseCases: [
      { industry: 'Autonomous Systems', application: 'Perception Generalization', benefit: 'Heavy data augmentation (random crops, flips, brightness) regularizes vision models against weather shifts.' },
      { industry: 'Medical Diagnostics', application: 'Genomic Variant Prediction', benefit: 'With small sample sizes (N=500 patients) and large feature spaces (D=20,000 genes), L2 regularization prevents fatal overfitting.' },
      { industry: 'Large Language Models', application: 'Instruction Fine-Tuning', benefit: 'Weight decay in AdamW prevents catastrophic forgetting of pretraining knowledge.' },
    ],
    practiceQuestions: [
      { id: 'dl10-q1', question: 'Why does "Inverted Dropout" scale surviving activations by 1 / (1 - p) during training?', hint: 'What would happen during testing if we did not scale during training?', answer: 'Scaling by 1/(1 - p) during training ensures the expected value of activations remains identical between training and test time, so no modification is needed during inference.', explanation: 'Standard dropout required multiplying by (1 - p) at test time; inverted dropout does the inverse during training so test time is untouched.' },
      { id: 'dl10-q2', question: 'How can you diagnose whether a neural network is underfitting or overfitting from its loss curves?', hint: 'Look at the gap between train and validation loss.', answer: 'If both train and validation loss remain high, the model is underfitting (high bias); if train loss is very low but validation loss increases, the model is overfitting (high variance).', explanation: 'The divergence between train and validation is the generalization gap.' },
    ],
    quiz: [
      {
        id: 'dl10-qz1',
        question: 'What is the "Generalization Gap" in deep learning?',
        options: [
          'The difference between the GPU clock speed and CPU clock speed',
          'The difference between Validation Loss and Training Loss (L_val - L_train)',
          'The number of layers between input and output',
          'The time difference between forward pass and backward pass',
        ],
        correctIndex: 1,
        explanation: 'The generalization gap measures how much worse the model performs on unseen validation data compared to the training data it memorized.',
      },
      {
        id: 'dl10-qz2',
        question: 'What is the effect of L2 regularization (weight decay) on the weight update formula in gradient descent?',
        options: [
          'It sets 90% of the weights to exactly 0',
          'It shrinks the weights by factor (1 - αλ) on every step before applying the gradient update',
          'It randomizes weights on every epoch',
          'It doubles the learning rate',
        ],
        correctIndex: 1,
        explanation: 'L2 regularization mathematically multiplies the existing weight vector by (1 - αλ), steadily penalizing large parameter magnitudes.',
      },
      {
        id: 'dl10-qz3',
        question: 'When should Early Stopping halt the training loop?',
        options: [
          'Immediately at epoch 1',
          'When validation loss has stopped improving for a specified patience number of epochs',
          'When training loss reaches exactly zero',
          'Only when the computer runs out of storage space',
        ],
        correctIndex: 1,
        explanation: 'Early stopping halts training when validation loss stops improving, restoring the checkpoint with the lowest validation error.',
      },
    ],
    independentExercise: {
      id: 'dl10-ex',
      title: 'Implement an Early Stopping Class in Python',
      problem: 'Write an `EarlyStopping` class that tracks validation loss, saves the best loss, and returns True from `step(val_loss)` when loss has not improved for `patience` consecutive epochs.',
      hints: ['Maintain best_loss and counter.', 'Reset counter if val_loss improves.'],
      starterCode: `class EarlyStopping:
    def __init__(self, patience=3):
        self.patience = patience
        self.best_loss = float('inf')
        self.counter = 0

    def step(self, val_loss):
        # Update counter or best_loss
        # Return True if should stop
        pass
`,
      solution: `class EarlyStopping:
    def __init__(self, patience=3):
        self.patience = patience
        self.best_loss = float('inf')
        self.counter = 0

    def step(self, val_loss):
        if val_loss < self.best_loss:
            self.best_loss = val_loss
            self.counter = 0
            return False
        else:
            self.counter += 1
            if self.counter >= self.patience:
                return True
            return False

es = EarlyStopping(patience=2)
losses = [0.8, 0.6, 0.5, 0.52, 0.55]
for ep, l in enumerate(losses):
    stopped = es.step(l)
    print(f"Epoch {ep+1} Loss: {l} | Stop: {stopped}")
    if stopped: break`,
    },
    summary: {
      keyTakeaways: [
        'Regularization techniques (Weight Decay, Dropout, Early Stopping) prevent deep networks from memorizing training noise.',
        'Inverted Dropout scales activations during training by 1/(1-p) so that inference requires zero modifications.',
        'Always evaluate the generalization gap: if validation loss increases while training loss drops, apply stronger regularization or acquire more data.',
      ],
      nextLessonId: 'dl-11-initialization-normalization',
      nextLessonTitle: 'DL-11: Weight Initialization & Normalization',
      nextLessonModuleId: 'dl-module-3',
    },
  },

  'dl-11-initialization-normalization': {
    id: 'dl-11-initialization-normalization',
    moduleId: 'dl-module-3',
    title: 'DL-11: Weight Initialization & Normalization',
    subtitle: 'Xavier/He Variance Preservation, Batch Normalization & Layer Normalization',
    order: 2,
    readTimeMinutes: 30,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Derive the mathematical variance conditions for Xavier (Glorot) and He (Kaiming) weight initializations',
      'Explain Internal Covariate Shift and why unnormalized activations cause vanishing or exploding gradient crashes',
      'Understand Batch Normalization: mini-batch mean/variance, learnable affine parameters (γ, β), and running test statistics',
      'Compare Batch Normalization with Layer Normalization and explain why Transformers exclusively use LayerNorm',
    ],
    prerequisites: ['DL-03: Activation Functions', 'DL-05: Forward Propagation'],
    analogy: {
      title: 'The Target Practice Calibration',
      text: 'Imagine passing a fragile laser signal through 50 glass lenses. If each lens slightly amplifies the laser by 1.5x, after 50 lenses the laser beam intensifies by 1.5⁵⁰ ≈ 637 million times, vaporizing the sensor (exploding signal). If each lens slightly dims the laser by 0.7x, after 50 lenses the beam weakens by 0.7⁵⁰ ≈ 1.8 × 10⁻⁸, becoming undetectable (vanishing signal). Weight initialization calculates the exact refractive index so the beam enters and exits each lens with exactly 1.0x variance. Normalization layers act as automatic gain stabilizers between lenses, recalibrating the signal to standard brightness.',
      metaphor: 'Weight initialization sets the initial volume dials to prevent deafening feedback or silence; normalization layers keep the volume steady throughout training.',
    },
    problemSolved: {
      title: 'Unlocking Deep Architectures Beyond 10 Layers',
      description: 'Prior to 2015, training networks deeper than 10-15 layers was notoriously unstable due to exploding and vanishing activations. He initialization and Batch Normalization enabled researchers to train networks with 50, 100, and 1000 layers (such as ResNet-101 and modern Transformers) with fast convergence.',
      keyPoints: [
        'Variance Preservation: Ensures that Var(output) == Var(input) across all consecutive linear layers.',
        'Activation Balancing: BatchNorm standardizes activations to zero mean and unit variance before non-linearities.',
        'Smoother Optimization: Normalization creates a smoother loss landscape with lower Lipschitz constants, permitting 10x higher learning rates.',
      ],
    },
    intuition: {
      overview: 'Weight initialization sets the starting variance of parameters; normalization layers dynamically maintain stable distributions during every forward and backward pass.',
      steps: [
        { step: 1, title: 'He Initialization', description: 'Sample initial weights from Normal(0, 2 / fan_in) to compensate for ReLU zeroing half the activations.' },
        { step: 2, title: 'Mini-Batch Mean & Var', description: 'BatchNorm computes empirical mean μ_B and variance σ_B² across the mini-batch dimension.' },
        { step: 3, title: 'Standardization', description: 'Normalize activations: x_hat = (x - μ_B) / √(σ_B² + ε).' },
        { step: 4, title: 'Learnable Rescaling', description: 'Allow the network to undo normalization if needed: y = γ x_hat + β.' },
        { step: 5, title: 'LayerNorm Switch', description: 'For sequential and transformer models, LayerNorm normalizes across the feature dimension rather than batch dimension.' },
      ],
    },
    mathematics: {
      overview: 'The fundamental initialization and normalization formulas in modern deep learning.',
      foundations: [
        {
          name: 'Xavier (Glorot) Initialization (for Tanh / Sigmoid)',
          latex: 'W \\sim \\mathcal{N}\\left(0, \\frac{2}{\\text{fan}_{\\text{in}} + \\text{fan}_{\\text{out}}}\\right)',
          explanation: 'Preserves variance across both forward and backward passes when activations are linear or symmetric around zero.',
        },
        {
          name: 'He (Kaiming) Initialization (for ReLU)',
          latex: 'W \\sim \\mathcal{N}\\left(0, \\frac{2}{\\text{fan}_{\\text{in}}}\\right)',
          explanation: 'Compensates for the fact that ReLU zeroes out roughly 50% of incoming signals, doubling the required variance.',
        },
        {
          name: 'Batch Normalization Transform',
          latex: '\\hat{x}_i = \\frac{x_i - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}, \\quad y_i = \\gamma \\hat{x}_i + \\beta',
          explanation: 'γ and β are learnable scale and shift parameters initialized to 1.0 and 0.0 respectively.',
        },
        {
          name: 'Layer Normalization Transform',
          latex: '\\mu_L = \\frac{1}{D} \\sum_{j=1}^{D} x_{ij}, \\quad \\hat{x}_{ij} = \\frac{x_{ij} - \\mu_L}{\\sqrt{\\sigma_L^2 + \\epsilon}}',
          explanation: 'Computes statistics across features D for each individual sample, making it independent of batch size.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the He Initialization Variance Formula',
      objective: 'Prove that Var(W) = 2 / fan_in preserves activation variance across a linear layer followed by ReLU.',
      steps: [
        {
          step: 1,
          label: 'Linear Pre-activation Variance',
          latex: 'z = \\sum_{i=1}^{n} w_i x_i \\implies \\text{Var}(z) = n \\cdot \\text{Var}(w_i x_i)',
          explanation: 'Assume inputs x_i and weights w_i are independent and identically distributed with zero mean.',
        },
        {
          step: 2,
          label: 'Product Variance Formula',
          latex: '\\text{Var}(w_i x_i) = \\mathbb{E}[w_i^2 x_i^2] - (\\mathbb{E}[w_i]\\mathbb{E}[x_i])^2 = \\text{Var}(w_i) \\text{Var}(x_i) \\implies \\text{Var}(z) = n \\cdot \\text{Var}(w) \\cdot \\text{Var}(x)',
          explanation: 'Variance of product of independent zero-mean variables equals product of variances.',
        },
        {
          step: 3,
          label: 'Accounting for ReLU Non-Linearity',
          latex: 'a = \\max(0, z) \\implies \\mathbb{E}[a^2] = \\frac{1}{2} \\mathbb{E}[z^2] \\implies \\text{Var}(a) = \\frac{1}{2} \\text{Var}(z)',
          explanation: 'Because ReLU zeroes out negative values, half of the variance is eliminated.',
        },
        {
          step: 4,
          label: 'Setting Output Variance Equal to Input Variance',
          latex: '\\text{Var}(a) = \\frac{1}{2} n \\cdot \\text{Var}(w) \\cdot \\text{Var}(x) = \\text{Var}(x) \\implies \\text{Var}(w) = \\frac{2}{n} = \\frac{2}{\\text{fan}_{\\text{in}}}',
          explanation: 'Solving for Var(w) proves that standard deviation must be sqrt(2 / fan_in) to maintain variance stability.',
        },
      ],
    },
    variables: [
      { symbol: '\\text{fan}_{\\text{in}}', name: 'Input Units', description: 'Number of incoming connections entering a neuron', dimensions: 'Scalar integer' },
      { symbol: '\\mu_B, \\sigma_B^2', name: 'Mini-Batch Statistics', description: 'Mean and variance computed across samples in batch', dimensions: '(1, D)' },
      { symbol: '\\gamma, \\beta', name: 'Affine Scale & Shift Parameters', description: 'Trainable parameters allowing network to restore variance', dimensions: '(1, D)' },
      { symbol: '\\epsilon', name: 'Numerical Epsilon', description: 'Small constant preventing division by zero (e.g. 1e-5)', dimensions: 'Scalar constant' },
    ],
    numericalExample: {
      scenario: 'Calculating He initialization standard deviation for a layer with 512 input features.',
      dataset: [
        { fan_in: 512 },
      ],
      calculations: [
        { step: 'Variance computation', math: 'Var(w) = 2 / 512 = 1 / 256', result: '0.00390625' },
        { step: 'Standard deviation', math: 'sigma = sqrt(2 / 512) = sqrt(0.00390625)', result: '0.0625' },
      ],
      finalConclusion: 'Weights should be sampled from Normal(mean=0, std=0.0625) to prevent signals from exploding or vanishing through ReLU.',
    },
    visualExplanation: {
      title: 'Batch Normalization vs Layer Normalization Dimension Slicing',
      description: 'BatchNorm computes statistics vertically across the batch dimension; LayerNorm computes statistics horizontally across feature channels.',
      features: [
        'BatchNorm: Normalizes (N, C, H, W) along (N, H, W). Dependent on batch size; fails when batch size is small.',
        'LayerNorm: Normalizes along (C, H, W) independently for each sample. Batch size invariant; standard in NLP/LLMs.',
        'Both methods include learnable parameters γ and β to preserve representational power.',
      ],
    },
    scratchCode: {
      title: 'Batch Normalization Forward & Backward in Pure NumPy',
      code: `import numpy as np

def batchnorm_forward(X, gamma, beta, eps=1e-5):
    # X shape: (N, D)
    N, D = X.shape
    mu = np.mean(X, axis=0, keepdims=True)
    var = np.var(X, axis=0, keepdims=True)
    
    # Normalize
    x_hat = (X - mu) / np.sqrt(var + eps)
    # Scale and shift
    out = gamma * x_hat + beta
    
    cache = (x_hat, gamma, mu, var, eps, X)
    return out, cache

# Test on mini-batch of 4 samples, 3 features
X = np.array([[10.0, 2.0, -5.0],
              [12.0, 3.0, -4.0],
              [9.0,  1.0, -6.0],
              [11.0, 2.5, -5.5]])

gamma = np.ones((1, 3))
beta = np.zeros((1, 3))

out, _ = batchnorm_forward(X, gamma, beta)
print("Normalized Output Mean (Target 0.0):\\n", np.round(np.mean(out, axis=0), 4))
print("Normalized Output Variance (Target 1.0):\\n", np.round(np.var(out, axis=0), 4))`,
      explanation: 'Verifies that BatchNorm standardizes every feature column to mean 0.0 and variance 1.0.',
    },
    sklearnCode: {
      title: 'PyTorch Initialization and Normalization Layers',
      code: `import torch
import torch.nn as nn

class ModernDeepBlock(nn.Module):
    def __init__(self, in_features, out_features):
        super().__init__()
        self.fc = nn.Linear(in_features, out_features, bias=False) # No bias needed with BatchNorm!
        self.bn = nn.BatchNorm1d(out_features)
        self.relu = nn.ReLU()
        
        # Explicitly apply He (Kaiming) normal initialization
        nn.init.kaiming_normal_(self.fc.weight, nonlinearity='relu')

    def forward(self, x):
        # Linear -> BatchNorm -> ReLU
        return self.relu(self.bn(self.fc(x)))

block = ModernDeepBlock(128, 256)
x = torch.randn(16, 128)
print("Output tensor shape:", block(x).shape)`,
      explanation: 'Notice bias=False in nn.Linear: when followed by BatchNorm, the linear bias is completely redundant because BatchNorm subtracts the mean.',
    },
    runnableCode: {
      code: `import torch
import torch.nn as nn

# Compare activation variance through 10 linear layers: Bad Init vs He Init
layers_bad = [nn.Linear(100, 100, bias=False) for _ in range(10)]
layers_he = [nn.Linear(100, 100, bias=False) for _ in range(10)]

# Initialize
for l in layers_bad:
    nn.init.normal_(l.weight, mean=0.0, std=1.0) # Too large!
for l in layers_he:
    nn.init.kaiming_normal_(l.weight, nonlinearity='relu')

x = torch.randn(32, 100)

x_bad = x.clone()
x_he = x.clone()

for l in layers_bad:
    x_bad = torch.relu(l(x_bad))
for l in layers_he:
    x_he = torch.relu(l(x_he))

print(f"Input variance:     {x.var().item():.4f}")
print(f"Bad Init variance:  {x_bad.var().item():.2e} (Exploded!)")
print(f"He Init variance:   {x_he.var().item():.4f} (Stable!)")`,
      expectedOutput: 'Input variance:     1.0...\nBad Init variance:  ... (Exploded!)\nHe Init variance:   ... (Stable!)',
    },
    lineByLineExplanation: [
      { lines: '5-9', codeSnippet: 'nn.init.normal_(..., std=1.0) vs nn.init.kaiming_normal_(...)', explanation: 'Contrasts naive standard deviation 1.0 with mathematically derived He initialization.' },
      { lines: '19-22', codeSnippet: 'for l in layers_bad: x_bad = torch.relu(l(x_bad))', explanation: 'Iterates through 10 consecutive linear and ReLU layers.' },
      { lines: '24-26', codeSnippet: 'print(Bad Init vs He Init variance)', explanation: 'Shows that naive init causes variance to explode to 10¹⁴+, while He init maintains stable order-of-magnitude variance.' },
    ],
    hyperparameters: [
      { name: 'batchnorm_momentum', defaultVal: '0.1', range: '0.01 to 0.2', effect: 'Running average update rate for inference population statistics: running_mean = (1-m)*running_mean + m*batch_mean', recommendation: '0.1 is PyTorch default; reduce to 0.01 for small or noisy batches.' },
      { name: 'norm_epsilon', defaultVal: '1e-5', range: '1e-5 to 1e-3', effect: 'Small constant added to denominator variance to prevent division by zero', recommendation: 'Keep at 1e-5.' },
    ],
    assumptions: [
      { assumption: 'Sufficient Batch Size for BatchNorm', whyItMatters: 'If batch size is small (e.g. 2 or 4), mini-batch mean and variance are extremely noisy, destabilizing training.', howToVerify: 'If batch size < 16, switch from BatchNorm to GroupNorm or LayerNorm.' },
      { assumption: 'Tracking Running Statistics for Inference', whyItMatters: 'During inference on a single sample (batch size = 1), sample variance is 0. BatchNorm requires stored population statistics.', howToVerify: 'Always call model.eval() before running test inference.' },
    ],
    commonMistakes: [
      { mistake: 'Including bias in a linear layer immediately preceding BatchNorm', whyWrong: 'The linear bias is completely subtracted out by BatchNorm\'s mean subtraction step, wasting memory and parameters.', howToFix: 'Set bias=False in nn.Linear or nn.Conv2d when followed by BatchNorm.', solution: 'nn.Linear(in_dim, out_dim, bias=False)' },
      { mistake: 'Using Batch Normalization in Transformers or RNNs', whyWrong: 'Variable sequence lengths and auto-regressive decoding make batch-level statistics inconsistent and erratic.', howToFix: 'Always use Layer Normalization (nn.LayerNorm or RMSNorm) for sequential data and Transformers.', solution: 'nn.LayerNorm(hidden_dim)' },
    ],
    realWorldUseCases: [
      { industry: 'Foundation Model Architectures', application: 'LLaMA & Mistral RMSNorm', benefit: 'Root Mean Square Normalization (a simplified LayerNorm without mean subtraction) saves 10-20% inference latency in modern LLMs.' },
      { industry: 'Deep Residual Networks', application: 'ResNet-50 / ResNet-101 Vision Models', benefit: 'He initialization combined with BatchNorm enabled training 100+ layer architectures without vanishing gradients.' },
      { industry: 'Mobile Inference Engines', application: 'Batch Normalization Folding', benefit: 'During deployment, BatchNorm layers are mathematically folded directly into the preceding convolution weights W_folded = W · (γ / σ), resulting in zero inference runtime cost.' },
    ],
    practiceQuestions: [
      { id: 'dl11-q1', question: 'Why does He initialization use variance 2 / fan_in while Xavier initialization uses 2 / (fan_in + fan_out)?', hint: 'What does ReLU do to negative inputs compared to Tanh?', answer: 'ReLU zeroes out half of the distribution (all negative pre-activations), halving the signal variance. The factor of 2 in the numerator doubles the variance to compensate.', explanation: 'Xavier assumed linear or zero-centered symmetric activations like Tanh.' },
      { id: 'dl11-q2', question: 'Why is Layer Normalization preferred over Batch Normalization in Natural Language Processing and Transformers?', hint: 'Consider batch size dependence and variable sequence lengths.', answer: 'LayerNorm computes statistics across features within each token independent of other batch items, making it robust to variable sequence lengths and batch sizes of 1 during autoregressive generation.', explanation: 'BatchNorm fails with variable sequence lengths and small batch sizes.' },
    ],
    quiz: [
      {
        id: 'dl11-qz1',
        question: 'Which initialization method should be paired with ReLU activation functions?',
        options: [
          'All zeros initialization',
          'He (Kaiming) initialization: Var(W) = 2 / fan_in',
          'Uniform(0, 100) initialization',
          'Xavier initialization with std = 10.0',
        ],
        correctIndex: 1,
        explanation: 'Kaiming He proved that Var(W) = 2 / fan_in maintains stable activation and gradient variance through ReLU layers.',
      },
      {
        id: 'dl11-qz2',
        question: 'Why is the bias parameter redundant in a Linear or Convolutional layer that is directly followed by Batch Normalization?',
        options: [
          'Because GPUs cannot compute bias',
          'Because BatchNorm immediately subtracts the mini-batch mean (μ_B), which completely cancels out the constant bias offset',
          'Because bias causes overfitting',
          'Because bias cannot be converted to 32-bit floats',
        ],
        correctIndex: 1,
        explanation: 'Linear bias adds a constant c to all activations, which is identically subtracted when computing (x + c) - (μ + c) = x - μ. BatchNorm’s β parameter replaces it.',
      },
      {
        id: 'dl11-qz3',
        question: 'What do the learnable parameters γ and β do in Batch Normalization and Layer Normalization?',
        options: [
          'They compute the loss function',
          'They allow the network to learn any affine transformation (y = γx_hat + β), restoring original variance or mean if optimal for the task',
          'They randomly drop neurons like Dropout',
          'They compress weights into 8-bit integers',
        ],
        correctIndex: 1,
        explanation: 'γ and β ensure normalization does not permanently constrain representation capacity; if needed, the network can learn γ = σ and β = μ to invert the normalization.',
      },
    ],
    independentExercise: {
      id: 'dl11-ex',
      title: 'Implement Layer Normalization in NumPy',
      problem: 'Write a Python function `layernorm_forward(x, gamma, beta, eps=1e-5)` that normalizes a 2D matrix of shape (N, D) across the feature dimension D for each sample independently.',
      hints: ['Calculate mean and variance along axis=1 with keepdims=True.', 'Apply y = gamma * (x - mean) / sqrt(var + eps) + beta.'],
      starterCode: `import numpy as np

def layernorm_forward(x, gamma, beta, eps=1e-5):
    # Normalize along feature axis 1
    pass

X = np.array([[1.0, 5.0, 9.0], [2.0, 4.0, 6.0]])
gamma = np.ones(3)
beta = np.zeros(3)
`,
      solution: `import numpy as np

def layernorm_forward(x, gamma, beta, eps=1e-5):
    mean = np.mean(x, axis=1, keepdims=True)
    var = np.var(x, axis=1, keepdims=True)
    x_hat = (x - mean) / np.sqrt(var + eps)
    return gamma * x_hat + beta

X = np.array([[1.0, 5.0, 9.0], [2.0, 4.0, 6.0]])
gamma = np.ones(3)
beta = np.zeros(3)
out = layernorm_forward(X, gamma, beta)
print("LayerNorm output:\\n", np.round(out, 4))
print("Row 0 mean (should be 0.0):", np.mean(out[0]))
print("Row 0 var  (should be 1.0):", np.var(out[0]))`,
    },
    summary: {
      keyTakeaways: [
        'He initialization (Normal(0, sqrt(2/fan_in))) is mandatory for ReLU networks to preserve signal variance.',
        'BatchNorm standardizes features across the mini-batch; LayerNorm standardizes features across channels per sample.',
        'Transformers and Large Language Models exclusively use LayerNorm (or RMSNorm) because it is independent of batch size and sequence length.',
      ],
      nextLessonId: 'dl-12-hyperparameter-tuning',
      nextLessonTitle: 'DL-12: Hyperparameter Tuning & Experimentation',
      nextLessonModuleId: 'dl-module-3',
    },
  },

  'dl-12-hyperparameter-tuning': {
    id: 'dl-12-hyperparameter-tuning',
    moduleId: 'dl-module-3',
    title: 'DL-12: Hyperparameter Tuning & Experimentation',
    subtitle: 'Learning Rate Schedules, Warmup, Search Strategies & Reproducible Sweeps',
    order: 3,
    readTimeMinutes: 26,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Rank hyperparameters by empirical sensitivity: Learning Rate > Schedule > Batch Size > Network Depth/Width > Weight Decay',
      'Implement Cosine Annealing with Warmup learning rate schedules in PyTorch',
      'Compare Grid Search, Random Search, and Bayesian Optimization (Tree-structured Parzen Estimators)',
      'Apply the Linear Scaling Rule when scaling batch sizes across multi-GPU distributed clusters',
    ],
    prerequisites: ['DL-08: Gradient Descent and Optimizers', 'DL-09: Training a Neural Network'],
    analogy: {
      title: 'The Sound Engineer’s Audio Mixing Console',
      text: 'Imagine tuning a professional recording console with 50 knobs. Turning the "Master Volume" (Learning Rate) too high immediately creates screeching feedback and blows out the speakers. Turning it too low results in dead silence. Knobs like "Bass Boost" (Network Width) or "High Pass Filter" (Weight Decay) shape the tone, but they are completely irrelevant if the Master Volume is misconfigured. A methodical sound engineer tunes the primary master fader first, applies a gradual fade-in (warmup), and slowly drops the level towards the end of the song (cosine annealing).',
      metaphor: 'Learning rate is the master knob of deep learning; all other hyperparameters depend on its correct setting.',
    },
    problemSolved: {
      title: 'Moving Beyond Random Guessing in High-Dimensional Search Spaces',
      description: 'Training deep models is computationally expensive: testing combinations blindly wastes thousands of GPU hours. Rigorous hyperparameter tuning protocols isolate high-leverage knobs and optimize configurations using efficient probabilistic exploration.',
      keyPoints: [
        'The Priority Hierarchy: Learning rate accounts for over 70% of performance variance.',
        'Warmup Schedules: Gradually increasing learning rate from 0 over early steps stabilizes initial momentum and second-moment statistics.',
        'Random vs Grid Search (Bergstra & Bengio 2012): Random search explores vastly more unique values per critical dimension for the same compute budget.',
      ],
    },
    intuition: {
      overview: 'Hyperparameter tuning finds the optimal architectural and optimization configurations using systematic sweeps that balance exploration of new parameters with exploitation of top-performing regions.',
      steps: [
        { step: 1, title: 'Isolate Search Space', description: 'Define ranges for high-impact parameters: learning rate on a logarithmic scale [1e-5, 1e-1].' },
        { step: 2, title: 'Establish Baseline', description: 'Train default configuration with AdamW (lr=3e-4) to set the minimum performance benchmark.' },
        { step: 3, title: 'Randomized / Bayesian Sweep', description: 'Sample configurations using Optuna or Ray Tune on a representative validation subset.' },
        { step: 4, title: 'Early Pruning', description: 'Use median stopping rule (ASHA) to abort underperforming runs after 20% of training.' },
        { step: 5, title: 'Full Retraining', description: 'Retrain the best hyperparameter configuration on the full dataset.' },
      ],
    },
    mathematics: {
      overview: 'Formulas for learning rate scheduling and batch-size scaling.',
      foundations: [
        {
          name: 'Cosine Annealing Learning Rate Schedule',
          latex: '\\eta_t = \\eta_{\\min} + \\frac{1}{2}(\\eta_{\\max} - \\eta_{\\min})\\left(1 + \\cos\\left(\\frac{t}{T_{\\max}}\\pi\\right)\\right)',
          explanation: 'Smoothly decays learning rate from η_max down to η_min following a cosine curve across T_max epochs.',
        },
        {
          name: 'Linear Scaling Rule for Batch Size (Goyal et al. 2017)',
          latex: '\\text{If } B_{\\text{new}} = k \\cdot B_{\\text{base}} \\implies \\eta_{\\text{new}} = k \\cdot \\eta_{\\text{base}}',
          explanation: 'When scaling batch size by k on distributed GPUs, learning rate should scale linearly by k alongside a warmup schedule.',
        },
      ],
    },
    derivation: {
      title: 'Why Random Search Outperforms Grid Search',
      objective: 'Prove that random search explores exponentially more distinct projection points on high-impact dimensions.',
      steps: [
        {
          step: 1,
          label: 'Grid Search on 2 Parameters (1 Critical, 1 Useless)',
          latex: 'N = 9 \\text{ trials on a } 3 \\times 3 \\text{ grid}',
          explanation: 'Suppose hyperparameter 1 (learning rate) is critical, but hyperparameter 2 (e.g. random seed) has negligible effect.',
        },
        {
          step: 2,
          label: 'Effective Distinct Evaluations for Grid Search',
          latex: 'k = 3 \\text{ distinct values of } \\text{param}_1 \\text{ tested across all 9 runs}',
          explanation: 'Grid search wastes 6 runs testing redundant values of parameter 1.',
        },
        {
          step: 3,
          label: 'Effective Distinct Evaluations for Random Search',
          latex: 'N = 9 \\text{ independent random samples} \\implies 9 \\text{ distinct values of } \\text{param}_1 \\text{ tested}',
          explanation: 'Random search tests 9 unique points along the critical parameter dimension, tripling the effective search resolution for the exact same compute budget.',
        },
      ],
    },
    variables: [
      { symbol: '\\eta', name: 'Learning Rate', description: 'Step size multiplier for weight updates', dimensions: 'Scalar float' },
      { symbol: 'T_{\\text{max}}', name: 'Maximum Epochs', description: 'Target epoch duration for complete cosine decay cycle', dimensions: 'Scalar integer' },
      { symbol: 'B', name: 'Batch Size', description: 'Number of training samples per optimization iteration', dimensions: 'Scalar integer' },
      { symbol: 'k', name: 'Scaling Factor', description: 'Proportional multiplier for distributed cluster scaling', dimensions: 'Scalar float' },
    ],
    numericalExample: {
      scenario: 'Calculating Cosine Annealing learning rate at epoch 50 out of 100 with lr_max = 0.001, lr_min = 0.00001.',
      dataset: [
        { t: 50, T_max: 100, eta_max: 0.001, eta_min: 0.00001 },
      ],
      calculations: [
        { step: 'Cosine argument', math: 'cos( (50 / 100) * pi ) = cos(pi / 2)', result: '0.0' },
        { step: 'Cosine factor', math: '1 + 0.0 = 1.0; 0.5 * (1.0)', result: '0.5' },
        { step: 'Interpolated LR', math: '0.00001 + 0.5 * (0.001 - 0.00001) = 0.00001 + 0.000495', result: '0.000505' },
      ],
      finalConclusion: 'At exactly halfway through training (epoch 50), the learning rate has smoothly decayed to half of its initial maximum.',
    },
    visualExplanation: {
      title: 'Cosine Annealing with Linear Warmup Schedule',
      description: 'The learning rate ramps linearly from zero over the warmup epochs to stabilize optimizer moments, then decays along a smooth cosine curve.',
      features: [
        'Warmup Phase (Epochs 0 to 5): Prevents early divergent updates when gradients are uncalibrated.',
        'Cosine Decay Phase (Epochs 5 to 100): Gradually lowers step size to settle into narrow, high-generalization minima.',
        'Logarithmic Search Grid: Explores learning rates on powers of 10: 10⁻⁴, 3×10⁻⁴, 10⁻³, 3×10⁻³.',
      ],
    },
    scratchCode: {
      title: 'Custom Cosine Annealing with Warmup Scheduler in Python',
      code: `import numpy as np

def get_lr_schedule(step, total_steps, warmup_steps, lr_max, lr_min=1e-6):
    if step < warmup_steps:
        # Linear Warmup
        return lr_min + (lr_max - lr_min) * (step / max(1, warmup_steps))
    else:
        # Cosine Annealing
        decay_ratio = (step - warmup_steps) / max(1, total_steps - warmup_steps)
        coeff = 0.5 * (1.0 + np.cos(np.pi * decay_ratio))
        return lr_min + coeff * (lr_max - lr_min)

total_steps = 1000
warmup = 100
max_lr = 1e-3

for step in [0, 50, 100, 300, 550, 800, 1000]:
    lr = get_lr_schedule(step, total_steps, warmup, max_lr)
    print(f"Step {step:4d} | LR: {lr:.6f}")`,
      explanation: 'Generates the exact cosine warmup schedule used in modern LLM training pipelines like GPT and LLaMA.',
    },
    sklearnCode: {
      title: 'PyTorch torch.optim.lr_scheduler Integration',
      code: `import torch
import torch.nn as nn
import torch.optim as optim
from torch.optim.lr_scheduler import CosineAnnealingLR, LinearLR, SequentialLR

model = nn.Linear(10, 2)
optimizer = optim.AdamW(model.parameters(), lr=1e-3)

# 1. Warmup scheduler: 0.1x to 1.0x over 5 epochs
warmup_scheduler = LinearLR(optimizer, start_factor=0.1, total_iters=5)

# 2. Cosine decay scheduler for remaining 45 epochs
cosine_scheduler = CosineAnnealingLR(optimizer, T_max=45, eta_min=1e-6)

# Combine into sequential scheduler
scheduler = SequentialLR(optimizer, schedulers=[warmup_scheduler, cosine_scheduler], milestones=[5])

for epoch in range(1, 11):
    optimizer.step()
    current_lr = scheduler.get_last_lr()[0]
    scheduler.step()
    print(f"Epoch {epoch:2d} | Learning Rate: {current_lr:.6f}")`,
      explanation: 'Chains PyTorch LinearLR and CosineAnnealingLR using SequentialLR.',
    },
    runnableCode: {
      code: `import numpy as np

# Demonstrate Random Search vs Grid Search parameter coverage
np.random.seed(42)
n_trials = 9

# Grid Search (3x3)
lr_grid = [1e-4, 1e-3, 1e-2]
distinct_grid_lrs = len(set(lr_grid))

# Random Search on log scale
lr_random = 10 ** np.random.uniform(-4, -1, n_trials)
distinct_random_lrs = len(set(np.round(lr_random, 6)))

print(f"Total Trials: {n_trials}")
print(f"Grid Search distinct LRs tested:   {distinct_grid_lrs}")
print(f"Random Search distinct LRs tested: {distinct_random_lrs} (3x greater resolution!)")`,
      expectedOutput: 'Total Trials: 9\nGrid Search distinct LRs tested:   3\nRandom Search distinct LRs tested: 9 (3x greater resolution!)',
    },
    lineByLineExplanation: [
      { lines: '5', codeSnippet: 'n_trials = 9', explanation: 'Fixed trial budget of 9 runs.' },
      { lines: '8-9', codeSnippet: 'lr_grid = [1e-4, 1e-3, 1e-2]', explanation: 'Grid search only samples 3 distinct values along the critical learning rate axis.' },
      { lines: '12', codeSnippet: 'lr_random = 10 ** np.random.uniform(-4, -1, n_trials)', explanation: 'Random log-uniform sampling tests 9 distinct values across 3 orders of magnitude.' },
    ],
    hyperparameters: [
      { name: 'learning_rate', defaultVal: '3e-4', range: '1e-5 to 1e-1', effect: 'Dominates model convergence and final accuracy', recommendation: 'Sample on log scale: 10^uniform(-5, -2).' },
      { name: 'warmup_ratio', defaultVal: '0.05', range: '0.01 to 0.10', effect: 'Fraction of total training steps dedicated to linear warmup', recommendation: '5% of total steps is standard.' },
    ],
    assumptions: [
      { assumption: 'Logarithmic Distribution of Learning Rates', whyItMatters: 'Sampling learning rates uniformly on a linear scale [0.0001, 0.1] wastes 90% of trials between 0.01 and 0.1, completely missing 0.0003.', howToVerify: 'Always sample learning rates using 10^uniform(low, high).' },
      { assumption: 'Early Predictability of Runs', whyItMatters: 'Pruning algorithms assume runs in the bottom 25% at epoch 10 rarely become the overall champion by epoch 100.', howToVerify: 'Empirically verified across vision and NLP benchmarks.' },
    ],
    commonMistakes: [
      { mistake: 'Sampling learning rates linearly instead of logarithmically', whyWrong: 'Linear sampling tests 0.05, 0.07, 0.09, which all blow up, and ignores fine-grained exploration between 0.0001 and 0.001.', howToFix: 'Sample on log-scale.', solution: 'lr = 10 ** np.random.uniform(-4, -2)' },
      { mistake: 'Tuning batch size without adjusting learning rate', whyWrong: 'Increasing batch size reduces gradient noise; without scaling learning rate, the model under-trains and generalizes worse.', howToFix: 'Apply the linear scaling rule: when batch size is doubled, double the learning rate and add warmup.', solution: 'lr_new = lr_base * (batch_new / batch_base)' },
    ],
    realWorldUseCases: [
      { industry: 'Autonomous Vehicles', application: 'Multi-GPU Cluster Distributed Training', benefit: 'Linear scaling rule scales batch sizes to 8,192 across 64 GPUs, cutting training time from 2 weeks to 8 hours.' },
      { industry: 'Drug Discovery', application: 'Molecular Graph Neural Networks', benefit: 'Bayesian optimization (Optuna) discovers non-intuitive layer dimensions and dropout rates in molecular property predictors.' },
      { industry: 'Recommendation Systems', application: 'Deep Factorization Machine Tuning', benefit: 'Automated ASHA pruning terminates unpromising trials after 5 minutes, saving thousands of cloud compute dollars.' },
    ],
    practiceQuestions: [
      { id: 'dl12-q1', question: 'Why is learning rate sampled on a logarithmic scale rather than a linear scale during hyperparameter sweeps?', hint: 'Is the difference between 0.0001 and 0.001 larger or smaller in impact than between 0.05 and 0.051?', answer: 'The impact of learning rate changes multiplicatively by orders of magnitude (e.g. 10x), not additively. A log scale ensures equal exploration probability across each order of magnitude (1e-4, 1e-3, 1e-2).', explanation: 'Linear sampling would waste 90% of samples in high ranges where models fail to converge.' },
      { id: 'dl12-q2', question: 'What is the Linear Scaling Rule when scaling batch size from B to k*B?', hint: 'How should learning rate change when batch size increases?', answer: 'The learning rate should be scaled linearly by k: η_new = k · η_base, combined with a linear warmup schedule.', explanation: 'Larger batches provide lower-variance gradients, permitting larger step sizes per iteration.' },
    ],
    quiz: [
      {
        id: 'dl12-qz1',
        question: 'Which hyperparameter has the single highest empirical impact on neural network convergence and performance?',
        options: [
          'Random seed',
          'Learning Rate',
          'Weight decay epsilon parameter',
          'Number of threads in DataLoader',
        ],
        correctIndex: 1,
        explanation: 'Empirical studies universally demonstrate that learning rate is the most critical hyperparameter in deep learning.',
      },
      {
        id: 'dl12-qz2',
        question: 'Why does Cosine Annealing with Warmup improve training stability and final test accuracy?',
        options: [
          'It replaces floating point math with integer arithmetic',
          'Warmup stabilizes early optimizer moments; cosine decay smoothly lowers step sizes to settle into flat, generalizable minima',
          'It deletes 50% of the training dataset',
          'It forces weights to be positive',
        ],
        correctIndex: 1,
        explanation: 'Warmup avoids catastrophic updates early on, while cosine decay settles weights into smooth minima with high generalization.',
      },
      {
        id: 'dl12-qz3',
        question: 'Why does Random Search consistently outperform Grid Search in multi-parameter tuning?',
        options: [
          'Random search requires zero GPU memory',
          'Random search tests far more unique values along high-impact parameter dimensions for the exact same total trial budget',
          'Random search guarantees 100% test accuracy',
          'Grid search is mathematically invalid',
        ],
        correctIndex: 1,
        explanation: 'Bergstra and Bengio showed that because only a few hyperparameters are critical, random search samples distinct values of the important parameters rather than repeating grid points.',
      },
    ],
    independentExercise: {
      id: 'dl12-ex',
      title: 'Sample Learning Rates on a Log-Uniform Scale',
      problem: 'Write a Python function `sample_log_learning_rates(min_exp=-5, max_exp=-2, n_samples=5)` that returns an array of n_samples randomly drawn from 10^U(min_exp, max_exp).',
      hints: ['Use np.random.uniform(min_exp, max_exp, n_samples).', 'Raise 10 to that power: 10 ** exponents.'],
      starterCode: `import numpy as np

def sample_log_learning_rates(min_exp=-5, max_exp=-2, n_samples=5):
    pass

print(sample_log_learning_rates())
`,
      solution: `import numpy as np

def sample_log_learning_rates(min_exp=-5, max_exp=-2, n_samples=5):
    exponents = np.random.uniform(min_exp, max_exp, n_samples)
    return 10.0 ** exponents

np.random.seed(42)
samples = sample_log_learning_rates()
for s in samples:
    print(f"Sampled LR: {s:.6f}")`,
    },
    summary: {
      keyTakeaways: [
        'Learning rate dominates all other hyperparameters; always tune it first on a logarithmic scale.',
        'Use Cosine Annealing with Warmup for stable convergence and peak generalization.',
        'Random search and Bayesian optimization explore high-dimensional hyperparameter spaces vastly more efficiently than manual grid search.',
      ],
      nextLessonId: 'dl-13-pytorch-fundamentals',
      nextLessonTitle: 'DL-13: PyTorch Fundamentals',
      nextLessonModuleId: 'dl-module-4',
    },
  },
};

