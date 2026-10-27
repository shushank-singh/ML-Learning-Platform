import sys
import subprocess
import json
import os

def run_python_code(code_str):
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

def create_lesson(
    id,
    moduleId,
    title,
    subtitle,
    order,
    readTime,
    difficulty,
    objectives,
    prerequisites,
    analogy,
    problemSolved,
    intuition,
    mathematics,
    derivation,
    variables,
    numericalExample,
    visualExplanation,
    scratchCode,
    sklearnCode,
    runnableCode_snippet,
    lineByLineExplanation,
    hyperparameters,
    assumptions,
    commonMistakes,
    realWorldUseCases,
    practiceQuestions,
    quiz,
    independentExercise,
    summary
):
    expectedOutput = run_python_code(runnableCode_snippet)
    
    return {
        "id": id,
        "moduleId": moduleId,
        "title": title,
        "subtitle": subtitle,
        "order": order,
        "readTimeMinutes": readTime,
        "difficulty": difficulty,
        "visualizerType": "numpy-interactive",
        "objectives": objectives,
        "prerequisites": prerequisites,
        "analogy": analogy,
        "problemSolved": problemSolved,
        "intuition": intuition,
        "mathematics": mathematics,
        "derivation": derivation,
        "variables": variables,
        "numericalExample": numericalExample,
        "visualExplanation": visualExplanation,
        "scratchCode": scratchCode,
        "sklearnCode": sklearnCode,
        "runnableCode": {
            "code": runnableCode_snippet,
            "expectedOutput": expectedOutput
        },
        "lineByLineExplanation": lineByLineExplanation,
        "hyperparameters": hyperparameters,
        "assumptions": assumptions,
        "commonMistakes": commonMistakes,
        "realWorldUseCases": realWorldUseCases,
        "practiceQuestions": practiceQuestions,
        "quiz": quiz,
        "independentExercise": independentExercise,
        "summary": summary
    }

def write_module_ts(target_path, var_name, module_data, lessons_dict):
    content = f"""import {{ ModuleData, LessonContent }} from '@/lib/types';

export const {var_name}Data: ModuleData = {json.dumps(module_data, indent=2)};

export const {var_name}Lessons: Record<string, LessonContent> = {json.dumps(lessons_dict, indent=2)};
"""
    with open(target_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Successfully wrote {target_path} ({len(lessons_dict)} lessons)")

