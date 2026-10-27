import os
import sys
import json
import subprocess

def run_code(code_str):
    try:
        res = subprocess.run(
            [sys.executable, "-c", code_str],
            capture_output=True,
            text=True,
            timeout=8
        )
        if res.returncode == 0:
            out = res.stdout.strip()
            return out if out else "(Executed successfully with no output)"
        else:
            return f"Execution error: {res.stderr.strip()}"
    except Exception as e:
        return f"Output: {str(e)}"

# We will define the full modules catalog for NumPy:
# Module 1: NumPy Foundations (12 lessons)
# Module 2: Indexing, Slicing & Reshaping (12 lessons)
# Module 3: Array Operations & Broadcasting (13 lessons)
# Module 4: Mathematical & Statistical Operations (11 lessons)
# Module 5: Efficient NumPy Programming (12 lessons)
# Module 6: NumPy for Data Science and Machine Learning (10 lessons)
# Final Project: Student Performance Analytics (1 capstone lesson)

print("Starting NumPy curriculum generation...")

