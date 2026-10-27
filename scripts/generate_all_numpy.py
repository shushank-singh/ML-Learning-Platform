import os
import sys
from numpy_helpers import create_lesson, write_module_ts

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "data", "numpy")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def generate_module(mod_id, mod_number, mod_title, mod_sub, mod_desc, mod_badge, mod_hours, topics, next_mod_id=None, next_mod_title=None):
    lessons_dict = {}
    summaries_list = []
    
    for idx, t in enumerate(topics):
        (id, title, subtitle, order, readTime, difficulty,
         analogy_title, analogy_text, analogy_metaphor,
         prob_title, prob_desc,
         code,
         scenario, scen_desc,
         pq_q, pq_a,
         ex_prob, ex_sol) = t

        next_t = topics[idx + 1] if idx + 1 < len(topics) else None
        nextId = next_t[0] if next_t else (next_mod_id if next_mod_id else "")
        nextTitle = next_t[1] if next_t else (next_mod_title if next_mod_title else "")
        nextModule = mod_id if next_t else (next_mod_id if next_mod_id else "")

        les = create_lesson(
            id=id,
            moduleId=mod_id,
            title=title,
            subtitle=subtitle,
            order=order,
            readTime=readTime,
            difficulty=difficulty,
            objectives=[
                f"Master practical usage of {title}.",
                "Understand the memory footprint, execution speed, and edge cases.",
                "Avoid common subtle bugs and unexpected dimensional changes.",
                "Apply to realistic data science and machine learning workflows."
            ],
            prerequisites=["Python fundamentals", "NumPy array basics"],
            analogy={"title": analogy_title, "text": analogy_text, "metaphor": analogy_metaphor},
            problemSolved={"title": prob_title, "description": prob_desc, "keyPoints": [
                "Bypasses slow dynamic interpreter overhead.",
                "Enables high-performance vectorized vector and matrix math.",
                "Ensures memory safety and cache prefetching."
            ]},
            intuition={"overview": f"Inner mechanics of {title}.", "steps": [
                {"step": 1, "title": "Memory Inspection", "description": "NumPy evaluates shape, strides, and memory contiguity."},
                {"step": 2, "title": "Index / Axis Alignment", "description": "Computes exact element offsets using strided arithmetic."},
                {"step": 3, "title": "Vectorized Execution", "description": "Runs hardware-accelerated SIMD instructions over the data buffer."}
            ]},
            mathematics={"overview": f"Mathematical foundations for {title}.", "foundations": [
                {"name": "Tensor Operation", "latex": "\\mathbf{Y} = f(\\mathbf{X}) \\quad \\text{where } \\mathbf{X} \\in \\mathbb{R}^{n_1 \\times n_2}", "explanation": "General multi-axis transformation."},
                {"name": "Strided Offset", "latex": "\\text{Offset}(\\mathbf{i}) = \\sum_{k=0}^{D-1} i_k \\cdot s_k", "explanation": "Exact memory address formula based on dimension strides."}
            ]},
            derivation={"title": f"Complexity & Correctness of {title}", "objective": "Verify computational complexity and memory usage.", "steps": [
                {"step": 1, "label": "Dimension Check", "latex": "\\text{Total elements } N = \\prod d_i", "explanation": "Input array has N total elements."},
                {"step": 2, "label": "Strided Traversal", "latex": "O(1) \\text{ metadata adjustment for views}, O(N) \\text{ for data copies}", "explanation": "Distinguishes zero-copy views from full buffer copies."},
                {"step": 3, "label": "Throughput", "latex": "\\text{Throughput} \\approx \\text{Memory Bandwidth (GB/s)}", "explanation": "NumPy saturates hardware memory bus capacity."}
            ]},
            variables=[
                {"symbol": "N", "name": "Element Count", "description": "Total values in array", "dimensions": "Scalar"},
                {"symbol": "s", "name": "Strides", "description": "Byte step tuple per axis", "dimensions": "Tuple"}
            ],
            numericalExample={
                "scenario": scenario,
                "dataset": [{"Record": 1, "Context": scen_desc, "Status": "Verified"}],
                "calculations": [{"step": "Verification", "math": "N = 4", "result": "Calculated accurately"}],
                "finalConclusion": "The operation produced the exact mathematical result expected."
            },
            visualExplanation={
                "title": f"Visual Architecture: {title}",
                "description": f"How {title} modifies or traverses array buffers in memory.",
                "features": [
                    "Direct index mapping eliminates intermediate allocations.",
                    "Preserves original memory buffer when possible (zero-copy view).",
                    "Optimized for high-speed linear algebra routines."
                ]
            },
            scratchCode={"title": "Interactive Python Demonstration", "code": code, "explanation": "Direct executable verification."},
            sklearnCode={"title": "Data Science & ML Pipeline Usage", "code": code, "explanation": "How top data teams use this pattern."},
            runnableCode_snippet=code,
            lineByLineExplanation=[
                {"lines": "1-2", "codeSnippet": "import numpy as np", "explanation": "Loads NumPy library."},
                {"lines": "3-6", "codeSnippet": "# Operation execution", "explanation": "Executes the operation and outputs the result."}
            ],
            hyperparameters=[{"name": "axis", "defaultVal": "None", "range": "None, 0, 1, ...", "effect": "Dimension along which operation is computed", "recommendation": "Use axis=0 for column statistics, axis=1 for row statistics."}],
            assumptions=[{"assumption": "Compatible shapes", "whyItMatters": "Prevents dimension broadcast mismatch errors", "howToVerify": "Check .shape on all operands"}],
            commonMistakes=[{"mistake": "Confusing view with copy", "solution": "Use .copy() if you intend to mutate independently", "whyWrong": "Modifying a view alters the original array silently", "howToFix": "Call arr.copy()"}],
            realWorldUseCases=[
                {"industry": "E-Commerce", "application": "Sales Basket Analysis", "benefit": "Vectorized product purchase matrices."},
                {"industry": "Healthcare", "application": "Patient Vitals Monitoring", "benefit": "Streaming multi-channel biometric signals."}
            ],
            practiceQuestions=[
                {"id": "pq1", "question": pq_q, "hint": "Consider array shapes and memory.", "answer": pq_a},
                {"id": "pq2", "question": f"Is {title} typically vectorized in NumPy?", "hint": "Does it use C-level SIMD?", "answer": "Yes, NumPy implements this in pre-compiled C/Fortran, running far faster than Python loops."},
                {"id": "pq3", "question": f"What is the memory impact of {title}?", "hint": "Does it share the buffer or copy?", "answer": "Views share memory with zero RAM duplication; operations creating new shapes or types allocate a new buffer."}
            ],
            quiz=[
                {
                    "id": "q1",
                    "question": f"What is the main advantage of using {title}?",
                    "options": [
                        "Executes at compiled C speed over contiguous memory blocks.",
                        "It makes the computer run in interpreted mode.",
                        "It restricts all arrays to only 1 dimension.",
                        "It replaces the need for any Python variables."
                    ],
                    "correctIndex": 0,
                    "explanation": "NumPy operations run compiled native code directly on contiguous RAM buffers."
                },
                {
                    "id": "q2",
                    "question": "What happens if dimensions do not match the expected constraints?",
                    "options": [
                        "NumPy raises a clear ValueError indicating shape incompatibility.",
                        "The computer immediately shuts down.",
                        "The array fills itself with random text.",
                        "Nothing, it silently produces arbitrary numbers."
                    ],
                    "correctIndex": 0,
                    "explanation": "NumPy enforces strict dimensional validation and raises a descriptive ValueError when shapes cannot be aligned."
                },
                {
                    "id": "q3",
                    "question": "Which method ensures you have an independent duplicate of an array that won't mutate the original?",
                    "options": [".copy()", ".view()", ".clone()", ".duplicate()"],
                    "correctIndex": 0,
                    "explanation": "The .copy() method performs a deep buffer allocation, creating a completely independent array."
                }
            ],
            independentExercise={
                "title": f"Practice Task: {title}",
                "problem": ex_prob,
                "difficulty": difficulty,
                "hints": ["Review the code example above", "Verify the expected output carefully"],
                "starterCode": "import numpy as np\n# Your solution here:\n",
                "solution": ex_sol
            },
            summary={
                "keyTakeaways": [
                    f"Firmly understood {title} and its data science application.",
                    "Learned to avoid common dimensional pitfalls and memory bugs.",
                    "Ready to progress to the next topic in the learning path."
                ],
                "nextLessonId": nextId,
                "nextLessonTitle": nextTitle,
                "nextLessonModuleId": nextModule
            }
        )
        lessons_dict[les["id"]] = les
        summaries_list.append({
            "id": les["id"],
            "moduleId": les["moduleId"],
            "title": les["title"],
            "description": les["subtitle"],
            "order": les["order"],
            "readTimeMinutes": les["readTimeMinutes"],
            "visualizerType": les["visualizerType"],
            "difficulty": les["difficulty"]
        })
        
    mod_data = {
        "id": mod_id,
        "number": mod_number,
        "title": mod_title,
        "subtitle": mod_sub,
        "description": mod_desc,
        "icon": "Layers",
        "badge": mod_badge,
        "estimatedHours": mod_hours,
        "topicsCount": len(summaries_list),
        "lessons": summaries_list
    }
    
    file_path = os.path.join(OUTPUT_DIR, f"{mod_id}.ts")
    write_module_ts(file_path, f"numpyModule{mod_number}" if mod_number <= 6 else "numpyProject", mod_data, lessons_dict)
    return mod_data, lessons_dict

print("generate_module helper ready.")

