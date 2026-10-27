import os
import sys
import subprocess
import json

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
            return out if out else "(Executed successfully)"
        else:
            return f"Output:\n{res.stderr.strip()}"
    except Exception as e:
        return f"Output: {str(e)}"

def write_module_ts(file_path, var_prefix, mod_data, lessons_dict):
    content = f"""import {{ ModuleData, LessonContent }} from '@/lib/types';

export const {var_prefix}Data: ModuleData = {json.dumps(mod_data, indent=2)};

export const {var_prefix}Lessons: Record<string, LessonContent> = {json.dumps(lessons_dict, indent=2)};
"""
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Wrote {os.path.basename(file_path)} ({len(lessons_dict)} lessons)")

print("Helper ready.")

