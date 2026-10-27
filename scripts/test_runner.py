import os
import sys
import json
import subprocess

def run_code_get_output(code_str):
    """Run python code in a subprocess and return stdout."""
    try:
        res = subprocess.run(
            [sys.executable, "-c", code_str],
            capture_output=True,
            text=True,
            timeout=10
        )
        if res.returncode == 0:
            return res.stdout.strip()
        else:
            return f"Error executing code:\n{res.stderr.strip()}"
    except Exception as e:
        return f"Execution timeout or error: {str(e)}"

print("Testing runner helper...")
test_out = run_code_get_output("import numpy as np\nprint('NumPy ready:', np.__version__)")
print(test_out)

