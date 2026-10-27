import os
import sys
import json
import subprocess

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "data", "numpy")
os.makedirs(OUTPUT_DIR, exist_ok=True)

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

def format_ts_file(module_var, mod_data, lessons):
    return f"""import {{ ModuleData, LessonContent }} from '@/lib/types';

export const {module_var}Data: ModuleData = {json.dumps(mod_data, indent=2)};

export const {module_var}Lessons: Record<string, LessonContent> = {json.dumps(lessons, indent=2)};
"""

print("Writing full NumPy curriculum generator...")

