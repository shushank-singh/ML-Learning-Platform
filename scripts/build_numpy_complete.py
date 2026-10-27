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
            return f"Execution output: {res.stderr.strip()}"
    except Exception as e:
        return f"Output: {str(e)}"

def write_module_ts(file_path, var_prefix, mod_data, lessons_dict):
    content = f"""import {{ ModuleData, LessonContent }} from '@/lib/types';

export const {var_prefix}Data: ModuleData = {json.dumps(mod_data, indent=2)};

export const {var_prefix}Lessons: Record<string, LessonContent> = {json.dumps(lessons_dict, indent=2)};
"""
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Wrote {os.path.basename(file_path)} with {len(lessons_dict)} lessons.")

def make_lesson(raw, next_info=None):
    code = raw["code"].strip()
    out = run_code(code)
    
    nextId = next_info[0] if next_info else ""
    nextTitle = next_info[1] if next_info else ""
    nextMod = next_info[2] if next_info else ""

    return {
        "id": raw["id"],
        "moduleId": raw["moduleId"],
        "title": raw["title"],
        "subtitle": raw["subtitle"],
        "order": raw["order"],
        "readTimeMinutes": raw.get("readTime", 12),
        "difficulty": raw.get("difficulty", "Beginner"),
        "visualizerType": "numpy-interactive",
        "objectives": raw.get("objectives", [
            f"Understand the concept and application of {raw['title']}.",
            "Master the syntax, common parameters, and expected outputs.",
            "Avoid typical pitfalls and performance traps.",
            "Apply the technique to practical data science and machine learning tasks."
        ]),
        "prerequisites": raw.get("prerequisites", ["Basic Python syntax", "NumPy array basics"]),
        "analogy": raw["analogy"],
        "problemSolved": raw["problemSolved"],
        "intuition": raw["intuition"],
        "mathematics": raw["mathematics"],
        "derivation": raw["derivation"],
        "variables": raw["variables"],
        "numericalExample": raw["numericalExample"],
        "visualExplanation": raw["visualExplanation"],
        "scratchCode": raw.get("scratchCode", {"title": "Python Implementation", "code": code, "explanation": "Demonstration."}),
        "sklearnCode": raw.get("sklearnCode", {"title": "Production Data Science Usage", "code": code, "explanation": "Idiomatic usage in modern pipelines."}),
        "runnableCode": {
            "code": code,
            "expectedOutput": out
        },
        "lineByLineExplanation": raw["lineByLineExplanation"],
        "hyperparameters": raw.get("hyperparameters", [{"name": "axis", "defaultVal": "None", "range": "None, 0, 1", "effect": "Dimension of operation", "recommendation": "Set explicitly to avoid ambiguities."}]),
        "assumptions": raw.get("assumptions", [{"assumption": "Homogeneous array", "whyItMatters": "Enables CPU-speed C execution", "howToVerify": "Check array.dtype"}]),
        "commonMistakes": raw["commonMistakes"],
        "realWorldUseCases": raw["realWorldUseCases"],
        "practiceQuestions": raw["practiceQuestions"],
        "quiz": raw["quiz"],
        "independentExercise": raw["independentExercise"],
        "summary": {
            "keyTakeaways": raw.get("keyTakeaways", [
                f"Mastered {raw['title']} completely.",
                "Learned real-world analogies, syntax, and line explanations.",
                "Practiced with hands-on coding tasks and knowledge checks."
            ]),
            "nextLessonId": nextId,
            "nextLessonTitle": nextTitle,
            "nextLessonModuleId": nextMod
        }
    }

print("Base generator utilities defined.")

